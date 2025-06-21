import { ReactNode } from "react";

import { CalendarEventBadge } from "./CalendarEventBadge";
import { cn, cond } from "@/utils/classNames";

export interface MyActivityReservationCountType {
  pending: number;
  confirmed: number;
  completed: number;
}

export type StatusType = "pending" | "confirmed" | "completed";

export interface CalendarDateProps
  extends Partial<MyActivityReservationCountType> {
  children?: ReactNode;
  onUpdateDotClick?: (status?: StatusType) => void;
}

export function CalendarDate({
  children,
  pending = 0,
  confirmed = 0,
  completed = 0,
  onUpdateDotClick = () => {},
}: CalendarDateProps) {
  const shouldShowDot = pending > 0 || confirmed > 0 || completed > 0;

  const badgeData = [
    { count: pending, status: "pending", label: "예약" },
    { count: confirmed, status: "confirmed", label: "승인" },
    { count: completed, status: "completed", label: "완료" },
  ].filter((badge) => badge.count > 0) as {
    count: number;
    label: "예약" | "승인" | "완료";
    status: StatusType;
  }[];

  return (
    <div className="w-full flex flex-col items-center select-none">
      <div
        className={cn(
          "relative inline-block",
          cond(shouldShowDot, "cursor-pointer"),
        )}
        onClick={() => shouldShowDot && onUpdateDotClick()}
      >
        {children}
        {shouldShowDot && (
          <div
            className="absolute -top-[5px] -right-[6px] w-[6px] h-[6px] bg-red-500 rounded-full z-10"
            title="Click to dismiss"
          />
        )}
      </div>
      {badgeData.length > 0 && (
        <div className="pt-[6px] tablet:pt-[5px] px-[4px] tablet:px-[12px] flex flex-col gap-[5px] items-center">
          {badgeData.map(
            ({ count, label, status }) =>
              count > 0 && (
                <CalendarEventBadge
                  key={label}
                  label={label}
                  count={count}
                  onClick={() => onUpdateDotClick(status)}
                />
              ),
          )}
        </div>
      )}
    </div>
  );
}
