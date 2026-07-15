import type { Vector } from "@rag-sdk/core";

import type { VectorStore } from "./vector-store";

export class MemoryVectorStore implements VectorStore {
  private readonly vectors = new Map<string, Vector>();

  async upsert(vectors: Vector[]): Promise<void> {
    for (const vector of vectors) {
      this.vectors.set(vector.id, vector);
    }
  }

  getAll(): Vector[] {
    return Array.from(this.vectors.values());
  }

  size(): number {
    return this.vectors.size;
  }

  clear(): void {
    this.vectors.clear();
  }
}
