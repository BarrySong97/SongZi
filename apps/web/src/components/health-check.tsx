"use client";

import { useQuery } from "@tanstack/react-query";
import { orpc } from "../utils/orpc";

export function HealthCheck() {
  const healthCheck = useQuery(orpc.healthCheck.queryOptions());

  return (
    <div style={{ marginTop: "1rem", padding: "1rem", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h2>API Status</h2>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: healthCheck.data ? "green" : "red",
          }}
        />
        <span>
          {healthCheck.isLoading
            ? "Checking..."
            : healthCheck.data
              ? "Connected"
              : "Disconnected"}
        </span>
      </div>
    </div>
  );
}
