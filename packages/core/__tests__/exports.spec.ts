import { describe, expect, it } from "vitest";

import {
  ChunkSchema,
  GenerationError,
  QuerySchema,
  RetrievalError,
  ValidationError,
} from "../src";

describe("core public exports", () => {
  it("re-exports schema modules from root index", () => {
    expect(typeof QuerySchema.parse).toBe("function");
    expect(typeof ChunkSchema.parse).toBe("function");
  });

  it("re-exports error classes from root index", () => {
    expect(new ValidationError()).toBeInstanceOf(Error);
    expect(new RetrievalError()).toBeInstanceOf(Error);
    expect(new GenerationError()).toBeInstanceOf(Error);
  });
});
