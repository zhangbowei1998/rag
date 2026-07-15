import type { Chunk, Document } from "@rag-sdk/core";

import { DEFAULT_CHUNK_OVERLAP, DEFAULT_CHUNK_SIZE } from "../defaults";
import type { Chunker } from "./chunker";

export type SimpleChunkerOptions = {
  chunkSize?: number;
  overlap?: number;
};

export class SimpleChunker implements Chunker {
  private readonly chunkSize: number;
  private readonly overlap: number;

  constructor(options: SimpleChunkerOptions = {}) {
    this.chunkSize = options.chunkSize ?? DEFAULT_CHUNK_SIZE;
    this.overlap = options.overlap ?? DEFAULT_CHUNK_OVERLAP;

    if (this.chunkSize <= 0) {
      throw new Error("chunkSize must be greater than 0");
    }

    if (this.overlap < 0 || this.overlap >= this.chunkSize) {
      throw new Error("overlap must be >= 0 and less than chunkSize");
    }
  }

  async chunk(doc: Document): Promise<Chunk[]> {
    const content = doc.content ?? "";
    if (!content.trim()) {
      return [];
    }

    const chunks: Chunk[] = [];
    const step = this.chunkSize - this.overlap;
    let start = 0;
    let index = 0;

    while (start < content.length) {
      const end = Math.min(start + this.chunkSize, content.length);
      const text = content.slice(start, end);

      if (text.trim().length > 0) {
        chunks.push({
          id: `${doc.id}:${index}`,
          content: text,
          metadata: doc.metadata,
        });
      }

      if (end === content.length) {
        break;
      }

      start += step;
      index += 1;
    }

    return chunks;
  }
}
