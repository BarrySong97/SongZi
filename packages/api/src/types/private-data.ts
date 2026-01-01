import type { z } from "zod";

import { privateDataOutputSchema } from "../schemas/private-data";

export type PrivateDataOutput = z.infer<typeof privateDataOutputSchema>;


