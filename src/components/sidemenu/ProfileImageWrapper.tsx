import Image from "next/image";
import { ChangeEvent, useRef } from "react";

import { usePostUserImageMutation } from "@/apis/user/user.query";
import EditIcon from "@/assets/icons/any/edit/icon_edit_white.svg";
import DefaultProfile from "@/assets/images/profile/normal_profile_lg.svg";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/utils/classNames";

function ProfileImageWrapper({
  imgSrc = undefined,
  isClickable,
}: {
  imgSrc?: string;
  isClickable: boolean;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const profileImageMutation = usePostUserImageMutation();
  const tempImageSrc = useAuthStore((state) => state.tempProfileImageUrl);
  const ProfileImage = tempImageSrc || imgSrc || DefaultProfile;

  function handleChangeFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      if (!!file) profileImageMutation.mutate({ payload: { image: file } });
    }
  }

  function handleClickEditButton() {
    fileInputRef.current?.click(); // input 클릭 트리거
  }

  return (
    <div
      className={cn(
        "relative aspect-square rounded-full",
        "tablet:w-[7rem]",
        "desktop:w-[12rem]",
      )}
    >
      <div className="relative w-full aspect-square rounded-full overflow-hidden">
        <Image
          className="absolute object-cover"
          src={ProfileImage}
          alt="프로필 이미지"
          fill
        />
      </div>
      {isClickable && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="absolute z-1 inset-0 rounded-full cursor-pointer opacity-0"
            onChange={handleChangeFile}
          />
          <button
            className={cn(
              "absolute bottom-0 right-0 flex items-center justify-center bg-gray-300 rounded-full",
              "tablet:p-[0.5rem]",
              "desktop:p-[0.7rem]",
            )}
            onClick={handleClickEditButton}
          >
            <Image
              width={24}
              height={24}
              src={EditIcon}
              alt="프로필 편집 버튼"
              className={cn("tablet:w-[1.2rem]", "desktop:w-[2.4rem]")}
            />
          </button>
        </>
      )}
    </div>
  );
}

export default ProfileImageWrapper;
