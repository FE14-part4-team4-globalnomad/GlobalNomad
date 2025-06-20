import Link from "next/link";

import { Icon } from "../icon/Icon";
import { cn, cond } from "@/utils/classNames";

type SideMenuIconNameType = "Profile" | "Message" | "Setting" | "Calendar";

export interface SideMenuItemType {
  path: string;
  name: string;
  iconName: SideMenuIconNameType;
}

interface SideMenuItemProps extends SideMenuItemType {
  isActive?: boolean;
}

function SideMenuItem({ isActive, path, name, iconName }: SideMenuItemProps) {
  return (
    <li>
      <Link href={path}>
        <div
          className={cn(
            "flex items-center gap-[0.8rem] h-[5.4rem] py-[1.5rem] px-[2rem] text-gray-600 hover:bg-brand-100 transition-colors rounded-[1.6rem] cursor-pointer",
            cond(!!isActive, "bg-brand-100 text-gray-950"),
          )}
        >
          <Icon
            name={iconName}
            className={isActive ? "text-brand-500" : "text-gray-600"}
          />
          {name}
        </div>
      </Link>
    </li>
  );
}

export default SideMenuItem;
