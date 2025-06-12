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

export default function ReservationTablet(props: ReservationProps) {
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
    <div className="w-[744px] min-h-[675px] px-3 py-[24px] rounded-tl-3xl rounded-tr-3xl bg-white">
      <div className="flex justify-center gap-2 mb-4">
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

        <div className="w-30 rounded-3xl shadow-lg bg-white p-[24px] mt-5">
          <AvailableTimes
            availableTimesForSelectedDate={availableTimesForSelectedDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />

          <GuestCountSelector
            guestCount={guestCount}
            handleDecrease={handleDecrease}
            handleIncrease={handleIncrease}
          />
          
          {/* 총 합계 */}
          <div className="flex items-center justify-between border-t border-gray-200 pt-2 pb-1">
            <div>
              <span className="text-20-m text-gray-500 mr-[6px]">총 합계</span>
              <span className="text-20-b text-gray-950">₩ {total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <Button size="calendar" variant="primary" rounded>
        확인
      </Button>
    </div>
  );
}