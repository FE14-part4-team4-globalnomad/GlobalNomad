import { ReactNode } from "react";

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

const reservationStyles = {
  예약: "bg-brand-100 text-brand-500",
  승인: "bg-[#FFF8DD] text-[#FFB051]",
  완료: "bg-gray-50 text-gray-500",
};

export function CalendarDay({
  children,
  pending = 0,
  confirmed = 0,
  completed = 0,
  onUpdateDotClick,
}: CalendarDayProps) {
  const shouldShowDot = pending > 0 || confirmed > 0 || completed > 0;

  const badgeData = [
    { count: pending, label: "예약", style: reservationStyles.예약 },
    { count: confirmed, label: "승인", style: reservationStyles.승인 },
    { count: completed, label: "완료", style: reservationStyles.완료 },
  ].filter((badge) => badge.count > 0);

  return (
    <div className="w-full flex flex-col items-center select-none">
      <div className="relative inline-block">
        {children}
        {shouldShowDot && (
          <div
            className="absolute -top-[5px] -right-[6px] w-[6px] h-[6px] bg-red-500 rounded-full z-10 cursor-pointer"
            onClick={onUpdateDotClick}
            title="Click to dismiss"
          />
        )}
      </div>

      {badgeData.length > 0 && (
        <div className="mt-[5px] flex flex-col gap-[5px] items-center">
          {badgeData.map(({ count, label, style }) => (
            <span
              key={label}
              className={`px-1.5 py-0.5 text-xs rounded ${style}`}
            >
              {label} {count}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
