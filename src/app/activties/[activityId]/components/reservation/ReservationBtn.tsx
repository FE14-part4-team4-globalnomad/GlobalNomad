// 태블릿, 모바일 예약 버튼 컴포넌트

'use client';

import { useRouter } from 'next/navigation';

import { useOverlay } from "@/hooks/useOverlay";

import Button from '@/components/button/Button';
import ConfirmModal from "@/components/modal/ConfirmModal";

type ReservationBtnProps = {
  pricePerPerson: number;
  onReserve?: () => void;
  isReady: boolean;
  onDateClick?: () => void;
};

export default function ReservationBtn({ pricePerPerson, onReserve, isReady, onDateClick }: ReservationBtnProps) {
  const { overlay } = useOverlay();
  
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
          onClick={(e) => {
            e.preventDefault();
            onDateClick?.();
          }}
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
          onClick={() =>
            overlay(
              <ConfirmModal
                message="예약이 완료되었습니다."
                onConfirm={() => {
                  // 실제 예약 처리 로직
                  console.log("예약 확정");
                }}
              />
            )
          }
          disabled={!isReady}
        >
          예약하기
        </Button>
      </div>
    </div>
  );
}