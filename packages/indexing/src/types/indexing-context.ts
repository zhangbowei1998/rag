export type IndexingStage =
  | "load"
  | "transform"
  | "filter"
  | "chunk"
  | "metadata"
  | "embed"
  | "store";

export type IndexingContext = {
  documentId?: string;
  stage: IndexingStage;
};
