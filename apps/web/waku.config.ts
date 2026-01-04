import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "waku/config";

export default defineConfig({
  vite: {
    plugins: [tailwindcss(), react()],
    server: {
      host: "0.0.0.0",
    },
    optimizeDeps: {
      // Avoid Vite pre-bundling inconsistencies for RSC client component deps.
      exclude: ["@tanstack/react-query"],
    },
  },
});
