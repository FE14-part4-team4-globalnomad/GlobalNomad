"use client";

import localFont from "next/font/local";

import QueryProvider from "@/components/QueryProvider";
import "../styles/globals.css";
import { OverlayProvider } from "@/hooks/useOverlay";

const pretendard = localFont({
  src: [
    {
      path: "../../public/fonts/Pretendard-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className="text-16-m">
        <div className="relative min-h-screen">
          <QueryProvider>
            <OverlayProvider>{children}</OverlayProvider>
          </QueryProvider>
        </div>
      </body>
    </html>
  );
}
