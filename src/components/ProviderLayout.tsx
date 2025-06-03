"use client";

import QueryProvider from "./QueryProvider";
import { UserProvider } from "@/hooks/useAuth";
import { OverlayProvider } from "@/hooks/useOverlay";

export default function ProviderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <QueryProvider>
        <OverlayProvider>{children}</OverlayProvider>
      </QueryProvider>
    </UserProvider>
  );
}
