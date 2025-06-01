import Image from "next/image";

export default function GnbUserSection() {
  return (
    <div className="flex items-center gap-[1.2rem] font-pretendard text-14-m text-black">
      <div className=" relative">
        <Image
          src="/icons/any/bell/icon_bell_gray.svg"
          alt="알림"
          width={24}
          height={24}
        />
      </div>
      <div className="w-[0.1rem] h-[1.4rem] bg-[#E0E0E5]" />
      <div className="flex items-center gap-[1rem] text-14-m">
        <div className="relative w-[3rem] h-[3rem] ">
          <Image
            src="/images/profile/normal_profile_md.svg"
            alt="프로필"
            fill
          />
        </div>
        <span>정만철</span>
      </div>
    </div>
  );
}
