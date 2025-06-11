'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/button/Button';

type ReservationBtnProps = {
  pricePerPerson: number;
  onReserve?: () => void;
  isReady: boolean;
};

export default function ReservationBtn({ pricePerPerson, onReserve, isReady }: ReservationBtnProps) {
  const router = useRouter();

  const handleDateLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const width = window.innerWidth;

    if (width < 768) {
      // 모바일
      router.push('/reservation/mobile');  // 모바일용 예약 페이지 주소
    } else if (width < 1024) {
      // 태블릿
      router.push('/reservation/tablet'); // 태블릿용 예약 페이지 주소
    } else {
      // 데스크탑 or 기본
      router.push('/reservation'); // 데스크탑용 또는 기본 예약 페이지
    }
  };

  return (
    <div className="py-2 px-[24px]">
      <div className="mb-[24px] flex justify-between items-center">
        <div>
          <span className="text-24-b text-gray-950">
            ₩ {pricePerPerson.toLocaleString()}{' '}
          </span>
          <span className="text-20-m text-gray-500">/ 인</span>
        </div>

        <a href="#"
          onClick={handleDateLinkClick}
          className="text-16-b text-brand-500 cursor-pointer"
        >
          날짜 선택하기
        </a>
      </div>

      <Button
        size="calendar"
        variant={isReady ? 'primary' : 'secondary'}
        fullWidth={false}
        rounded
        onClick={onReserve}
        disabled={!isReady}
      >
        예약하기
      </Button>
    </div>
  );
}