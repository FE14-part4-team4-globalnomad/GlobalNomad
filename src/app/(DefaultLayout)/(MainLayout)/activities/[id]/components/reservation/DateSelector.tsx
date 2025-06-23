"use client";

import { format } from "date-fns";

import { Icon } from "@/components/icon/Icon";

type DateSelectorProps = {
  currentYear: number;
  currentMonth: number;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date) => void;
  daysInMonth: number;
  startDay: number;
  prevMonthDays: number;
  totalCells: number;
  availableDates: Record<string, string[]>;
};

export default function DateSelector({
  currentYear,
  currentMonth,
  handlePrevMonth,
  handleNextMonth,
  selectedDate,
  setSelectedDate,
  daysInMonth,
  startDay,
  prevMonthDays,
  totalCells,
  availableDates,
}: DateSelectorProps) {
  const isAvailable = (
    date: Date,
    availableDates: Record<string, string[]>,
  ) => {
    const formatted = format(date, "yyyy-MM-dd");
    return !!availableDates[formatted];
  };

  return (
    <div className="mb-5">
      <div className="text-gray-950 desktop:text-16-b tablet:text-20-b">
        날짜
      </div>
      <div className="mt-1 desktop:h-35 tablet:w-36 tablet:h-49">
        <div className="flex justify-between items-center mb-2">
          <div className="text-16-m text-gray-950">
            {format(new Date(currentYear, currentMonth), "MMMM yyyy")}
          </div>
          <div className="flex gap-1">
            <button onClick={handlePrevMonth}>
              <Icon name="ChevronRight" className="rotate-180" />
            </button>
            <button onClick={handleNextMonth}>
              <Icon name="ChevronRight" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-16-m w-full">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, index) => (
            <div key={`${d}-${index}`} className="text-center text-gray-800">
              {d}
            </div>
          ))}

          {Array.from({ length: totalCells }).map((_, i) => {
            const dateNum = i - startDay + 1;
            let date: Date | null = null;
            let isCurrentMonth = true;

            if (i < startDay) {
              const prevDate = prevMonthDays - (startDay - i - 1);
              date = new Date(currentYear, currentMonth - 1, prevDate);
              isCurrentMonth = false;
            } else if (i >= startDay + daysInMonth) {
              const nextDate = i - (startDay + daysInMonth) + 1;
              date = new Date(currentYear, currentMonth + 1, nextDate);
              isCurrentMonth = false;
            } else {
              date = new Date(currentYear, currentMonth, dateNum);
            }

            const dateStr = format(date, "yyyy-MM-dd");
            const isSelected = selectedDate
              ? dateStr === format(selectedDate, "yyyy-MM-dd")
              : false;
            const isDateAvailable =
              isCurrentMonth && isAvailable(date!, availableDates);

            return (
              <div
                key={i}
                onClick={() => {
                  if (isDateAvailable) setSelectedDate(date!);
                }}
                className={`
                  aspect-square w-full flex items-center justify-center rounded-full
                  ${isDateAvailable ? "cursor-pointer" : "pointer-events-none"}
                  ${isSelected ? "bg-brand-500 text-white" : ""}
                  ${!isSelected && isDateAvailable ? "bg-brand-100 text-brand-500" : ""}
                  ${!isDateAvailable ? "bg-white" : ""}
                  ${!isCurrentMonth ? "text-gray-300" : "text-gray-950"}
                `}
              >
                {date?.getDate()}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
