import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";

import type { Document } from "@rag-sdk/core";

import type { Loader } from "./document-loader";

export type MarkdownLoaderOptions = {
  path: string;
  recursive?: boolean;
  extensions?: string[];
};

const DEFAULT_EXTENSIONS = [".md", ".markdown"];

export class MarkdownLoader implements Loader {
  private readonly basePath: string;
  private readonly recursive: boolean;
  private readonly extensions: Set<string>;

  constructor(options: MarkdownLoaderOptions) {
    this.basePath = options.path;
    this.recursive = options.recursive ?? true;
    this.extensions = new Set(
      (options.extensions ?? DEFAULT_EXTENSIONS).map((ext) => ext.toLowerCase()),
    );
  }

  async load(): Promise<Document[]> {
    const files = await collectFiles(this.basePath, this.recursive);
    const markdownFiles = files.filter((filePath) =>
      this.extensions.has(getExtension(filePath)),
    );

    const docs = await Promise.all(
      markdownFiles.map(async (filePath) => {
        const content = await readFile(filePath, "utf8");
        const relPath = relative(this.basePath, filePath);
        return {
          id: relPath,
          content,
          metadata: {
            source: relPath,
          },
        } satisfies Document;
      }),
    );

    return docs;
  }
}

async function collectFiles(dirPath: string, recursive: boolean): Promise<string[]> {
  const entries = await readdir(dirPath, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);
    if (entry.isDirectory()) {
      if (recursive) {
        files.push(...(await collectFiles(fullPath, recursive)));
      }
      continue;
    }

    if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

function getExtension(filePath: string): string {
  const idx = filePath.lastIndexOf(".");
  return idx === -1 ? "" : filePath.slice(idx).toLowerCase();
}
