"use client";

import QueryProvider from "./QueryProvider";
import { OverlayProvider } from "@/hooks/useOverlay";

export default function ProviderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <OverlayProvider>
      <QueryProvider>{children}</QueryProvider>
    </OverlayProvider>
  );
}
