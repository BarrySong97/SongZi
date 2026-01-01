import { implement, os } from "@orpc/server";

import type { Context } from "../context";
import { appContract } from "../contracts/app";
import { commonErrors } from "../errors/common";

type AuthedContext = {
  session: NonNullable<Context["session"]>;
};

const base = os.$context<Context>().errors(commonErrors);

export const requireAuth = base.middleware(
  async ({ context, next, errors }) => {
    const session = context.session;
    if (!session?.user) {
      // message 会默认使用 commonErrors.UNAUTHORIZED.message（也可以在这里覆盖）
      throw errors.UNAUTHORIZED();
    }

    return next({
      context: {
        session,
      } satisfies AuthedContext,
    });
  }
);

// 未鉴权 implementer（公共）
export const i = implement(appContract).$context<Context>();
