import {
  oc,
  type ContractProcedure,
  type Meta,
  type Schema,
} from "@orpc/contract";

import { echoInputSchema, echoOutputSchema } from "../schemas/echo";
import { healthCheckOutputSchema } from "../schemas/health-check";
import { privateDataOutputSchema } from "../schemas/private-data";
import { commonErrors, type CommonErrorMap } from "../errors/common";

type NoInput = Schema<unknown, unknown>;
type DefaultMeta = Meta;

export type AppContract = {
  healthCheck: ContractProcedure<
    NoInput,
    typeof healthCheckOutputSchema,
    CommonErrorMap,
    DefaultMeta
  >;
  privateData: ContractProcedure<
    NoInput,
    typeof privateDataOutputSchema,
    CommonErrorMap,
    DefaultMeta
  >;
  echo: ContractProcedure<
    typeof echoInputSchema,
    typeof echoOutputSchema,
    CommonErrorMap,
    DefaultMeta
  >;
};

// Contract-first：这里只描述接口形状（input/output/schema/route/meta/errors），不写任何 handler。
export const appContract: AppContract = {
  healthCheck: oc
    .route({ method: "GET" })
    .output(healthCheckOutputSchema)
    .errors(commonErrors),
  privateData: oc.output(privateDataOutputSchema).errors(commonErrors),
  echo: oc.input(echoInputSchema).output(echoOutputSchema).errors(commonErrors),
};
