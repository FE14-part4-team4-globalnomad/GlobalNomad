import Image from "next/image";
import Link from "next/link";

import { cn } from "@/utils/classNames";

export interface SideMenuItemType {
  path: string;
  name: string;
  inActiveIcon: string;
  activeIcon: string;
}

interface SideMenuItemProps extends SideMenuItemType {
  isActive?: boolean;
}

function SideMenuItem({
  isActive,
  path,
  name,
  activeIcon,
  inActiveIcon,
}: SideMenuItemProps) {
  return (
    <li>
      <Link href={path}>
        <div
          className={cn(
            "flex items-center gap-[0.8rem] h-[5.4rem] py-[1.5rem] px-[2rem] text-gray-600 hover:bg-brand-100 transition-colors rounded-[1.6rem] cursor-pointer",
            isActive && "bg-brand-100 text-gray-950",
          )}
        >
          <i className={cn("tablet:w-[2rem]", "desktop:w-[2.4rem]")}>
            <Image
              width={24}
              height={24}
              src={isActive ? activeIcon : inActiveIcon}
              alt={name}
            />
          </i>
          {name}
        </div>
      </Link>
    </li>
  );
}

export default SideMenuItem;
