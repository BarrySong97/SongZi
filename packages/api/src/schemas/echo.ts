import { z } from "zod";

export const echoInputSchema = z.object({
	text: z.string(),
});

export const echoOutputSchema = z.object({
	echoed: z.string(),
});
