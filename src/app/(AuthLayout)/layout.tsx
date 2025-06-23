import { Metadata } from "next";
import { ReactNode, Suspense } from "react";

import { cn } from "@/utils/classNames";

export const metadata: Metadata = {
  title: "GlobalNomad | 로그인",
  description: "GlobalNomad 시작해 보세요",
};

function Layout({ children }: { children: ReactNode }) {
  return (
    <main
      className={cn(
        "mx-[2.4rem] mt-[6.4rem]",
        "tablet:w-full tablet:mx-[5.2rem] tablet:mt-[14rem]",
        "desktop:w-[64rem] desktop:mx-auto",
      )}
    >
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </main>
  );
}

export default Layout;
