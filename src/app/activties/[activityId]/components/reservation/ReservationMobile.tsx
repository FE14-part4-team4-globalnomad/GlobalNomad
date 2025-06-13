// 모바일 예약 컴포넌트

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
  onNext: () => void;
};

export default function ReservationMobile(props: ReservationProps) {
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
    <div className="w-full h-full overflow-y-auto p-[24px] pb-2 rounded-tl-3xl rounded-tr-3xl bg-white">
      <div className="mb-4">
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

        <AvailableTimes
          availableTimesForSelectedDate={availableTimesForSelectedDate}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
      </div>

      <Button size="calendar" variant="primary" rounded onClick={props.onNext}>
        확인
      </Button>
    </div>
  );
}