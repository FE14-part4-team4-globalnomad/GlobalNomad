import { ReactNode } from "react";

import Gnb from "@/components/gnb/Gnb";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-screen min-h-screen flex flex-col">
      <Gnb />
      <div className="flex flex-col flex-1">{children}</div>
      <footer className="h-[14rem]">푸터</footer>
    </div>
  );
}

export default Layout;
