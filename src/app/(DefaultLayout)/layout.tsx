"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import Footer from "@/components/footer/Footer";
import Gnb from "@/components/gnb/Gnb";
import { cn } from "@/utils/classNames";

function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "w-screen min-h-screen flex flex-col gap-[4rem]",
        pathname === "/" && "bg-main bg-cover",
      )}
    >
      <Gnb />
      <div className="flex flex-col flex-1">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
