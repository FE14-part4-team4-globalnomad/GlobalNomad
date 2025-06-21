import Image from "next/image";

import StarIcon from "@/assets/icons/star/icon_star_active.svg?url";
import { ActivityType } from "@/types/activity";
import { cn } from "@/utils/classNames";
import { formatNumberWithComma } from "@/utils/common";

interface CardProps
  extends Pick<
    ActivityType,
    "title" | "price" | "bannerImageUrl" | "rating" | "reviewCount"
  > {
  onClick?: () => void;
}
export default function Card({
  bannerImageUrl,
  title,
  rating,
  reviewCount,
  price,
  onClick = () => {},
}: CardProps) {
  return (
    <article
      className={cn(
        "min-w-[155px] tablet:min-w-[260px] h-[242.88px] tablet:h-[423px] desktop:h-[366px]",
        "flex flex-col justify-start items-stretch",
        "relative drop-shadow-card",
        "cursor-pointer",
      )}
      onClick={onClick}
    >
      <div className="w-full h-[90%] relative overflow-hidden rounded-t-[18px] tablet:rounded-t-[32px]">
        <Image
          className="absolute inset-0 object-cover"
          src={bannerImageUrl}
          alt="체험 배너 이미지 미리보기"
          fill
        />
      </div>
      <div className="absolute left-0 right-0 bottom-0 grid gap-[10px] bg-white rounded-[1.8rem] tablet:rounded-[3.2rem] py-[1.6rem] px-[1.7rem] tablet:py-[2rem] tablet:px-[3rem]">
        <div className="grid gap-[4px]">
          <div className="text-14-b font-semibold tablet:text-18-b tablet:font-semibold overflow-hidden text-nowrap text-ellipsis">
            {title}
          </div>
          <div className="flex items-center gap-[2.8px] tablet:gap-[5px]">
            <div className="relative aspect-square w-[11.25px] tablet:w-[20px]">
              <Image src={StarIcon} alt="리뷰 아이콘 이미지" fill />
            </div>
            <div className="flex items-center tablet:gap-[2px] text-12-m tablet:text-14-m">
              {rating}
              <span className="text-gray-400">
                ({formatNumberWithComma(reviewCount)})
              </span>
            </div>
          </div>
        </div>
        <div className="text-12-m font-semibold tablet:text-16-m tablet:font-semibold text-gray-400">
          <span className="text-[1.5rem] tablet:text-18-b font-bold text-black">
            ₩{formatNumberWithComma(price)}
          </span>
          / 인
        </div>
      </div>
    </article>
  );
}
