import { describe, expect, it } from "vitest";

import {
  ChunkSchema,
  DocumentSchema,
  QuerySchema,
  RAGResponseSchema,
  VectorSchema,
} from "../src/spec";

describe("core schema validation", () => {
  it("accepts a non-empty query", () => {
    const parsed = QuerySchema.parse({ query: "what is rag" });
    expect(parsed.query).toBe("what is rag");
  });

  it("rejects an empty query", () => {
    expect(() => QuerySchema.parse({ query: "" })).toThrow();
  });

  it("accepts chunk metadata with JSON-safe primitive values", () => {
    const parsed = ChunkSchema.parse({
      id: "c1",
      content: "chunk content",
      metadata: {
        source: "doc-1",
        score: 0.92,
        cached: true,
        extra: null,
      },
    });

    expect(parsed.metadata?.source).toBe("doc-1");
  });

  it("rejects chunk metadata with nested object values", () => {
    expect(() =>
      ChunkSchema.parse({
        id: "c1",
        content: "chunk content",
        metadata: {
          invalid: { nested: "nope" },
        },
      }),
    ).toThrow();
  });

  it("validates rag response shape", () => {
    const parsed = RAGResponseSchema.parse({
      answer: "answer",
      chunks: [{ id: "c1", content: "content" }],
    });

    expect(parsed.chunks).toHaveLength(1);
  });

  it("validates document shape", () => {
    const parsed = DocumentSchema.parse({
      id: "doc-1",
      content: "hello",
      metadata: {
        source: "docs",
      },
    });

    expect(parsed.id).toBe("doc-1");
  });

  it("validates vector shape", () => {
    const parsed = VectorSchema.parse({
      id: "vec-1",
      values: [0.1, 0.2, 0.3],
      metadata: {
        documentId: "doc-1",
      },
    });

    expect(parsed.values).toHaveLength(3);
  });
});
