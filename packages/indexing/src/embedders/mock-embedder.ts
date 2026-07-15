import type { Chunk, Vector } from "@rag-sdk/core";

import type { Embedder } from "./embedder";

export type MockEmbedderOptions = {
  dimensions?: number;
};

export class MockEmbedder implements Embedder {
  private readonly dimensions: number;

  constructor(options: MockEmbedderOptions = {}) {
    this.dimensions = options.dimensions ?? 8;

    if (this.dimensions <= 0) {
      throw new Error("dimensions must be greater than 0");
    }
  }

  async embed(chunks: Chunk[]): Promise<Vector[]> {
    return chunks.map((chunk) => ({
      id: chunk.id,
      values: toDeterministicVector(chunk.content, this.dimensions),
      metadata: chunk.metadata,
    }));
  }
}

function toDeterministicVector(input: string, dimensions: number): number[] {
  const vector = Array.from({ length: dimensions }, () => 0);
  for (let i = 0; i < input.length; i += 1) {
    const bucket = i % dimensions;
    vector[bucket] += input.charCodeAt(i) * 0.001;
  }
  return vector;
}
