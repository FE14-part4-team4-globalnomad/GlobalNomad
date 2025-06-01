import Image from "next/image";

import StarIcon from "@/assets/icons/star/icon_star_active.svg";
import { cn } from "@/utils/classNames";
import { formatNumberWithComma } from "@/utils/common";

// TODO: type 정의 반영
interface MyExperienceCardProps {
  id?: number;
  title: string;
  price: number;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
}

/**
 * 냐 체험 관리 리스트 아이템
 */
export default function MyExperienceCard({
  title,
  rating,
  reviewCount,
  price,
  bannerImageUrl,
}: MyExperienceCardProps) {
  return (
    <article
      className={cn(
        "flex justify-between items-start gap-[10px] drop-shadow-card",
        "bg-white rounded-[24px] p-[24px] tablet:p-[30px]",
      )}
    >
      <div className="grid gap-[12px] tablet:gap-[20px]">
        <div className="grid gap-[10px] tablet:gap-[12px]">
          <div className="grid gap-[6px] tablet:gap-[8px]">
            <div className="text-14-b font-semibold tablet:text-18-b tablet:font-semibold">
              {title}
            </div>
            <div className="flex items-center gap-[2.8px] tablet:gap-[5px]">
              <div className="relative aspect-square w-[14px] tablet:w-[16px]">
                <Image src={StarIcon} alt="리뷰 아이콘 이미지" fill />
              </div>
              <div className="flex items-center tablet:gap-[2px] text-12-m tablet:text-14-m">
                {rating} <span className="text-gray-400">({reviewCount})</span>
              </div>
            </div>
          </div>
          <div className="text-14-m font-semibold tablet:text-16-m tablet:font-semibold text-gray-400">
            <span className="text-16-b tablet:text-18-b font-bold text-black">
              ₩{formatNumberWithComma(price)}
            </span>
            / 인
          </div>
        </div>
        <div className="flex justify-start items-center gap-[8px]">
          {/* TODO: Button component 반영 */}
          <button>수정하기</button>
          <button>삭제하기</button>
        </div>
      </div>
      <div className="relative w-[82px] tablet:w-[142px] aspect-square overflow-hidden rounded-[18px] tablet:rounded-[20px]">
        <Image
          className="absolute inset-0 object-cover"
          src={bannerImageUrl}
          alt="체험 배너 이미지 미리보기"
          fill
        />
      </div>
    </article>
  );
}
