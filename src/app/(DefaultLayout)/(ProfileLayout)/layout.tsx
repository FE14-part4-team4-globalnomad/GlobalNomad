import { Metadata } from "next";
import { ReactNode } from "react";

import DynamicSideMenu from "@/components/sidemenu/DynamicSideMenu";
import { cn } from "@/utils/classNames";

export const metadata: Metadata = {
  title: "GlobalNomad | 마이 페이지",
  description: "나의 GlobalNomad 등록/신청 정보를 확인해 보세요",
};

function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        "flex flex-1 mx-[2.4rem]",
        "tablet:gap-[3rem] tablet:mx-[3rem]",
        "desktop:w-[98rem] desktop:gap-[5rem] desktop:mx-auto",
      )}
    >
      <DynamicSideMenu />
      <main className="grow-1">{children}</main>
    </div>
  );
}

export default Layout;
