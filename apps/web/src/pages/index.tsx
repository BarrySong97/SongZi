import { HealthCheck } from "../components/health-check";

export default async function HomePage() {
  return (
    <div>
      <h1>Welcome to Waku</h1>
      <p>A minimal React framework with RSC support.</p>
      <HealthCheck />
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: "static",
  } as const;
};
