import { z } from "zod";

const VectorMetadataValueSchema = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.null(),
]);

export const VectorSchema = z.object({
  id: z.string(),
  values: z.array(z.number()),
  metadata: z.record(VectorMetadataValueSchema).optional(),
});
