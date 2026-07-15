import type { z } from "zod";

import { DocumentSchema } from "../spec/document";

export type Document = z.infer<typeof DocumentSchema>;
