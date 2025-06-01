import Image from "next/image";
import { HTMLAttributes } from "react";

import StarIcon from "@/assets/icons/star/icon_star_active.svg";
import { cn } from "@/utils/classNames";
import { formatNumber } from "@/utils/common";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  price: number;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
}

export default function Card({
  bannerImageUrl,
  title,
  rating,
  reviewCount,
  price,
  className = "",
}: CardProps) {
  return (
    <li
      className={cn(
        "relative aspect-[0.7] min-w-[155px] tablet:min-w-[260px] flex flex-col justify-start items-stretch drop-shadow-card",
        className,
      )}
    >
      <div className="w-[100%] h-[90%] relative overflow-hidden rounded-t-[18px] tablet:rounded-t-[32px]">
        <Image
          className="absolute inset-0 object-cover"
          src={bannerImageUrl}
          alt="체험 배너 이미지 미리보기"
          fill
        />
      </div>
      <div className="absolute left-0 right-0 bottom-0 grid gap-[10px] bg-white rounded-[1.8rem] tablet:rounded-[3.2rem] py-[1.6rem] px-[1.7rem] tablet:py-[2rem] tablet:px-[3rem]">
        <div className="grid gap-[4px]">
          <div className="text-14-b font-semibold tablet:text-18-b tablet:font-semibold">
            {title}
          </div>
          <div className="flex items-center gap-[2.8px] tablet:gap-[5px]">
            <div className="relative aspect-square w-[11.25px] tablet:w-[20px]">
              <Image src={StarIcon} alt="리뷰 아이콘 이미지" fill />
            </div>
            <div className="flex items-center tablet:gap-[2px] text-12-m tablet:text-14-m">
              {rating}
              <span className="text-gray-400">
                ({formatNumber(reviewCount)})
              </span>
            </div>
          </div>
        </div>
        <div className="text-12-m font-semibold tablet:text-16-m tablet:font-semibold text-gray-400">
          <span className="text-[1.5rem] tablet:text-18-b font-bold text-black">
            ₩{formatNumber(price)}
          </span>
          / 인
        </div>
      </div>
    </li>
  );
}
