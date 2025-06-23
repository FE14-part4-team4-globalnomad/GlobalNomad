import type { Metadata } from "next";
import localFont from "next/font/local";

import ProviderLayout from "@/layouts/ProviderLayout";
import "../styles/globals.css";

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

export const metadata: Metadata = {
  title: "GlobalNomad",
  description: "나만의 체험을 등록/신청해보세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className="text-16-m">
        <ProviderLayout>{children}</ProviderLayout>
      </body>
    </html>
  );
}
