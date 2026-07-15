import { describe, expect, it } from "vitest";

import { GenerationError, RetrievalError, ValidationError } from "../src/errors";

describe("core errors", () => {
  it("creates ValidationError with default name/message", () => {
    const error = new ValidationError();
    expect(error.name).toBe("ValidationError");
    expect(error.message).toBe("Validation failed");
  });

  it("creates RetrievalError with custom message", () => {
    const error = new RetrievalError("retriever timeout");
    expect(error.name).toBe("RetrievalError");
    expect(error.message).toBe("retriever timeout");
  });

  it("creates GenerationError with custom message", () => {
    const error = new GenerationError("generator timeout");
    expect(error.name).toBe("GenerationError");
    expect(error.message).toBe("generator timeout");
  });
});
