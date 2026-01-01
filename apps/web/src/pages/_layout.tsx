import { Providers } from "../components/providers";

import type { ReactNode } from "react";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Providers>
      <div>
        <header style={{ padding: "1rem", borderBottom: "1px solid #eee" }}>
          <nav>
            <a href="/" style={{ marginRight: "1rem" }}>Home</a>
          </nav>
        </header>
        <main style={{ padding: "1rem" }}>
          {children}
        </main>
      </div>
    </Providers>
  );
}

export const getConfig = async () => {
  return {
    render: "static",
  } as const;
};
