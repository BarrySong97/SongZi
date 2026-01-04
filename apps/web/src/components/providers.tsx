"use client";

import { ThemeProvider } from "@songzi/ui";
import TanstackProvider from "../utils/tanstack-query/TanstackProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TanstackProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </TanstackProvider>
  );
}
