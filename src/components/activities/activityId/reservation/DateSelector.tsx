'use client'

import Image from 'next/image';
import { format } from 'date-fns';

import arrowLeftIcon from '@/assets/icons/arrow/icon_alt arrow_left.svg';
import arrowRightIcon from '@/assets/icons/arrow/icon_alt arrow_right.svg';

type DateSelectorProps = {
  currentYear: number;
  currentMonth: number;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  daysInMonth: number;
  startDay: number;
  prevMonthDays: number;
  totalCells: number;
  isAvailable: (date: Date) => boolean;
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
  isAvailable,
}: DateSelectorProps) {
  return (
    <div className="mb-[24px]">
      <div className="text-16-b text-gray-950">날짜</div>
      <div className="mt-1">
        <div className="flex justify-between items-center mb-2">
          <div className="text-16-m text-gray-950">
            {format(new Date(currentYear, currentMonth), 'MMMM yyyy')}
          </div>
          <div className="flex gap-1">
            <button onClick={handlePrevMonth}>
              <Image src={arrowLeftIcon} alt="이전 달" />
            </button>
            <button onClick={handleNextMonth}>
              <Image src={arrowRightIcon} alt="다음 달" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-16-m w-full">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => (
            <div key={d} className="text-center text-gray-800">
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

            const dateStr = format(date, 'yyyy-MM-dd');
            const isSelected = dateStr === format(selectedDate, 'yyyy-MM-dd');
            const isDateAvailable = isCurrentMonth && isAvailable(date!);

            return (
              <div
                key={i}
                onClick={() => {
                  if (isDateAvailable) setSelectedDate(date!);
                }}
                className={`
                  aspect-square w-full flex items-center justify-center rounded-full
                  ${isDateAvailable ? 'cursor-pointer' : 'pointer-events-none'}
                  ${isSelected ? 'bg-brand-500 text-white' : ''}
                  ${!isSelected && isDateAvailable ? 'bg-brand-100 text-brand-500' : ''}
                  ${!isDateAvailable ? 'bg-white' : ''}
                  ${!isCurrentMonth ? 'text-gray-300' : 'text-gray-950'}
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