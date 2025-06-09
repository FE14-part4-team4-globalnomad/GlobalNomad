const calendarEventBadgeStyles = {
  예약: "bg-brand-100 text-brand-500",
  승인: "bg-[#FFF8DD] text-[#FFB051]",
  완료: "bg-gray-50 text-gray-500",
};

type CalendarEventBadgeProps = {
  type: "예약" | "승인" | "완료";
  count: number;
  onClick?: () => void;
};

export function CalendarEventBadge({
  type,
  count,
  onClick,
}: CalendarEventBadgeProps) {
  return (
    <button
      className={`px-[11.5px] py-[2px] rounded-[4px] text-14-m transition ${calendarEventBadgeStyles[type]}`}
      onClick={onClick}
    >
      {type} {count}
    </button>
  );
}
