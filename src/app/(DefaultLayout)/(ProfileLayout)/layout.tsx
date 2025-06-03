import { ReactNode } from "react";

import { cn } from "@/utils/classNames";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        "flex flex-1 mx-[2.4rem]",
        "tablet:gap-[3rem] tablet:mx-[3rem]",
        "desktop:w-[98rem] desktop:gap-[5rem] desktop:mx-auto",
      )}
    >
      <aside className={cn("hidden", "tablet:block")}>
        <div>사이드메뉴</div>
      </aside>
      <main>{children}</main>
    </div>
  );
}

export default Layout;
