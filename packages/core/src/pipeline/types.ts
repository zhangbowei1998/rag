import type { Query, RAGResponse } from "../types";

export type RAGPipeline = (query: Query) => Promise<RAGResponse>;
