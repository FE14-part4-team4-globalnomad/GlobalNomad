import React from "react";

interface ReviewListProps {
  totalReviews: number; // 예: 1300
  averageRating: number; // 예: 4.5
}

const getSatisfactionLabel = (rating: number) => {
  if (rating >= 4.5) return "매우 만족";
  if (rating >= 3.5) return "만족";
  if (rating >= 2.5) return "보통";
  if (rating >= 1.5) return "싫음";
  return "매우 싫음";
};

export default function ReviewList({ totalReviews, averageRating }: ReviewListProps) {
  const formattedTotal = totalReviews.toLocaleString();
  const ratingLabel = getSatisfactionLabel(averageRating);

  return (
    <div className="pt-4 pb-3 text-gray-950">
      {/* 제목 및 총 후기 수 */}
        <div className="text-18-b mb-1">
            체험후기 <span className="text-gray-400 ml-1">{formattedTotal}개</span>
        </div>

        <div className="text-center">
            {/* 평균 별점 */}
            <div className="text-32-b mb-[15px]">{averageRating.toFixed(1)}</div>

            {/* 만족도 라벨 */}
            <div className="text-16-b mb-[15px]">{ratingLabel}</div>

            {/* 별 아이콘 + 후기 수 */}
            <div className="flex justify-center items-center gap-[2px] ">
                <img src="/src/assets/icons/star/icon_star_active.svg" alt="별 아이콘" className="w-[16px] h-[16px]" />
                <span className="text-16-m text-gray-400">{formattedTotal}개 후기</span>
            </div>
        </div>

    </div>
  );
}