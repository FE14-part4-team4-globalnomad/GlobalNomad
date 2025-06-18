"use client";

import { usePathname } from "next/navigation";

import ProfileImageWrapper from "./ProfileImageWrapper";
import SideMenuItem, { SideMenuItemType } from "./SideMenuItem";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/utils/classNames";

const sideMenuRoutes: SideMenuItemType[] = [
  {
    path: "/profile",
    name: "내 정보",
    iconName: "Profile",
  },
  {
    path: "/reservation",
    name: "예약 내역",
    iconName: "Message",
  },
  {
    path: "/experience",
    name: "내 체험 관리",
    iconName: "Setting",
  },
  {
    path: "/calendar",
    name: "예약 현황",
    iconName: "Calendar",
  },
];

function SideMenu() {
  const pathname = usePathname() ?? "";
  const isProfilePage = pathname.startsWith("/profile");
  const user = useAuthStore((state) => state.user);

  return (
    <div
      className={cn(
        "flex flex-col items-center px-[1.4rem] bg-white border border-gray-50 text-16-m shadow-[0_4px_24px_0_rgba(156,180,202,0.2)] rounded-[1.2rem]",
        "tablet:gap-[1.2rem] tablet:w-[17.8rem] tablet:py-[1.6rem]",
        "desktop:gap-[2.4rem] desktop:w-[29rem] desktop:py-[2.4rem]",
      )}
    >
      <ProfileImageWrapper
        imgSrc={user?.profileImageUrl}
        isClickable={isProfilePage}
      />
      <ul className="flex flex-col gap-[1.4rem] w-full">
        {sideMenuRoutes.map((routeData) => (
          <SideMenuItem
            key={routeData.path}
            isActive={pathname.startsWith(routeData.path)}
            {...routeData}
          />
        ))}
      </ul>
    </div>
  );
}

export default SideMenu;
