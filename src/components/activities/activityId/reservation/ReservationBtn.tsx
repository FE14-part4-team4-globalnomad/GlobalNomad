'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/button/Button';

type ReservationBtnProps = {
  pricePerPerson: number;
  onReserve?: () => void;
  isReady: boolean;
};

export default function ReservationBtn({ pricePerPerson, onReserve, isReady }: ReservationBtnProps) {

  const handleDateLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
  };

  return (
    <div className="py-2 px-[24px] bg-white border-t border-gray-100">
      <div className="mb-1 flex justify-between items-center max-w-[700px] mx-auto w-full mobile:max-w-[330px]">
        <div>
          <span className="text-24-b text-gray-950">
            ₩ {pricePerPerson.toLocaleString()}{' '}
          </span>
          <span className="text-20-m text-gray-500">/ 인</span>
        </div>

        <a href="#"
          onClick={handleDateLinkClick}
          className="text-16-b text-brand-500 underline cursor-pointer"
        >
          날짜 선택하기
        </a>
      </div>

      <div className="flex justify-center">
        <Button
          size="calendar"
          variant={isReady ? 'primary' : 'secondary'}
          fullWidth
          rounded
          onClick={onReserve}
          disabled={!isReady}
        >
          예약하기
        </Button>
      </div>
    </div>
  );
}