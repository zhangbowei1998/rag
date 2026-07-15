import type { Chunk, Document } from "@rag-sdk/core";

export interface Chunker {
  chunk(doc: Document): Promise<Chunk[]>;
}
