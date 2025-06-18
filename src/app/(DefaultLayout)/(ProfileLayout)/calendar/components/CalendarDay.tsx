import { ReactNode } from "react";

import { CalendarEventBadge } from "./CalendarEventBadge";

export interface MyActivityReservationCountType {
  pending: number;
  confirmed: number;
  completed: number;
}

export interface CalendarDayProps
  extends Partial<MyActivityReservationCountType> {
  children?: ReactNode;
  onUpdateDotClick?: () => void;
}

export function CalendarDay({
  children,
  pending = 0,
  confirmed = 0,
  completed = 0,
  onUpdateDotClick = () => {},
}: CalendarDayProps) {
  const shouldShowDot = pending > 0 || confirmed > 0 || completed > 0;

  const badgeData = [
    { count: pending, label: "예약" },
    { count: confirmed, label: "승인" },
    { count: completed, label: "완료" },
  ].filter((badge) => badge.count > 0) as {
    count: number;
    label: "예약" | "승인" | "완료";
  }[];

  return (
    <div className="w-full flex flex-col items-center select-none">
      <div
        className="relative inline-block"
        onClick={() => shouldShowDot && onUpdateDotClick()}
      >
        {children}
        {shouldShowDot && (
          <div
            className="absolute -top-[5px] -right-[6px] w-[6px] h-[6px] bg-red-500 rounded-full z-10 cursor-pointer"
            title="Click to dismiss"
          />
        )}
      </div>
      {badgeData.length > 0 && (
        <div className="pt-[6px] tablet:pt-[5px] px-[4px] tablet:px-[12px] flex flex-col gap-[5px] items-center">
          {badgeData.map(
            ({ count, label }) =>
              count > 0 && (
                <CalendarEventBadge key={label} label={label} count={count} />
              ),
          )}
        </div>
      )}
    </div>
  );
}
