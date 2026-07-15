import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { MarkdownLoader } from "../src/loaders/markdown-loader";

describe("MarkdownLoader", () => {
  it("loads markdown files only", async () => {
    const dir = await mkdtemp(join(tmpdir(), "rag-md-loader-"));

    try {
      await writeFile(join(dir, "a.md"), "# A", "utf8");
      await writeFile(join(dir, "b.txt"), "B", "utf8");

      const loader = new MarkdownLoader({ path: dir });
      const docs = await loader.load();

      expect(docs).toHaveLength(1);
      expect(docs[0]?.id.endsWith("a.md")).toBe(true);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});
