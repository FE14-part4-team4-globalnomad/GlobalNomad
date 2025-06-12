'use client'

import Image from 'next/image';

import useReservation from '@/hooks/useReservation';

import DateSelector from './DateSelector';
import GuestCountSelector from './GuestCountSelector';
import AvailableTimes from './AvailableTimes';
import Button from '@/components/button/Button';

import arrowBackIcon from '@/assets/icons/arrow/icon_arrow_back.svg';

type ReservationProps = {
  pricePerPerson: number;
  initialGuestCount?: number;
  initialDate?: Date;
  availableDates: Record<string, string[]>;
  onNext: () => void;
};

export default function ReservationMobileCnt(props: ReservationProps) {
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
    <div className="w-[375px] min-h-[243px] p-[24px] pb-2 rounded-tl-3xl rounded-tr-3xl bg-white">
      <div className="flex items-center gap-1 mb-1">
        <button className="">
          <Image src={arrowBackIcon} alt="이전" />
        </button>
        <span className="text-18-b text-gray-950">인원</span>
      </div>
      <span className="text-16-m text-gray-500 mb-2">예약할 인원을 선택해주세요.</span>
      <div className="mt-2 mb-3">
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

      <Button size="calendar" variant="primary" rounded>
        확인
      </Button>
    </div>
  );
}