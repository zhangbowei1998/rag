import type { Document, Vector } from "@rag-sdk/core";

import {
  DEFAULT_BATCH_SIZE,
  DEFAULT_CHUNK_OVERLAP,
  DEFAULT_CHUNK_SIZE,
  DEFAULT_ERROR_MODE,
  defaultMetadataBuilder,
  defaultShouldIndex,
} from "../defaults";
import { IndexingError } from "../errors/indexing-error";
import type { IndexingContext, IndexingStage } from "../types/indexing-context";
import type { IndexingOptions } from "../types/indexing-options";
import type { IndexingResult } from "../types/indexing-result";
import { SimpleChunker } from "../chunkers/simple-chunker";

export async function runIndexing(
  options: IndexingOptions,
): Promise<IndexingResult> {
  const chunker =
    options.chunker ??
    new SimpleChunker({
      chunkSize: DEFAULT_CHUNK_SIZE,
      overlap: DEFAULT_CHUNK_OVERLAP,
    });

  const transformers = options.transformers ?? [];
  const shouldIndex = options.shouldIndex ?? defaultShouldIndex;
  const metadataBuilder = options.metadataBuilder ?? defaultMetadataBuilder;
  const batchSize = options.batchSize ?? DEFAULT_BATCH_SIZE;
  const errorMode = options.errorMode ?? DEFAULT_ERROR_MODE;

  let documents: Document[];
  try {
    documents = await options.loader.load();
  } catch (error) {
    const indexingError = toIndexingError(error, "load");
    await callOnError(options, indexingError, { stage: "load" });
    throw indexingError;
  }

  const result: IndexingResult = {
    documentsTotal: documents.length,
    documentsIndexed: 0,
    chunksTotal: 0,
    vectorsTotal: 0,
    skippedDocuments: 0,
    failedDocuments: 0,
  };

  for (const doc of documents) {
    let stage: IndexingStage = "filter";

    try {
      const include = await shouldIndex(doc);
      if (!include) {
        result.skippedDocuments += 1;
        continue;
      }

      let transformed = doc;
      stage = "transform";
      for (const transformer of transformers) {
        transformed = await transformer.transform(transformed);
      }

      stage = "chunk";
      const chunks = await chunker.chunk(transformed);

      stage = "metadata";
      const chunksWithMetadata = chunks.map((chunk) => ({
        ...chunk,
        metadata: metadataBuilder(transformed, chunk),
      }));

      stage = "embed";
      const vectors = await options.embedder.embed(chunksWithMetadata);

      stage = "store";
      await upsertInBatches(options.store, vectors, batchSize);

      result.documentsIndexed += 1;
      result.chunksTotal += chunksWithMetadata.length;
      result.vectorsTotal += vectors.length;
    } catch (error) {
      result.failedDocuments += 1;
      const indexingError = toIndexingError(error, stage);
      await callOnError(options, indexingError, {
        documentId: doc.id,
        stage,
      });

      if (errorMode === "fail-fast") {
        throw indexingError;
      }
    }
  }

  return result;
}

async function upsertInBatches(
  store: IndexingOptions["store"],
  vectors: Vector[],
  batchSize: number,
): Promise<void> {
  if (vectors.length === 0) {
    return;
  }

  if (batchSize <= 0) {
    await store.upsert(vectors);
    return;
  }

  for (let i = 0; i < vectors.length; i += batchSize) {
    const batch = vectors.slice(i, i + batchSize);
    await store.upsert(batch);
  }
}

function toIndexingError(error: unknown, stage: IndexingStage): IndexingError {
  if (error instanceof IndexingError) {
    return error;
  }

  if (error instanceof Error) {
    return new IndexingError(error.message, stage, error);
  }

  return new IndexingError(String(error), stage);
}

async function callOnError(
  options: IndexingOptions,
  error: Error,
  context: IndexingContext,
): Promise<void> {
  if (!options.onError) {
    return;
  }

  await options.onError(error, context);
}
