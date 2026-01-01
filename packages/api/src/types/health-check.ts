import type { z } from "zod";

import { healthCheckOutputSchema } from "../schemas/health-check";

export type HealthCheckOutput = z.infer<typeof healthCheckOutputSchema>;


