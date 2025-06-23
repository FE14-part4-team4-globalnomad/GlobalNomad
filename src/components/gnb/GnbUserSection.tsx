"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { Icon } from "../icon/Icon";
import { useMyNotificationListQuery } from "@/apis/notification/notification.query";
import DefaultProfileImage from "@/assets/images/profile/normal_profile_md.svg?url";
import Notification from "@/components/notification/Notification";
import { useIsMobile } from "@/hooks/useMobile";
import { useAuthStore } from "@/store/authStore";
import { useNotificationStore } from "@/store/notificationStore";

export default function GnbUserSection() {
  const isMobile = useIsMobile();
  const user = useAuthStore((state) => state.user);
  const { isOpen, hasNew, toggle, close, setHasNew } = useNotificationStore();
  const ref = useRef<HTMLDivElement>(null);

  const { data } = useMyNotificationListQuery();

  useEffect(() => {
    if (!data) return;
    const notifications = data.pages.flatMap((page) => page.notifications);
    setHasNew(notifications.length > 0);
  }, [data, setHasNew]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [close]);

  const getBellIconName = () => {
    if (hasNew) {
      return isOpen ? "BellActiveBrand" : "BellActive";
    }
    return "BellInactive";
  };

  const getBellIconClass = () => {
    const name = getBellIconName();
    if (name === "BellActiveBrand") return "text-brand-500";
    return "text-gray-600";
  };

  return (
    <div
      className="flex items-center gap-[1.2rem] text-14-m text-black"
      ref={ref}
    >
      <div className="relative w-[2.4rem] h-[2.4rem] flex items-center justify-center">
        <button onClick={toggle}>
          <Icon
            name={getBellIconName()}
            className={`w-[2.4rem] h-[2.4rem] ${getBellIconClass()}`}
          />
        </button>
        {isOpen && (
          <div className="absolute top-[2.8rem] right-0 z-[10000]">
            <Notification />
          </div>
        )}
      </div>

      <div className="w-[0.1rem] h-[1.4rem] bg-[#E0E0E5]" />

      <Link
        href={isMobile ? "/menus" : "/profile"}
        className="flex items-center gap-[1rem] text-14-m"
      >
        <div className="relative w-[3rem] h-[3rem] rounded-full overflow-hidden">
          <Image
            className="absolute object-cover"
            src={user?.profileImageUrl || DefaultProfileImage}
            alt="프로필 이미지 미리보기"
            fill
          />
        </div>
        <span>{user?.nickname}</span>
      </Link>
    </div>
  );
}
