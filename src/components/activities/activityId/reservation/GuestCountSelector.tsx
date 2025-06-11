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
    <div className="mb-[24px] flex justify-between items-center">
      <div className="text-16-b text-gray-950">참여 인원 수</div>
      <div className="flex items-center justify-between w-14 h-4 border border-gray-100 rounded-full px-1 py-2">
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