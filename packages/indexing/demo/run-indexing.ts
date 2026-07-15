import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import {
  MarkdownLoader,
  MemoryVectorStore,
  MockEmbedder,
  SimpleChunker,
  runIndexing,
} from "../src";

async function main(): Promise<void> {
  const tempDir = await mkdtemp(join(tmpdir(), "rag-indexing-demo-"));
  const markdownPath = join(tempDir, "sample.md");

  await writeFile(
    markdownPath,
    "# Demo\n\nThis is a markdown document for indexing demo.",
    "utf8",
  );

  const store = new MemoryVectorStore();

  try {
    const result = await runIndexing({
      loader: new MarkdownLoader({ path: tempDir }),
      chunker: new SimpleChunker({ chunkSize: 24, overlap: 4 }),
      embedder: new MockEmbedder({ dimensions: 8 }),
      store,
      shouldIndex: (doc) => doc.content.trim().length > 0,
      metadataBuilder: (doc) => ({
        documentId: doc.id,
        source: "demo",
      }),
    });

    console.log("result", result);
    console.log("stored vectors", store.size());
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
}

void main();
