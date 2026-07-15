import { z } from "zod";

const ChunkMetadataValueSchema = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.null(),
]);

export const ChunkSchema = z.object({
  id: z.string(),
  content: z.string(),
  metadata: z.record(ChunkMetadataValueSchema).optional(),
});
