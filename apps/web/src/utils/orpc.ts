import { type AppRouterClient } from "@songzi/api/routers/index";
import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";

const SERVER_URL =
  typeof window !== "undefined"
    ? import.meta.env.WAKU_PUBLIC_SERVER_URL || "http://localhost:8000"
    : process.env.WAKU_PUBLIC_SERVER_URL || "http://localhost:8000";

export const link = new RPCLink({
  url: `${SERVER_URL}/rpc`,
  fetch(url, options) {
    return fetch(url, {
      ...options,
      credentials: "include",
    });
  },
});

export const client: AppRouterClient = createORPCClient(link);
export const orpc = createTanstackQueryUtils(client);
