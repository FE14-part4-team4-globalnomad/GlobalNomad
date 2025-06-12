'use client'

import useReservation from '@/hooks/useReservation';

import DateSelector from './DateSelector';
import GuestCountSelector from './GuestCountSelector';
import AvailableTimes from './AvailableTimes';

import Button from '@/components/button/Button';

type ReservationProps = {
  pricePerPerson: number;
  initialGuestCount?: number;
  initialDate?: Date;
  availableDates: Record<string, string[]>;
};

export default function Reservation(props: ReservationProps) {
  const {
    selectedDate,
    setSelectedDate,
    guestCount,
    handleDecrease,
    handleIncrease,
    selectedTime,
    setSelectedTime,
    currentYear,
    currentMonth,
    handlePrevMonth,
    handleNextMonth,
    isAvailable,
    total,
    daysInMonth,
    startDay,
    prevMonthDays,
    totalCells,
    availableTimesForSelectedDate,
  } = useReservation(props);

  return (
    <div className="w-41 p-3 rounded-3xl shadow-lg bg-white border border-gray-100">
      <div className="mb-[24px]">
        <span className="text-24-b text-gray-950">
          ₩ {props.pricePerPerson.toLocaleString()}{' '}
        </span>
        <span className="text-20-m text-gray-500">/ 인</span>
      </div>

      <DateSelector
        currentYear={currentYear}
        currentMonth={currentMonth}
        handlePrevMonth={handlePrevMonth}
        handleNextMonth={handleNextMonth}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        daysInMonth={daysInMonth}
        startDay={startDay}
        prevMonthDays={prevMonthDays}
        totalCells={totalCells}
        isAvailable={isAvailable}
      />

      <GuestCountSelector
        guestCount={guestCount}
        handleDecrease={handleDecrease}
        handleIncrease={handleIncrease}
      />

      <AvailableTimes
        availableTimesForSelectedDate={availableTimesForSelectedDate}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
      />

      {/* 총 합계 */}
      <div className="flex items-center justify-between border-t border-gray-200 pt-2 pb-1">
        <div>
          <span className="text-20-m text-gray-500 mr-[6px]">총 합계</span>
          <span className="text-20-b text-gray-950">₩ {total.toLocaleString()}</span>
        </div>

        <Button size="calendar" variant="primary" rounded className="!w-13">
          예약하기
        </Button>
      </div>
    </div>
  );
}