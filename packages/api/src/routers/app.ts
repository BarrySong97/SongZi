import type { Router, RouterClient } from "@orpc/server";

import type { Context } from "../context";
import type { AppContract } from "../contracts/app";

import { i, requireAuth } from "./router-tools";

const authed = i.use(requireAuth);

export type AppRouter = Router<AppContract, Context>;

export const appRouter: AppRouter = {
	healthCheck: i.healthCheck.handler(() => {
		return "HHHHHH";
	}),
	privateData: authed.privateData.handler(({ context }) => {
		return {
			message: "This is private",
			user: context.session.user,
		};
	}),
	echo: i.echo.handler(({ input }) => {
		return {
			echoed: input.text,
		};
	}),
};

export type AppRouterClient = RouterClient<AppRouter>;
