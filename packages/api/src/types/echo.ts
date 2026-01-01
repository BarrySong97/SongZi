import type { z } from "zod";

import { echoInputSchema, echoOutputSchema } from "../schemas/echo";

export type EchoInput = z.infer<typeof echoInputSchema>;
export type EchoOutput = z.infer<typeof echoOutputSchema>;


