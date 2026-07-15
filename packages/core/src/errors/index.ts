export class ValidationError extends Error {
  constructor(message = "Validation failed") {
    super(message);
    this.name = "ValidationError";
  }
}

export class RetrievalError extends Error {
  constructor(message = "Retrieval failed") {
    super(message);
    this.name = "RetrievalError";
  }
}

export class GenerationError extends Error {
  constructor(message = "Generation failed") {
    super(message);
    this.name = "GenerationError";
  }
}
