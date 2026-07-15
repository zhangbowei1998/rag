import type { z } from "zod";

import { VectorSchema } from "../spec/vector";

export type Vector = z.infer<typeof VectorSchema>;
