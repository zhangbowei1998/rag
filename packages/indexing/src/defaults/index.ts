import type { Chunk, Document } from "@rag-sdk/core";

import type {
  ErrorMode,
  Metadata,
  MetadataBuilder,
  ShouldIndex,
} from "../types/indexing-options";

export const DEFAULT_CHUNK_SIZE = 500;
export const DEFAULT_CHUNK_OVERLAP = 50;
export const DEFAULT_BATCH_SIZE = 100;
export const DEFAULT_ERROR_MODE: ErrorMode = "fail-fast";

export const defaultShouldIndex: ShouldIndex = async () => true;

export const defaultMetadataBuilder: MetadataBuilder = (
  doc: Document,
  _chunk: Chunk,
): Metadata => ({
  ...(doc.metadata ?? {}),
  documentId: doc.id,
});
