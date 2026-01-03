"use client";

import { useQuery } from "@tanstack/react-query";
import { orpc } from "../utils/orpc";

export function HealthCheck() {
  const { data, isLoading, isError } = useQuery(
    orpc.healthCheck.queryOptions()
  );
  return (
    <div
      style={{
        marginTop: "1rem",
        padding: "1rem",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <h2>API Status22</h2>
      <p>{data}</p>
    </div>
  );
}
