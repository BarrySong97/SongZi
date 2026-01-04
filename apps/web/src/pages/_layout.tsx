import "../styles.css";

import type { ReactNode } from "react";
import { Providers } from "../components/providers";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Providers>
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1 pt-16">{children}</main>
        <Footer placeholderText="在这里填写您的页脚文字" />
      </div>
    </Providers>
  );
}

export const getConfig = async () => {
  return {
    render: "dynamic",
  } as const;
};
