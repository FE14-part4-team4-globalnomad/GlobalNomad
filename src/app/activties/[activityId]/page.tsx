'use client';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { format, parseISO } from "date-fns";

import { useAuthStore } from "@/store/authStore";

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

import {
  useActivityQuery,
  useActivityAvailableScheduleQuery,
  useActivityReviewListQuery,
} from "@/apis/activity/activity.query";

export default function ActivityDetailPage() {
  const params = useParams();
  const activityId = Number(params?.activityId);

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0부터 시작 (0=1월)

  const [currentPage, setCurrentPage] = useState(1);
  const [isTablet, setIsTablet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [reservationStep, setReservationStep] = useState<"date" | "guest">("date");

  const { user } = useAuthStore();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsTablet(width >= 769 && width < 1280);
      setIsMobile(width < 769);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const {
    data: activity,
    isLoading: isActivityLoading,
  } = useActivityQuery(activityId, !!activityId);
  
  const {
    data: availableSchedule,
    isLoading: isScheduleLoading,
  } = useActivityAvailableScheduleQuery(
    {
      activityId,
      query: {
        year: String(currentYear),
        month: String(currentMonth + 1).padStart(2, "0"),
      },
    },
    !!activityId
  );

  const {
    data: reviewData,
    isLoading: isReviewLoading,
  } = useActivityReviewListQuery(
    {
      activityId,
      query: { page: currentPage, size: 10 },
    },
    !!activityId
  );

  const bannerImageUrl = activity?.bannerImageUrl ?? "";
  const subImageUrls = activity?.subImages?.slice(0, 4).map(img => img.imageUrl) ?? [];

  const content = activity?.description ?? "";
  const pricePerPerson = activity?.price ?? 0;
  const address = activity?.address ?? "";
  const averageRating = reviewData?.averageRating ?? 0;
  const totalReviews = reviewData?.totalCount ?? 0;

  // ✅ ReviewType[] → ReviewItemData[]
  const reviews = (reviewData?.reviews ?? []).map((review) => ({
    name: review.user.nickname,
    date: new Date(review.createdAt).toLocaleDateString("ko-KR"),
    rating: review.rating,
    content: review.content,
  }));

  // ✅ 예약 가능 날짜 포맷 보정
  const availableDates: Record<string, string[]> = availableSchedule?.reduce((acc, cur) => {
    const formattedDate = format(parseISO(cur.date), 'yyyy-MM-dd');
    acc[formattedDate] = cur.times.map((t) => t.startTime);
    return acc;
  }, {} as Record<string, string[]>) ?? {};

  return (
    <div>
      <Gnb />
      <div className="desktop:pt-9 pb-18 tablet:pt-6 tablet:pb-12 mobile:pt-4 mobile:pb-10">
        {isTablet || isMobile ? (
          <div className="flex flex-col items-center">
            <ImageGallery
              bannerImageUrl={activity?.bannerImageUrl ?? ""}
              subImageUrls={activity?.subImages.map((img: { imageUrl: string }) => img.imageUrl) ?? []}
            />
            {activity && (
              <ActivityInfo
                category={activity.category}
                title={activity.title}
                rating={{ average: averageRating, count: totalReviews }}
                location={address}
                description={activity.description}
                isMine={user?.id === activity.userId}
              />
            )}
            <Description content={content} />
            <KakaoMap address={address} />
            <ReviewList
              totalReviews={totalReviews}
              averageRating={averageRating}
              reviews={reviews}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(totalReviews / 10)}
              onPageChange={(page) => {
                if (page < 1 || page > Math.ceil(totalReviews / 10)) return;
                setCurrentPage(page);
              }}
            />
          </div>
        ) : (
          <div className="flex justify-center gap-4">
            {/* 왼쪽 콘텐츠 */}
            <div>
              <ImageGallery
                bannerImageUrl={activity?.bannerImageUrl ?? ""}
                subImageUrls={activity?.subImages.map((img: { imageUrl: string }) => img.imageUrl) ?? []}
              />
              <Description content={content} />
              <KakaoMap address={address} />
              <ReviewList
                totalReviews={totalReviews}
                averageRating={averageRating}
                reviews={reviews}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(totalReviews / 10)}
                onPageChange={(page) => {
                  if (page < 1 || page > Math.ceil(totalReviews / 10)) return;
                  setCurrentPage(page);
                }}
              />
            </div>

            {/* 오른쪽 콘텐츠 */}
            <div>
              {activity && (
                <ActivityInfo
                  category={activity.category}
                  title={activity.title}
                  rating={{ average: averageRating, count: totalReviews }}
                  location={address}
                  description={activity.description}
                  isMine={user?.id === activity.userId}
                  activityId={activity.id}
                />
              )}
              <Reservation 
                pricePerPerson={pricePerPerson} 
                activityId={activityId}
                isMine={user?.id !== activity?.userId}
              />
            </div>
          </div>
        )}
      </div>

      {(isTablet || isMobile) && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <ReservationBtn
            pricePerPerson={pricePerPerson}
            isReady={Object.keys(availableDates).length > 0}
            onReserve={() => setIsReservationOpen(true)}
            onDateClick={() => setIsPanelOpen(true)}
            isMine={user?.id !== activity?.userId}
          />
        </div>
      )}

      <SlidePanel
        isOpen={isPanelOpen}
        onClose={() => {
          setIsPanelOpen(false);
          setReservationStep("date");
        }}
      >
        {isMobile ? (
          reservationStep === "date" ? (
            <ReservationMobile
              pricePerPerson={pricePerPerson}
              activityId={activityId}
              onNext={() => setReservationStep("guest")}
            />
          ) : (
            <ReservationMobileCnt
              pricePerPerson={pricePerPerson}
              activityId={activityId}
              onBack={() => setReservationStep("date")}
            />
          )
        ) : (
          <ReservationTablet
            pricePerPerson={activity?.price ?? 0}
            activityId={activityId}
          />
        )}
      </SlidePanel>

      <Footer />
    </div>
  );
}