'use client';

import { useState, useEffect } from "react";

import Gnb from "@/components/gnb/Gnb";
import Footer from "@/components/footer/Footer";
import ImageGallery from "@/app/activties/[activityId]/components/ImageGallery";
import Description from "@/app/activties/[activityId]/components/Description";
import KakaoMap from "@/app/activties/[activityId]/components/KakaoMap";
import ReviewList from "@/app/activties/[activityId]/components/ReviewList";
import Pagination from "@/components/pagination/Pagination";
import ActivityInfo from "@/app/activties/[activityId]/components/ActivityInfo";

import Reservation from "@/app/activties/[activityId]/components/reservation/Reservation";
import ReservationTablet from "@/app/activties/[activityId]/components/reservation/ReservationTablet";
import ReservationMobile from "@/app/activties/[activityId]/components/reservation/ReservationMobile";
import ReservationMobileCnt from "@/app/activties/[activityId]/components/reservation/ReservationMobileCnt";
import ReservationBtn from "@/app/activties/[activityId]/components/reservation/ReservationBtn";
import SlidePanel from "@/app/activties/[activityId]/components/reservation/SlidePanel";

export default function ActivityDetailPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isTablet, setIsTablet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [reservationStep, setReservationStep] = useState<"date" | "guest">("date");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsTablet(width >= 769 && width < 1280);
      setIsMobile(width < 769);
    };

    handleResize(); // 초기 체크
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', // 큰 이미지
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80', // 가운데 위
    'https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=400&q=80', // 가운데 아래
    'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=400&q=80', // 오른쪽 위
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80', // 오른쪽 아래
  ];

  const content = '이 체험은 자연 풍경을 감상하는 힐링 코스입니다. 편안하게 즐겨보세요!';
  const pricePerPerson = 50000;
  const availableDates = {
    "2025-06-12": ["10:00", "14:00", "16:00"],
    "2025-06-13": ["09:00", "13:00"],
  };

  return (
    <div>
      <Gnb />
      <div className="desktop:pt-9 pb-18 tablet:pt-6 tablet:pb-12 mobile:pt-4 mobile:pb-10">
        {isTablet || isMobile ? (
          // ✅ 태블릿, 모바일 버전 배치
          <div className="flex flex-col items-center">
            <ImageGallery images={images} />
            <ActivityInfo
              category="자연 체험"
              title="북한산 힐링 산책"
              rating={{ average: averageRating, count: totalReviews }}
              location="서울특별시 종로구 세종대로 175"
              description="북한산의 맑은 공기를 마시며 힐링 산책을 즐겨보세요. 난이도는 낮고 경치가 아름다워요."
            />
            <Description content={content} />
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
        ) : (
          // ✅ 기존(PC 또는 모바일) 레이아웃
          <div className="flex justify-center gap-4">
            {/* 왼쪽 콘텐츠 */}
            <div>
              <ImageGallery images={images} />
              <Description content={content} />
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

            {/* 오른쪽 콘텐츠 */}
            <div>
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
        )}
      </div>

      {/* 모바일과 태블릿에서 고정된 버튼 추가 */}
      {(isTablet || isMobile) && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <ReservationBtn
            pricePerPerson={pricePerPerson}
            isReady={true}
            onReserve={() => setIsReservationOpen(true)}
            onDateClick={() => setIsPanelOpen(true)}
          />
        </div>
      )}

      <SlidePanel isOpen={isPanelOpen} onClose={() => {
          setIsPanelOpen(false);
          setReservationStep("date");
        }}>
        {isMobile ? (
          reservationStep === "date" ? (
            <ReservationMobile
              pricePerPerson={pricePerPerson}
              availableDates={availableDates}
              onNext={() => setReservationStep("guest")}
            />
          ) : (
            <ReservationMobileCnt
              pricePerPerson={pricePerPerson}
              availableDates={availableDates}
              onBack={() => setReservationStep("date")}
            />
          )
        ) : (
          <ReservationTablet
            pricePerPerson={pricePerPerson}
            availableDates={availableDates}
          />
        )}
      </SlidePanel>
      
      <Footer />
    </div>
  );
}