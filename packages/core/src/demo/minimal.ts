import type { Generator, Query, RAGResponse, Retriever } from "@rag-sdk/core";

async function run(
  retriever: Retriever,
  generator: Generator,
  query: Query,
): Promise<RAGResponse> {
  const chunks = await retriever.retrieve(query);
  const answer = await generator.generate({ query, chunks });
  return { answer, chunks };
}

void run;
