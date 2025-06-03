import { ReactNode } from "react";

type CalendarDayProps = {
  children?: ReactNode;
  예약Count?: number;
  승인Count?: number;
  완료Count?: number;
  onUpdateDotClick?: () => void;
};

export function CalendarDay({
  children,
  예약Count = 0,
  승인Count = 0,
  완료Count = 0,
  onUpdateDotClick,
}: CalendarDayProps) {
  const shouldShowDot = 예약Count > 0 || 승인Count > 0 || 완료Count > 0;

  return (
    <div className="relative w-full">
      {shouldShowDot && (
        <div
          className="absolute top-0 right-0 w-[6px] h-[6px] bg-red-500 rounded-full z-10 cursor-pointer"
          onClick={onUpdateDotClick}
          title="Click to dismiss"
        />
      )}
      {children}
    </div>
  );
}