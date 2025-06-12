'use client';

import { useState } from "react";

import Gnb from "@/components/gnb/Gnb";
import Footer from "@/components/footer/Footer";
import Description from "@/components/activities/activityId/Description";
import KakaoMap from "@/components/activities/activityId/KakaoMap";
import ReviewList from "@/components/activities/activityId/ReviewList";
import Pagination from "@/components/pagination/Pagination";
import ActivityInfo from "@/components/activities/activityId/ActivityInfo";
import Reservation from '@/components/activities/activityId/reservation/Reservation';

export default function ActivityDetailPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const reviewsPerPage = 10;
  const totalReviews = 25;
  const totalPages = Math.ceil(totalReviews / reviewsPerPage);
  const averageRating = 4.3;

  const allReviews = [
    { name: "홍길동", date: "2025.06.12", rating: 5, content: "정말 좋았어요! 다음에 또 올게요." },
    { name: "김철수", date: "2025.06.10", rating: 4, content: "만족스러웠습니다." },
    // ...총 25개 리뷰 가정
  ];

  const reviews = allReviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  const images = [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=400&q=80',
  ];

  const content = '이 체험은 자연 풍경을 감상하는 힐링 코스입니다. 편안하게 즐겨보세요!';

  // 예시로 pricePerPerson와 availableDates를 넘겨줌
  const pricePerPerson = 50000;
  const availableDates = {
    "2025-06-12": ["10:00", "14:00", "16:00"],
    "2025-06-13": ["09:00", "13:00"],
    // ...
  };

  return (
    <div>
        <Gnb />
        <div className="pt-9 pb-18">
            <div className="flex justify-center gap-4">
                {/* 왼쪽 콘텐츠 */}
                <div className="">
                    <Description images={images} content={content} />
                    <KakaoMap address="서울특별시 종로구 세종대로 175" />
                    <ReviewList
                    totalReviews={totalReviews}
                    averageRating={averageRating}
                    reviews={reviews}
                    />
                    <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => {
                        if (page < 1 || page > totalPages) return;
                        setCurrentPage(page);
                    }}
                    />
                </div>

                {/* 오른쪽 컨텐츠 */}
                <div className="">
                    <ActivityInfo
                    category="자연 체험"
                    title="북한산 힐링 산책"
                    rating={{ average: averageRating, count: totalReviews }}
                    location="서울특별시 종로구 세종대로 175"
                    description="북한산의 맑은 공기를 마시며 힐링 산책을 즐겨보세요. 난이도는 낮고 경치가 아름다워요."
                    />

                    <Reservation pricePerPerson={pricePerPerson} availableDates={availableDates} />
                </div>
            </div>
        </div>
        <Footer />
    </div>
  );
}