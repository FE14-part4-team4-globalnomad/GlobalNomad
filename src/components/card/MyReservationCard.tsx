import Image from "next/image";
import { HTMLAttributes } from "react";

import { cn } from "@/utils/classNames";
import { formatNumber } from "@/utils/common";

interface MyReservationCardProps extends HTMLAttributes<HTMLDivElement> {
  activity: {
    bannerImageUrl: string;
    title: string;
  };
  status: "pending" | "confirmed" | "declined" | "canceled" | "completed";
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
}

/**
 * 예약관리 리스트 아이템
 */
export default function MyReservationCard({
  status,
  activity,
  date,
  startTime,
  endTime,
  totalPrice,
  headCount,
  reviewSubmitted,
  className = "",
}: MyReservationCardProps) {
  /* TODO: Button component 반영 */
  function ReviewButtons() {
    return reviewSubmitted ? (
      <>
        <button className="w-[100%]">예약 변경</button>
        <button className="w-[100%]">예약 취소</button>
      </>
    ) : (
      <button className="w-[100%]">후기 작성</button>
    );
  }
  return (
    <li className="grid gap-[20px]">
      <hr className="border-gray-50 tablet:hidden" />
      <div className="grid gap-[12px]">
        <div className="text-16-b text-gray-800 pl-[8px] tablet:hidden">
          {date}
        </div>
        <section
          className={cn(
            "relative flex flex-row-reverse justify-between items-stretch drop-shadow-card",
            className,
          )}
        >
          <div className="aspect-square w-[132px] tablet:w-[200px] relative overflow-hidden rounded-r-[18px] tablet:rounded-r-[32px]">
            <Image
              className="absolute inset-0 object-cover"
              src={activity.bannerImageUrl}
              alt="체험 배너 이미지 미리보기"
              fill
            />
          </div>
          <div
            className={`grow-[2.4] grid gap-[8px] tablet:gap-[25px] 
        absolute left-0 top-0 bottom-0 right-[98px] tablet:right-[174px] 
        bg-white rounded-[1.8rem] tablet:rounded-[3.2rem] py-[1.6rem] px-[1.7rem] tablet:py-[2rem] tablet:px-[3rem]`}
          >
            <div className="grid gap-[8px] tablet:gap-[12px]">
              <div className="grid gap-[4px] tablet:gap-[10px]">
                {/* TODO: Badge component 반영 */}
                {status}
                <div className="text-14-b font-semibold tablet:text-18-b tablet:font-semibold">
                  {activity.title}
                </div>
                <div className="flex items-center tablet:gap-[8px] text-13-m tablet:text-16-m text-gray-500">
                  <div className="hidden tablet:block">{date}</div>
                  <div className="hidden tablet:block">∙</div>
                  <div>
                    {startTime} - {endTime}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="text-12-m font-semibold tablet:text-16-m tablet:font-semibold text-gray-400 flex items-center gap-[4px]">
                <span className="text-16-b tablet:text-18-b font-bold text-black flex justify-start items-center gap-[2px]">
                  ₩{formatNumber(totalPrice)}
                </span>
                / {formatNumber(headCount)}인
              </div>
              <div className="hidden tablet:flex justify-between items-center gap-[12px]">
                <ReviewButtons />
              </div>
            </div>
          </div>
        </section>
        <div className="flex tablet:hidden justify-stretch items-stretch gap-[12px]">
          <ReviewButtons />
        </div>
      </div>
    </li>
  );
}
