import React from "react";

type ReviewItemProps = {
  name: string;
  date: string; // "yyyy.mm.dd"
  rating: number; // 0~5
  content: string;
};

const yellowStar = "/src/assets/icons/star/icon_star_active.svg";
const grayStar = "/src/assets/icons/star/icon_star_inactive.svg";

const ReviewItem: React.FC<ReviewItemProps> = ({ name, date, rating, content }) => {
  return (
    <div className="bg-white shadow-md rounded-[24px] p-2 w-67">
      {/* 이름과 날짜 */}
      <div>
        <span className="font-16-b text-gray-950 mr-1">{name}</span>
        <span className="font-14-m text-gray-400">{date}</span>
      </div>

      {/* 별점 */}
      <div className="flex mt-[4px] mb-[12px]">
        {Array.from({ length: 5 }, (_, i) => (
          <img
            key={i}
            src={i < rating ? yellowStar : grayStar}
            alt={i < rating ? "yellow star" : "gray star"}
            className="w-[16px] h-[16px]"
          />
        ))}
      </div>

      {/* 리뷰 내용 */}
      <p className="font-16-body-m text-gray-950 whitespace-pre-wrap">{content}</p>
    </div>
  );
};

export default ReviewItem;