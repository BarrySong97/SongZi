import { HydrationBoundary } from "@tanstack/react-query";
import { HealthCheck } from "../components/health-check";
import { orpc } from "../utils/orpc";
import { prefetchQuery } from "../utils/tanstack-query/tanstack-server";

export default async function HomePage() {
  const state = await prefetchQuery(orpc.healthCheck.queryOptions());
  console.log(state.queries);
  return (
    <HydrationBoundary state={state}>
      <h1>Welcome to Waku</h1>
      <p>A minimal React framework with RSC support.</p>
      <HealthCheck />
    </HydrationBoundary>
  );
}

export const getConfig = async () => {
  return {
    render: "static",
  } as const;
};
