'use client';

import React from "react";
import Image from 'next/image';

import yellowStar from "@/assets/icons/star/icon_star_active.svg";
import grayStar from "@/assets/icons/star/icon_star_inactive.svg";

type ReviewItemData = {
  name: string;
  date: string; // "yyyy.mm.dd"
  rating: number; // 0~5
  content: string;
}

interface ReviewListProps {
  totalReviews: number;
  averageRating: number;
  reviews: ReviewItemData[];
}

const getSatisfactionLabel = (rating: number) => {
  if (rating >= 4.5) return "매우 만족";
  if (rating >= 3.5) return "만족";
  if (rating >= 2.5) return "보통";
  if (rating >= 1.5) return "싫음";
  return "매우 싫음";
};

export default function ReviewList({ totalReviews, averageRating, reviews }: ReviewListProps) {
  const formattedTotal = totalReviews.toLocaleString();
  const ratingLabel = getSatisfactionLabel(averageRating);

  return (
    <div className="mt-4 py-4 w-67 text-gray-950 border-t border-gray-200">
      {/* 제목 및 총 후기 수 */}
      <div className="text-18-b mb-1">
        체험후기 <span className="text-16-b text-gray-400 ml-1">{formattedTotal}개</span>
      </div>

      <div className="px-28 mb-3">
        <div className="mb-[15px] text-center">
          {/* 평균 별점 */}
          <div className="text-32-b">{averageRating.toFixed(1)}</div>

          {/* 만족도 라벨 */}
          <div className="text-16-b">{ratingLabel}</div>
        </div>

        {/* 별 아이콘 + 후기 수 */}
        <div className="flex justify-center items-center gap-[2px] ">
          <Image src={yellowStar} alt="별 아이콘" className="w-[16px] h-[16px] mr-[3.2px]" />
          <span className="text-14-m text-gray-400">{formattedTotal}개 후기</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {reviews.map((review, index) => (
          <div key={index} className="bg-white shadow-md rounded-[24px] p-2">
            {/* 이름과 날짜 */}
            <div>
              <span className="font-16-b text-gray-950 mr-1">{review.name}</span>
              <span className="font-14-m text-gray-400">{review.date}</span>
            </div>

            {/* 별점 */}
            <div className="flex mt-[4px] mb-[12px]">
              {Array.from({ length: 5 }, (_, i) => (
                <Image
                  key={i}
                  src={i < review.rating ? yellowStar : grayStar}
                  alt={i < review.rating ? "yellow star" : "gray star"}
                  className="w-[16px] h-[16px]"
                />
              ))}
            </div>

            {/* 리뷰 내용 */}
            <p className="font-16-body-m text-gray-950 whitespace-pre-wrap">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}