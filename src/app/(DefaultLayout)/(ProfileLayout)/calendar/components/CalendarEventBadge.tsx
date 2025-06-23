import { cn } from "@/utils/classNames";

const calendarEventBadgeStyles = {
  예약: "bg-brand-100 text-brand-500",
  승인: "bg-[#FFF8DD] text-[#FFB051]",
  완료: "bg-gray-50 text-gray-500",
};

type CalendarEventBadgeProps = {
  label: "예약" | "승인" | "완료";
  count: number;
  onClick?: () => void;
};

export function CalendarEventBadge({
  label,
  count,
  onClick,
}: CalendarEventBadgeProps) {
  return (
    <button
      className={cn(
        "min-w-[44px] rounded-[4px]",
        "text-[11px] tablet:text-14-m transition",
        calendarEventBadgeStyles[label],
      )}
      onClick={onClick}
    >
      {label} {count}
    </button>
  );
}
