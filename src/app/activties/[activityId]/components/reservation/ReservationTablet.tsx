'use client';

import { useEffect } from 'react';

import useReservation from '@/hooks/useReservation';
import Button from '@/components/button/Button';

import DateSelector from './DateSelector';
import GuestCountSelector from './GuestCountSelector';
import AvailableTimes from './AvailableTimes';

type ReservationTabletProps = {
  pricePerPerson: number;
  activityId: number;
  selectedDate: Date | null;
  setSelectedDate: (date: Date) => void;
  selectedTime: string | null;
  setSelectedTime: (time: string) => void;
  guestCount: number;
  setGuestCount: (count: number) => void;
  onConfirm: () => void;
};

export default function ReservationTablet({
  pricePerPerson,
  activityId,
  selectedDate: externalSelectedDate,
  setSelectedDate: setExternalSelectedDate,
  selectedTime: externalSelectedTime,
  setSelectedTime: setExternalSelectedTime,
  guestCount: externalGuestCount,
  setGuestCount: setExternalGuestCount,
  onConfirm,
}: ReservationTabletProps) {
  const {
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    guestCount,
    handleDecrease,
    handleIncrease,
    currentYear,
    currentMonth,
    handlePrevMonth,
    handleNextMonth,
    total,
    daysInMonth,
    startDay,
    prevMonthDays,
    totalCells,
    availableDates,
    availableTimesForSelectedDate,
  } = useReservation({ pricePerPerson, activityId });

  useEffect(() => {
    if (externalSelectedDate) setSelectedDate(externalSelectedDate);
  }, [externalSelectedDate]);

  useEffect(() => {
    if (externalSelectedTime) setSelectedTime(externalSelectedTime);
  }, [externalSelectedTime]);

  useEffect(() => {
    setExternalGuestCount(guestCount);
  }, [guestCount]);

  useEffect(() => {
    if (selectedDate) setExternalSelectedDate(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    if (selectedTime) setExternalSelectedTime(selectedTime);
  }, [selectedTime]);

  useEffect(() => {
    setExternalGuestCount(guestCount);
  }, [guestCount]);

  const isReadyToReserve = !!selectedDate && !!selectedTime;

  return (
    <div className="w-full h-full overflow-y-auto px-3 py-[24px] rounded-t-3xl bg-white">
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
          availableDates={availableDates}
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

          <div className="flex items-center justify-between border-t border-gray-200 pt-2 pb-1">
            <div>
              <span className="text-20-m text-gray-500 mr-[6px]">총 합계</span>
              <span className="text-20-b text-gray-950">₩ {total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <Button
        size="calendar"
        variant={isReadyToReserve ? 'primary' : 'secondary'}
        rounded
        onClick={() => {
          if (!isReadyToReserve) return;
          onConfirm();
        }}
      >
        확인
      </Button>
    </div>
  );
}