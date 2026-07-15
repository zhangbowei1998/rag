import type { z } from "zod";

import { RAGResponseSchema } from "../spec/rag-response";

export type RAGResponse = z.infer<typeof RAGResponseSchema>;
