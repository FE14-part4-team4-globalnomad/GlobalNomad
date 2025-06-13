import { ReactNode } from "react";

import SideMenu from "@/components/sidemenu/SideMenu";
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
        <SideMenu />
      </aside>
      <main>{children}</main>
    </div>
  );
}

export default Layout;
