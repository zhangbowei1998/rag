import { z } from "zod";

const DocumentMetadataValueSchema = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.null(),
]);

export const DocumentSchema = z.object({
  id: z.string(),
  content: z.string(),
  metadata: z.record(DocumentMetadataValueSchema).optional(),
});
