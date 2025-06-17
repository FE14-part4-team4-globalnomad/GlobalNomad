'use client';

import Image from 'next/image';

import useReservation from '@/hooks/useReservation';
import GuestCountSelector from './GuestCountSelector';
import Button from '@/components/button/Button';

import arrowBackIcon from '@/assets/icons/arrow/icon_arrow_back.svg';

type ReservationMobileCntProps = {
  pricePerPerson: number;
  activityId: number;
  initialGuestCount?: number;
  initialDate?: Date;
  onBack: () => void;
  onConfirm: (guestCount: number) => void;
};

export default function ReservationMobileCnt({
  pricePerPerson,
  activityId,
  initialGuestCount,
  initialDate,
  onBack,
  onConfirm,
}: ReservationMobileCntProps) {
  const {
    guestCount,
    handleDecrease,
    handleIncrease,
    total,
  } = useReservation({ pricePerPerson, initialGuestCount, initialDate, activityId });

  return (
    <div className="w-full h-full overflow-y-auto p-[24px] rounded-t-3xl bg-white">
      <div className="flex items-center gap-1 mb-1">
        <button onClick={onBack}>
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

        <div className="flex items-center justify-between border-t border-gray-200 pt-2 pb-1">
          <div>
            <span className="text-20-m text-gray-500 mr-[6px]">총 합계</span>
            <span className="text-20-b text-gray-950">₩ {total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <Button
        size="calendar"
        variant="primary"
        rounded
        onClick={() => onConfirm(guestCount)}
      >
        확인
      </Button>
    </div>
  );
}