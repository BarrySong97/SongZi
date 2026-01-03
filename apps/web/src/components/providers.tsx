"use client";

import TanstackProvider from "../utils/tanstack-query/TanstackProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <TanstackProvider>{children}</TanstackProvider>;
}
