"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import BellActiveBrand from "@/assets/icons/any/bell/icon_active_bell_brand.svg";
import BellActive from "@/assets/icons/any/bell/icon_active_bell_gray.svg";
import BellInactive from "@/assets/icons/any/bell/icon_inactive_bell_gray.svg";
import DefaultProfileImage from "@/assets/images/profile/normal_profile_md.svg";
import Notification from "@/components/notification/Notification";
import { useAuthStore } from "@/store/authStore";
import { useNotificationStore } from "@/store/notificationStore";

export default function GnbUserSection() {
  const user = useAuthStore((state) => state.user);
  const { isOpen, hasNew, toggle, close } = useNotificationStore();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [close]);

  const bellIcon = (() => {
    if (!hasNew) return BellInactive;
    return isOpen ? BellActiveBrand : BellActive;
  })();

  const bellSize = !hasNew ? { width: 16, height: 19 } : { width: 24, height: 24 };

  return (
    <div className="flex items-center gap-[1.2rem] text-14-m text-black" ref={ref}>
      <div className="relative w-[2.4rem] h-[2.4rem] flex items-center justify-center">
        <button onClick={toggle}>
          <Image src={bellIcon} alt="알림" {...bellSize} />
        </button>
        {isOpen && (
          <div className="absolute top-[2.8rem] right-0 z-[10000]">
            <Notification />
          </div>
        )}
      </div>

      <div className="w-[0.1rem] h-[1.4rem] bg-[#E0E0E5]" />

      <Link href="/profile" className="flex items-center gap-[1rem] text-14-m">
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