import type { z } from "zod";

import { ChunkSchema } from "../spec/chunk";

export type Chunk = z.infer<typeof ChunkSchema>;
