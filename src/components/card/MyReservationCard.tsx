import Image from "next/image";

import Button from "../button/Button";
import { MyReservationType } from "@/types/reservation";
import { cn } from "@/utils/classNames";
import { formatNumberWithComma } from "@/utils/common";

type MyReservationCardProps = Omit<
  MyReservationType,
  "teamId" | "userId" | "scheduleId" | "createdAt" | "updatedAt"
>;
/**
 * TODO: 예약 변경/취소 로직 연결
 * TODO: 후기 작성 모달 연결
 */
function ReviewButtons({
  status,
  reviewSubmitted,
}: {
  status: MyReservationCardProps["status"];
  reviewSubmitted: boolean;
}) {
  return status !== "completed" ? (
    <>
      <Button
        size="reservation"
        variant="outline"
        className="mobile:w-full rounded-[8px]"
      >
        예약 변경
      </Button>
      <Button
        size="reservation"
        variant="secondary"
        className="mobile:w-full rounded-[8px]"
        disabled={status !== "pending"}
      >
        예약 취소
      </Button>
    </>
  ) : (
    !reviewSubmitted && (
      <Button size="reservation" className="mobile:w-full rounded-[8px]">
        후기 작성
      </Button>
    )
  );
}

function Badge({ status }: { status: MyReservationCardProps["status"] }) {
  const COMMON_BADGE_STYLE = "rounded-[100px] py-[4px] px-[8px] text-13-b";
  const BADGE_STYLES = {
    canceled: "bg-gray-100 text-gray-600",
    pending: "bg-[#E9FBE4] text-[#2BA90D]",
    declined: "bg-[#FCECEA] text-[#F96767]",
    completed: "bg-[#DAF0FF] text-[#0D6CD1]",
    confirmed: "bg-[#DDF9F9] text-[#1790A0]",
  };
  const BADGE_TEXT = {
    canceled: "예약 취소",
    pending: "예약 완료",
    declined: "예약 거절",
    completed: "체험 완료",
    confirmed: "예약 승인",
  };
  return (
    <div>
      <span className={cn(COMMON_BADGE_STYLE, BADGE_STYLES[status])}>
        {BADGE_TEXT[status]}
      </span>
    </div>
  );
}

function ReservationInfo({
  status,
  title,
  date,
  startTime,
  endTime,
}: {
  status: MyReservationCardProps["status"];
  title: string;
  date: string;
  startTime: string;
  endTime: string;
}) {
  return (
    <div className="grid gap-[4px] tablet:gap-[10px]">
      <div className="grid gap-[8px] tablet:gap-[12px]">
        <Badge status={status} />
        <div className="text-14-b font-semibold tablet:text-18-b tablet:font-semibold">
          {title}
        </div>
      </div>
      <div className="flex items-center tablet:gap-[8px] text-13-m tablet:text-16-m text-gray-500">
        <div className="hidden tablet:block">{date}</div>
        <div className="hidden tablet:block">∙</div>
        <div>
          {startTime} - {endTime}
        </div>
      </div>
    </div>
  );
}

function PriceAndActions({
  totalPrice,
  headCount,
  status,
  reviewSubmitted,
}: {
  totalPrice: number;
  headCount: number;
  status: MyReservationCardProps["status"];
  reviewSubmitted: boolean;
}) {
  return (
    <div className="flex justify-between">
      <div className="text-12-m font-semibold tablet:text-16-m tablet:font-semibold text-gray-400 flex items-center gap-[4px]">
        <span className="text-16-b tablet:text-18-b font-bold text-black flex justify-start items-center gap-[2px]">
          ₩{formatNumberWithComma(totalPrice)}
        </span>
        / {formatNumberWithComma(headCount)}인
      </div>
      {status !== "declined" && status !== "canceled" && (
        <div className="hidden tablet:flex justify-between items-center gap-[12px]">
          <ReviewButtons {...{ status, reviewSubmitted }} />
        </div>
      )}
    </div>
  );
}

function ReservationCardWrapper({
  children,
  bannerImageUrl,
}: {
  children: React.ReactNode;
  bannerImageUrl: string;
}) {
  return (
    <div className="relative grid drop-shadow-card pr-[116px] desktop:pr-[155px]">
      <div
        className={cn(
          "grow-[2.4] grid gap-[8px] tablet:gap-[25px]",
          "bg-white rounded-[24px] tablet:rounded-[30px] p-[20px] tablet:py-[40px] tablet:px-[30px]",
        )}
      >
        {children}
      </div>
      <div className="absolute right-0 z-[-1] aspect-square h-full overflow-hidden rounded-[24px] tablet:rounded-[30px]">
        <Image
          className="object-cover"
          src={bannerImageUrl}
          alt="체험 배너 이미지 미리보기"
          fill
        />
      </div>
    </div>
  );
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
  return (
    <article className="grid gap-[20px]">
      <hr className="border-gray-50 tablet:hidden" />
      <div className="grid gap-[12px]">
        <div className="text-16-b text-gray-800 pl-[8px] tablet:hidden">
          {date}
        </div>
        <ReservationCardWrapper bannerImageUrl={activity.bannerImageUrl}>
          <ReservationInfo
            {...{ status, title: activity.title, date, startTime, endTime }}
          />
          <PriceAndActions
            {...{ totalPrice, headCount, status, reviewSubmitted }}
          />
        </ReservationCardWrapper>
        {status !== "declined" && status !== "canceled" && (
          <div className="flex tablet:hidden justify-stretch items-stretch gap-[12px]">
            <ReviewButtons {...{ status, reviewSubmitted }} />
          </div>
        )}
      </div>
    </article>
  );
}
