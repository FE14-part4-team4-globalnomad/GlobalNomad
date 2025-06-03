import Image from "next/image";

import BellIcon from "@/assets/icons/any/bell/icon_inactive_bell_gray.svg";
import NomalProfile from "@/assets/images/profile/normal_profile_md.svg";

export default function GnbUserSection() {
  return (
    <div className="flex items-center gap-[1.2rem] font-pretendard text-14-m text-black">
      <div className=" relative w-[2.4rem] h-[2.4rem] flex items-center justify-center">
        <Image src={BellIcon} alt="알림" width={16} height={19} />
      </div>
      <div className="w-[0.1rem] h-[1.4rem] bg-[#E0E0E5]" />
      <div className="flex items-center gap-[1rem] text-14-m">
        <div className="relative w-[3rem] h-[3rem] ">
          <Image src={NomalProfile} alt="프로필" fill />
        </div>
        <span>정만철</span>
      </div>
    </div>
  );
}
