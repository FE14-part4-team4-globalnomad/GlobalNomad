'use client'

import Image from 'next/image';

import plusIcon from '@/assets/icons/plus_minus/icon_plus.svg';
import minusIcon from '@/assets/icons/plus_minus/icon_minus.svg';

type GuestCountSelectorProps = {
  guestCount: number;
  handleDecrease: () => void;
  handleIncrease: () => void;
};

export default function GuestCountSelector({
  guestCount,
  handleDecrease,
  handleIncrease,
}: GuestCountSelectorProps) {
  return (
    <div className="desktop:flex desktop:justify-between desktop:items-center desktop:mb-[24px] tablet:block tablet:items-start tablet:justify-start tablet:mb-4">
      <div className="text-16-b text-gray-950">참여 인원 수</div>
      <div className={`flex items-center justify-between border border-gray-100 px-1 py-2
        desktop:rounded-full desktop:mt-0 desktop:w-14 desktop:h-4 tablet:rounded-3xl tablet:mt-2 tablet:w-full h-5 mobile:rounded-3xl`}>
        <button
          onClick={handleDecrease}
          disabled={guestCount === 1}
          className={`${guestCount === 1 ? 'opacity-30 pointer-events-none' : ''}`}
        >
          <Image src={minusIcon} alt="감소" />
        </button>
        <span className="text-16-b text-gray-950">{guestCount}</span>
        <button onClick={handleIncrease}>
          <Image src={plusIcon} alt="증가" />
        </button>
      </div>
    </div>
  );
}