'use client';

import React, { useState } from "react";
import Image from 'next/image';

import yellowStar from "@/assets/icons/star/icon_star_active.svg";
import mapIcon from "@/assets/icons/any/icon_map.svg";
import moreIcon from "@/assets/icons/any/icon_more.svg";

interface ActivityInfoProps {
  category: string;
  title: string;
  rating: {
    average: number;
    count: number;
  };
  location: string;
  description: string;
}

export default function ActivityInfo({
  category,
  title,
  rating,
  location,
  description,
}: ActivityInfoProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <section className="relative bg-white mb-7 desktop:w-41 desktop:mt-0 tablet:w-67 tablet:mt-[24px] tablet:mb-0 mobile:mt-2 mobile:mb-0 mobile:w-33">
      {/* Title + More Icon Row */}
      <div className="flex justify-between items-start mb-[17px]">
        <div>
          <div className="mb-1 text-14-m text-gray-950">{category}</div>
          <h1 className="text-24-b text-gray-900">{title}</h1>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(prev => !prev)}
          >
            <Image src={moreIcon} alt="더보기" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-full top-1/2 -translate-y-[25%] z-10 bg-white rounded-3xl border border-gray-100 text-16-m text-gray-950">
              <button className="block w-full p-2 whitespace-nowrap">수정하기</button>
              <button className="block w-full p-2 whitespace-nowrap">삭제하기</button>
            </div>
          )}
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center mb-1">
        <Image src={yellowStar} alt="별점" className="inline-block" />
        <div className="ml-[6px] text-14-m text-gray-700">
          <span>{rating.average.toFixed(1)}</span>
          <span> ({rating.count})</span>
        </div>
      </div>

      {/* Location */}
      <div className="mb-2 flex items-center">
        <Image src={mapIcon} alt="지도아이콘" className="inline-block mr-[4.7px]" />
        <span className="text-14-m text-gray-700">{location}</span>
      </div>

      {/* Description */}
      <p className="text-14-body-m text-gray-800">{description}</p>
    </section>
  );
}