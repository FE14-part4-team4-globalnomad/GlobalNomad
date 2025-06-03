import { ReactNode } from "react";

import { cn } from "@/utils/classNames";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-screen min-h-screen flex flex-col">
      <header className={cn("h-[4.8rem]", "tablet:h-[8rem]")}>헤더</header>
      <div className="flex flex-col flex-1">{children}</div>
      <footer className="h-[14rem]">푸터</footer>
    </div>
  );
}

export default Layout;
