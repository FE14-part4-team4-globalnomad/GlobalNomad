"use client";

import { usePathname } from "next/navigation";

import ProfileImageWrapper from "./ProfileImageWrapper";
import SideMenuItem, { SideMenuItemType } from "./SideMenuItem";
import BlueCalendarIcon from "@/assets/icons/any/calendar/icon_calendar_blue.svg";
import GrayCalendarIcon from "@/assets/icons/any/calendar/icon_calendar_gray.svg";
import BlueMessageIcon from "@/assets/icons/any/list/icon_list_blue.svg";
import GrayMessageIcon from "@/assets/icons/any/list/icon_list_gray.svg";
import BlueSettingIcon from "@/assets/icons/any/setting/icon_setting_blue.svg";
import GraySettingIcon from "@/assets/icons/any/setting/icon_setting_gray.svg";
import BlueProfileIcon from "@/assets/icons/any/user/icon_user_blue.svg";
import GrayProfileIcon from "@/assets/icons/any/user/icon_user_gray.svg";
import { cn } from "@/utils/classNames";

const sideMenuRoutes: SideMenuItemType[] = [
  {
    path: "/profile",
    name: "내 정보",
    inActiveIcon: GrayProfileIcon,
    activeIcon: BlueProfileIcon,
  },
  {
    path: "/reservation",
    name: "예약 내역",
    inActiveIcon: GrayMessageIcon,
    activeIcon: BlueMessageIcon,
  },
  {
    path: "/experience",
    name: "내 체험 관리",
    inActiveIcon: GraySettingIcon,
    activeIcon: BlueSettingIcon,
  },
  {
    path: "/calendar",
    name: "예약 현황",
    inActiveIcon: GrayCalendarIcon,
    activeIcon: BlueCalendarIcon,
  },
];

function SideMenu() {
  const pathname = usePathname() ?? "";
  const isProfilePage = pathname.startsWith("/profile");

  const onClickChangeProfile = () => {
    if (isProfilePage) {
      console.log("profile clicked");
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center px-[1.4rem] bg-white border border-gray-50 text-16-m shadow-[0_4px_24px_0_rgba(156,180,202,0.2)] rounded-[1.2rem]",
        "tablet:gap-[1.2rem] tablet:w-[17.8rem] tablet:py-[1.6rem]",
        "desktop:gap-[2.4rem] desktop:w-[29rem] desktop:py-[2.4rem]",
      )}
    >
      <ProfileImageWrapper
        imgSrc={undefined}
        isClickable={isProfilePage}
        onClick={onClickChangeProfile}
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
