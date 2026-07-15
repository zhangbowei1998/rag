import type { z } from "zod";

import { QuerySchema } from "../spec/query";

export type Query = z.infer<typeof QuerySchema>;
