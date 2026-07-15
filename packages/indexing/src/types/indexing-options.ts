import type { Chunk, Document } from "@rag-sdk/core";

import type { Chunker } from "../chunkers/chunker";
import type { Embedder } from "../embedders/embedder";
import type { IndexingContext } from "./indexing-context";
import type { Loader } from "../loaders/document-loader";
import type { VectorStore } from "../stores/vector-store";
import type { DocumentTransformer } from "../transformers/document-transformer";

export type MetadataValue = string | number | boolean | null;
export type Metadata = Record<string, MetadataValue>;

export type ErrorMode = "fail-fast" | "continue-on-error";

export type ShouldIndex = (doc: Document) => boolean | Promise<boolean>;

export type MetadataBuilder = (doc: Document, chunk: Chunk) => Metadata;

export type OnIndexingError = (
  error: Error,
  context: IndexingContext,
) => void | Promise<void>;

export type IndexingOptions = {
  loader: Loader;
  transformers?: DocumentTransformer[];
  chunker?: Chunker;
  embedder: Embedder;
  store: VectorStore;
  shouldIndex?: ShouldIndex;
  metadataBuilder?: MetadataBuilder;
  onError?: OnIndexingError;
  batchSize?: number;
  errorMode?: ErrorMode;
};
