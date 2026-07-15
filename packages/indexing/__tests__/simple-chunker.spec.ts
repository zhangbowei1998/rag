import { describe, expect, it } from "vitest";

import { SimpleChunker } from "../src/chunkers/simple-chunker";

describe("SimpleChunker", () => {
  it("chunks a document with overlap", async () => {
    const chunker = new SimpleChunker({ chunkSize: 10, overlap: 2 });
    const chunks = await chunker.chunk({
      id: "doc-1",
      content: "0123456789abcdefghij",
    });

    expect(chunks.length).toBeGreaterThan(1);
    expect(chunks[0]?.id).toBe("doc-1:0");
    expect(chunks[0]?.content).toBe("0123456789");
  });

  it("returns empty chunks for blank content", async () => {
    const chunker = new SimpleChunker();
    const chunks = await chunker.chunk({ id: "doc-2", content: "   " });
    expect(chunks).toHaveLength(0);
  });
});
