"use client";

import Image from "next/image";
import { useState } from "react";

import { CalendarDate } from "./CalendarDate";
import { useMyMonthlyReservations } from "@/apis/myActivity/myActivity.query";
import ChevronDown from "@/assets/icons/arrow/icon_alt arrow_down_black.svg";
import {
  formatMonth,
  formatYear,
  getCalendarMatrix,
  nowKST,
} from "@/utils/calendar";
import { cn, cond } from "@/utils/classNames";

export default function Calendar({ activityId }: { activityId: number }) {
  const [year, setYear] = useState<number>(nowKST.getFullYear());
  const [month, setMonth] = useState<number>(nowKST.getMonth() + 1);
  const dates = getCalendarMatrix(year, month);
  console.log(dates);

  const params = {
    activityId,
    year: formatYear(year),
    month: formatMonth(month),
  };
  const { data: reservations } = useMyMonthlyReservations(params);

  function handlePrevMonth() {
    if (month === 1) setYear(year - 1);
    setMonth(month - 1);
  }
  function handleNextMonth() {
    if (month === 12) setYear(year + 1);
    setMonth(month + 1);
  }

  return (
    <section
      className="w-full grid justify-stretch tablet:dimmed"
      id="calendar-component-area"
    >
      <div className="h-[44px] flex justify-center items-center mb-[8px] tablet:mt-[20px] tablet:mb-[30px]">
        <button onClick={handlePrevMonth}>
          <Image
            className="rotate-90"
            src={ChevronDown}
            alt="뒤로가기 버튼 이미지"
            width={24}
            height={24}
          />
        </button>
        <div>
          {year}년 {formatMonth(month)}월
        </div>
        <button onClick={handleNextMonth}>
          <Image
            className="rotate-270"
            src={ChevronDown}
            alt="뒤로가기 버튼 이미지"
            width={24}
            height={24}
          />
        </button>
      </div>
      <div className="w-full grid justify-stretch">
        <div className="h-[44px] tablet:pb-[10px] grid items-center grid-cols-7 text-13-b tablet:text-16-b text-center border-b-1 border-gray-100">
          <div>S</div>
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
        </div>
        <div className="grid grid-cols-7 border-b-1 border-gray-100">
          {dates.map(({ date, isCurrentMonth }, idx) => {
            const current = date.format("YYYY-MM-DD");
            const reservationInfo = reservations?.find(
              (res) => res.date === current,
            );
            return (
              <article
                key={idx}
                className={cn(
                  "h-[104px] tablet:h-[124px] pt-[10px] tablet:pt-[18px]",
                  cond(idx < 28, "border-b-1 border-gray-50"),
                )}
              >
                <CalendarDate
                  pending={reservationInfo?.reservations.pending}
                  confirmed={reservationInfo?.reservations.confirmed}
                  completed={reservationInfo?.reservations.completed}
                >
                  <div
                    className={cn(
                      "text-12-m tablet:text-16-m",
                      cond(!isCurrentMonth, "text-gray-400"),
                    )}
                  >
                    {date.date()}
                  </div>
                </CalendarDate>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
