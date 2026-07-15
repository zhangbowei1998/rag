import type { Chunk, Query } from "../types";

export interface Retriever {
  retrieve(query: Query): Promise<Chunk[]>;
}
