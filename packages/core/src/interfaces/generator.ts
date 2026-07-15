import type { Chunk, Query } from "../types";

export interface Generator {
  generate(input: {
    query: Query;
    chunks: Chunk[];
  }): Promise<string>;
}
