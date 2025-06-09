"use client";

import Image from "next/image";
import Link from "next/link";

import BellIcon from "@/assets/icons/any/bell/icon_inactive_bell_gray.svg";
import DefaultProfileImage from "@/assets/images/profile/normal_profile_md.svg";
import { useAuthStore } from "@/store/authStore";

export default function GnbUserSection() {
  const user = useAuthStore((state) => state.user);
  return (
    <div className="flex items-center gap-[1.2rem] text-14-m text-black">
      <div className=" relative w-[2.4rem] h-[2.4rem] flex items-center justify-center">
        <Image src={BellIcon} alt="알림" width={16} height={19} />
      </div>
      <div className="w-[0.1rem] h-[1.4rem] bg-[#E0E0E5]" />
      <Link href="/profile" className="flex items-center gap-[1rem] text-14-m">
        <div className="relative w-[3rem] h-[3rem] ">
          <Image src={DefaultProfileImage} alt="프로필 이미지 미리보기" fill />
        </div>
        <span>{user?.nickname}</span>
      </Link>
    </div>
  );
}
