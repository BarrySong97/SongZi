import type { z } from "zod";

import type { privateDataOutputSchema } from "../schemas/private-data";

export type PrivateDataOutput = z.infer<typeof privateDataOutputSchema>;
