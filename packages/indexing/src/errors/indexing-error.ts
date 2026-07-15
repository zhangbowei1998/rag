import type { IndexingStage } from "../types/indexing-context";

export class IndexingError extends Error {
  stage: IndexingStage;
  originalError?: Error;

  constructor(message: string, stage: IndexingStage, originalError?: Error) {
    super(message);
    this.name = "IndexingError";
    this.stage = stage;
    this.originalError = originalError;
  }
}
