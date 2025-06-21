"use client";

import AvailableTimes from "./AvailableTimes";
import DateSelector from "./DateSelector";
import Button from "@/components/button/Button";
import useReservation from "@/hooks/useReservation";

type ReservationMobileProps = {
  pricePerPerson: number;
  activityId: number;
  initialGuestCount?: number;
  initialDate?: Date;
  onNext: (selectedDate: Date, selectedTime: string) => void;
};

export default function ReservationMobile({
  pricePerPerson,
  activityId,
  initialGuestCount,
  initialDate,
  onNext,
}: ReservationMobileProps) {
  const {
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    currentYear,
    currentMonth,
    handlePrevMonth,
    handleNextMonth,
    daysInMonth,
    startDay,
    prevMonthDays,
    totalCells,
    availableDates,
    availableTimesForSelectedDate,
  } = useReservation({
    pricePerPerson,
    initialGuestCount,
    initialDate,
    activityId,
  });

  const isSelectable = selectedDate !== null && selectedTime !== "";

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
          availableDates={availableDates}
        />

        <AvailableTimes
          availableTimesForSelectedDate={availableTimesForSelectedDate}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
      </div>

      <Button
        size="calendar"
        variant={isSelectable ? "primary" : "secondary"}
        rounded
        onClick={() => {
          if (selectedDate && selectedTime) {
            onNext(selectedDate, selectedTime);
          }
        }}
        disabled={!isSelectable}
      >
        확인
      </Button>
    </div>
  );
}
