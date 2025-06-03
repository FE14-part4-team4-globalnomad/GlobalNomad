import { ReactNode } from "react";

import { cn } from "@/utils/classNames";

function Layout({ children }: { children: ReactNode }) {
  return (
    <main
      className={cn(
        "flex flex-col flex-1 mx-[2.4rem]",
        "tablet:mx-[3rem]",
        "desktop:w-[112rem] desktop:mx-auto",
      )}
    >
      {children}
    </main>
  );
}

export default Layout;
