'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { useMyActivityDeleteMutation } from '@/apis/activity/activity.query';
import { useOverlay } from '@/hooks/useOverlay';

import WarningModal from '@/components/modal/WarningModal';

import yellowStar from '@/assets/icons/star/icon_star_active.svg';
import mapIcon from '@/assets/icons/any/icon_map.svg';
import moreIcon from '@/assets/icons/any/icon_more.svg';

interface ActivityInfoProps {
  category: string;
  title: string;
  rating: {
    average: number;
    count: number;
  };
  location: string;
  description: string;
  isMine?: boolean;
  activityId?: number;
}

export default function ActivityInfo({
  category,
  title,
  rating,
  location,
  description,
  isMine = false,
  activityId,
}: ActivityInfoProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const { overlay } = useOverlay();
  const { mutate: deleteActivity } = useMyActivityDeleteMutation();

  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <section className="relative bg-white desktop:mb-7 desktop:w-41 desktop:mt-0 tablet:w-67 tablet:mt-[24px] tablet:mb-0 mobile:mt-2 mobile:mb-0 mobile:w-33">
      <div className="flex justify-between items-start mb-[17px]">
        <div>
          <div className="mb-1 text-14-m text-gray-950">{category}</div>
          <h1 className="text-24-b text-gray-900">{title}</h1>
        </div>

        {isMine && (
          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsDropdownOpen(prev => !prev)}>
              <Image src={moreIcon} alt="더보기" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-full top-1/2 -translate-y-[25%] z-10 bg-white rounded-3xl border border-gray-100 text-16-m text-gray-950 shadow-lg">
                <button
                  type="button"
                  className="block w-full p-2 whitespace-nowrap"
                  onClick={() => {
                    if (activityId !== undefined) {
                      router.push(`/experience/update/${activityId}`);
                    }
                  }}
                >
                  수정하기
                </button>
                <button
                  className="block w-full p-2 whitespace-nowrap text-red-500"
                  onClick={() =>
                    overlay(
                      <div className="fixed inset-0 z-[9999] flex items-center justify-center">
                        <style>
                          {`
                            [aria-label="image wrapper"] {
                              position: relative !important;
                              width: 88px !important;
                              height: 88px !important;
                              margin-left: auto !important;
                              margin-right: auto !important;
                            }
                          `}
                        </style>
                        <WarningModal
                          message="정말 삭제하시겠습니까?"
                          confirmText="삭제"
                          onConfirm={() => {
                            if (activityId !== undefined) {
                              deleteActivity({ activityId }, {
                                onSuccess: () => {
                                  router.push("/");
                                },
                              });
                            }
                          }}
                        />
                      </div>
                    )
                  }
                >
                  삭제하기
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center mb-1">
        <Image src={yellowStar} alt="별점" className="inline-block" />
        <div className="ml-[6px] text-14-m text-gray-700">
          <span>{rating.average.toFixed(1)}</span>
          <span> ({rating.count})</span>
        </div>
      </div>

      <div className="mb-2 flex items-center">
        <Image src={mapIcon} alt="지도아이콘" className="inline-block mr-[4.7px]" />
        <span className="text-14-m text-gray-700">{location}</span>
      </div>

      <p className="text-14-body-m text-gray-800">{description}</p>
    </section>
  );
}