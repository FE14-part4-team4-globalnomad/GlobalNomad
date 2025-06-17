'use client';

import { useOverlay } from '@/hooks/useOverlay';
import useReservation from '@/hooks/useReservation';

import { useActivityReservationMutation } from '@/apis/activity/activity.query';

import DateSelector from './DateSelector';
import GuestCountSelector from './GuestCountSelector';
import AvailableTimes from './AvailableTimes';

import Button from '@/components/button/Button';
import ConfirmModal from '@/components/modal/ConfirmModal';

type ReservationProps = {
  pricePerPerson: number;
  activityId: number;
  isMine?: boolean;
};

export default function Reservation({ pricePerPerson, activityId, isMine = false }: ReservationProps) {
  if (!isMine) return null;

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
    total,
    daysInMonth,
    startDay,
    prevMonthDays,
    totalCells,
    availableDates,
    availableTimesForSelectedDate,
    selectedScheduleId,
  } = useReservation({ pricePerPerson, activityId });

  const { overlay } = useOverlay();
  const { mutate: reserveActivity } = useActivityReservationMutation();

  const isReadyToReserve = selectedDate && selectedTime && setSelectedTime;

  return (
    <div className="w-41 p-3 rounded-3xl shadow-lg bg-white border border-gray-100">
      <div className="mb-[24px]">
        <span className="text-24-b text-gray-950">₩ {pricePerPerson.toLocaleString()} </span>
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
        availableDates={availableDates}
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

      <div className="flex items-center justify-between border-t border-gray-200 pt-2 pb-1">
        <div>
          <span className="text-20-m text-gray-500 mr-[6px]">총 합계</span>
          <span className="text-20-b text-gray-950">₩ {total.toLocaleString()}</span>
        </div>

        <Button
          size="calendar"
          variant={isReadyToReserve ? 'primary' : 'secondary'}
          rounded
          className="!w-13"
          onClick={() => {
            if (!isReadyToReserve || !selectedScheduleId) return;

            reserveActivity(
              {
                activityId,
                payload: {
                  scheduleId: selectedScheduleId,
                  headCount: guestCount,
                },
              },
              {
                onSuccess: () => {
                  overlay(
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
                      <ConfirmModal
                        message="예약이 완료되었습니다."
                      />
                    </div>
                  );
                },
              }
            );
          }}
          disabled={!isReadyToReserve}
        >
          예약하기
        </Button>
      </div>
    </div>
  );
}