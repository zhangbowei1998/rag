import type { Chunk, Document, Vector } from "@rag-sdk/core";
import { describe, expect, it } from "vitest";

import { SimpleChunker } from "../src/chunkers/simple-chunker";
import { MockEmbedder } from "../src/embedders/mock-embedder";
import { runIndexing } from "../src/pipeline/run-indexing";
import { MemoryVectorStore } from "../src/stores/memory-vector-store";
import type { Loader } from "../src/loaders/document-loader";

class StaticLoader implements Loader {
  constructor(private readonly docs: Document[]) {}

  async load(): Promise<Document[]> {
    return this.docs;
  }
}

class FailingEmbedder {
  async embed(_chunks: Chunk[]): Promise<Vector[]> {
    throw new Error("embed failed");
  }
}

describe("runIndexing", () => {
  it("runs full pipeline and returns result stats", async () => {
    const store = new MemoryVectorStore();
    const result = await runIndexing({
      loader: new StaticLoader([
        { id: "doc-1", content: "hello world from indexing" },
      ]),
      chunker: new SimpleChunker({ chunkSize: 12, overlap: 2 }),
      embedder: new MockEmbedder({ dimensions: 6 }),
      store,
    });

    expect(result.documentsTotal).toBe(1);
    expect(result.documentsIndexed).toBe(1);
    expect(result.failedDocuments).toBe(0);
    expect(result.chunksTotal).toBeGreaterThan(0);
    expect(result.vectorsTotal).toBeGreaterThan(0);
    expect(store.size()).toBe(result.vectorsTotal);
  });

  it("supports continue-on-error mode", async () => {
    const errors: string[] = [];

    const result = await runIndexing({
      loader: new StaticLoader([
        { id: "doc-1", content: "ok" },
        { id: "doc-2", content: "bad" },
      ]),
      chunker: new SimpleChunker({ chunkSize: 10, overlap: 0 }),
      embedder: new FailingEmbedder(),
      store: new MemoryVectorStore(),
      errorMode: "continue-on-error",
      onError: (error) => {
        errors.push(error.message);
      },
    });

    expect(result.failedDocuments).toBe(2);
    expect(errors.length).toBe(2);
  });
});
