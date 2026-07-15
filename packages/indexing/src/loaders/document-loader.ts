import type { Document } from "@rag-sdk/core";

export interface Loader {
  load(): Promise<Document[]>;
}
