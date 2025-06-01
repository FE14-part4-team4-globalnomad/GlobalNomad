import Image from "next/image";

import { cn } from "@/utils/classNames";
import { formatNumberWithComma } from "@/utils/common";

// TODO: type 정의 반영
interface MyReservationCardProps {
  id?: number;
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
}: MyReservationCardProps) {
  /* TODO: Button component 반영 */
  function ReviewButtons() {
    return reviewSubmitted ? (
      <>
        <button className="w-full">예약 변경</button>
        <button className="w-full">예약 취소</button>
      </>
    ) : (
      <button className="w-full">후기 작성</button>
    );
  }
  return (
    <article className="grid gap-[20px]">
      <hr className="border-gray-50 tablet:hidden" />
      <div className="grid gap-[12px]">
        <div className="text-16-b text-gray-800 pl-[8px] tablet:hidden">
          {date}
        </div>
        <div className="relative grid drop-shadow-card pr-[116px] desktop:pr-[155px]">
          <div
            className={cn(
              "grow-[2.4] grid gap-[8px] tablet:gap-[25px]",
              "bg-white rounded-[24px] tablet:rounded-[30px] p-[20px] tablet:py-[40px] tablet:px-[30px]",
            )}
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
                  ₩{formatNumberWithComma(totalPrice)}
                </span>
                / {formatNumberWithComma(headCount)}인
              </div>
              <div className="hidden tablet:flex justify-between items-center gap-[12px]">
                <button className="w-full">예약 변경</button>
                <button className="w-full">예약 취소</button>
                <button className="w-full">후기 작성</button>
              </div>
            </div>
          </div>
          <div className="absolute right-0 z-[-1] aspect-square h-full overflow-hidden rounded-[24px] tablet:rounded-[30px]">
            <Image
              className="object-cover"
              src={activity.bannerImageUrl}
              alt="체험 배너 이미지 미리보기"
              fill
            />
          </div>
        </div>
        <div className="flex tablet:hidden justify-stretch items-stretch gap-[12px]">
          <ReviewButtons />
        </div>
      </div>
    </article>
  );
}
