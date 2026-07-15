import type { Document } from "@rag-sdk/core";

export interface DocumentTransformer {
  transform(doc: Document): Promise<Document>;
}
