import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "waku/config";

export default defineConfig({
  vite: {
    plugins: [tailwindcss(), react()],
    optimizeDeps: {
      // Avoid Vite pre-bundling inconsistencies for RSC client component deps.
      exclude: ["@tanstack/react-query"],
    },
  },
});
