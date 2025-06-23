"use client";

import { usePathname } from "next/navigation";

import SideMenu from "@/components/sidemenu/SideMenu";

export default function DynamicSideMenu() {
  const pathname = usePathname();

  const hide = pathname?.startsWith("/experience/update/");

  if (hide) return null;

  return (
    <aside className="hidden tablet:block">
      <SideMenu />
    </aside>
  );
}
