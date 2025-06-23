import Image from "next/image";
import { createContext, ReactNode, useContext } from "react";

import Button from "../button/Button";
import { MyReservationType, ReservationStatusType } from "@/types/reservation";
import { cn } from "@/utils/classNames";
import { formatNumberWithComma } from "@/utils/common";

interface MyReservationCardProps {
  reservationInfo: Omit<
    MyReservationType,
    "teamId" | "userId" | "scheduleId" | "createdAt" | "updatedAt"
  >;
  onChangeReservation?: () => void;
  onCancelReservation?: () => void;
  onUpdateReview?: () => void;
}

const MyReservationCardContext = createContext<MyReservationCardProps | null>(
  null,
);

function useMyReservationCard() {
  const context = useContext(MyReservationCardContext);
  if (!context)
    throw new Error(
      "MyReservationCard components must be used within <MyReservationCardProvider />",
    );
  return context;
}

function MyReservationCardProvider({
  children,
  reservationInfo,
  onChangeReservation = () => {},
  onCancelReservation = () => {},
  onUpdateReview = () => {},
}: { children: ReactNode } & MyReservationCardProps) {
  return (
    <MyReservationCardContext.Provider
      value={{
        reservationInfo,
        onChangeReservation,
        onCancelReservation,
        onUpdateReview,
      }}
    >
      {reservationInfo ? children : <></>}
    </MyReservationCardContext.Provider>
  );
}

function ReviewButtons() {
  const {
    reservationInfo: { status, reviewSubmitted },
    onCancelReservation,
    onUpdateReview,
  } = useMyReservationCard();
  return status !== "completed" ? (
    <>
      <Button
        size="reservation"
        variant="secondary"
        className="mobile:w-full rounded-[8px]"
        disabled={status !== "pending"}
        onClick={onCancelReservation}
      >
        예약 취소
      </Button>
    </>
  ) : (
    !reviewSubmitted && (
      <Button
        size="reservation"
        className="mobile:w-full rounded-[8px]"
        onClick={onUpdateReview}
      >
        후기 작성
      </Button>
    )
  );
}
MyReservationCardProvider.ReviewButtons = ReviewButtons;

function Badge({ status }: { status: ReservationStatusType }) {
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

function ReservationInfo() {
  const {
    reservationInfo: {
      status,
      activity: { title },
      date,
      startTime,
      endTime,
    },
  } = useMyReservationCard();
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
MyReservationCardProvider.ReservationInfo = ReservationInfo;

function PriceAndActions() {
  const {
    reservationInfo: { totalPrice, headCount, status },
  } = useMyReservationCard();
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
          <MyReservationCardProvider.ReviewButtons />
        </div>
      )}
    </div>
  );
}
MyReservationCardProvider.PriceAndActions = PriceAndActions;

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
MyReservationCardProvider.ReservationCardWrapper = ReservationCardWrapper;

/**
 * 예약관리 리스트 아이템
 */
export default function MyReservationCard({
  reservationInfo,
  onChangeReservation = () => {},
  onCancelReservation = () => {},
  onUpdateReview = () => {},
}: MyReservationCardProps) {
  return (
    <MyReservationCardProvider
      {...{
        reservationInfo,
        onChangeReservation,
        onCancelReservation,
        onUpdateReview,
      }}
    >
      <article className="grid gap-[20px]">
        <hr className="border-gray-50 tablet:hidden" />
        <div className="grid gap-[12px]">
          <div className="text-16-b text-gray-800 pl-[8px] tablet:hidden">
            {reservationInfo.date}
          </div>
          <ReservationCardWrapper
            bannerImageUrl={reservationInfo.activity.bannerImageUrl}
          >
            <MyReservationCardProvider.ReservationInfo />
            <MyReservationCardProvider.PriceAndActions />
          </ReservationCardWrapper>
          {reservationInfo.status !== "declined" && status !== "canceled" && (
            <div className="flex tablet:hidden justify-stretch items-stretch gap-[12px]">
              <MyReservationCardProvider.ReviewButtons />
            </div>
          )}
        </div>
      </article>
    </MyReservationCardProvider>
  );
}
