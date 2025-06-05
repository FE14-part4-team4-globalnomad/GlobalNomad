import Image from "next/image";

import EditIcon from "@/assets/icons/any/edit/icon_edit_white.svg";
import DefaultProfile from "@/assets/images/profile/normal_profile_lg.svg";
import { cn } from "@/utils/classNames";

function ProfileImageWrapper({
  imgSrc = undefined,
  isClickable,
  onClick,
}: {
  imgSrc?: string;
  isClickable: boolean;
  onClick?: () => void;
}) {
  const WrapperTag = isClickable ? "button" : "div";
  const ProfileImage = imgSrc || DefaultProfile;

  return (
    <WrapperTag
      onClick={isClickable ? onClick : undefined}
      className={cn(
        "relative aspect-square rounded-full",
        "tablet:w-[7rem]",
        "desktop:w-[12rem]",
        { "cursor-pointer": isClickable },
      )}
    >
      <Image width={120} height={120} src={ProfileImage} alt="프로필 이미지" />
      {isClickable && (
        <div
          className={cn(
            "absolute bottom-0 right-0 flex items-center justify-center bg-gray-300 rounded-full",
            "tablet:p-[0.5rem]",
            "desktop:p-[0.7rem]",
          )}
        >
          <Image
            width={24}
            height={24}
            src={EditIcon}
            alt="프로필 편집 버튼"
            className={cn("tablet:w-[1.2rem]", "desktop:w-[2.4rem]")}
          />
        </div>
      )}
    </WrapperTag>
  );
}

export default ProfileImageWrapper;
