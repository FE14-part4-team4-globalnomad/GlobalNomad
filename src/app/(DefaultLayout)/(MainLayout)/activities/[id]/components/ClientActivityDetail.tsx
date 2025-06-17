'use client';

import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

import ActivityInfo from './ActivityInfo';
import ActivitySkeleton from './ActivitySkeleton';
import Description from './Description';
import ImageGallery from './ImageGallery';
import KakaoMap from './KakaoMap';
import Reservation from './reservation/Reservation';
import ReservationBtn from './reservation/ReservationBtn';
import ReservationMobile from './reservation/ReservationMobile';
import ReservationMobileCnt from './reservation/ReservationMobileCnt';
import ReservationTablet from './reservation/ReservationTablet';
import SlidePanel from './reservation/SlidePanel';
import ReviewList from './ReviewList';
import {
  useActivityAvailableScheduleQuery,
  useActivityQuery,
  useActivityReviewListQuery,
} from '@/apis/activity/activity.query';
import Pagination from '@/components/pagination/Pagination';
import { useAuthStore } from '@/store/authStore';

interface Props {
    activityId: number;
}

export default function ClientActivityDetail({ activityId }: Props) {
    const [currentPage, setCurrentPage] = useState(1);

    const today = new Date();
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());

    const [isTablet, setIsTablet] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isReservationOpen, setIsReservationOpen] = useState(false);

    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [reservationStep, setReservationStep] = useState<'date' | 'guest'>('date');

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [guestCount, setGuestCount] = useState<number>(1);

    const { user } = useAuthStore();

    const {
        data: activity,
        isLoading: isActivityLoading,
        isError: isActivityError,
    } = useActivityQuery(activityId, !!activityId);

    const {
        data: availableSchedule,
        isLoading: isScheduleLoading,
        refetch: refetchSchedule,
    } = useActivityAvailableScheduleQuery(
        {
        activityId,
        query: {
            year: String(currentYear),
            month: String(currentMonth + 1).padStart(2, '0'),
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

    useEffect(() => {
        if (!isActivityLoading && (isActivityError || !activity)) { notFound(); }
    }, [isActivityLoading, isActivityError, activity]);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsTablet(width >= 769 && width < 1280);
            setIsMobile(width < 769);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (selectedDate) {
            setCurrentYear(selectedDate.getFullYear());
            setCurrentMonth(selectedDate.getMonth());
            refetchSchedule();
        }
    }, [selectedDate, refetchSchedule]);

    if (isActivityLoading || isReviewLoading || isScheduleLoading) {
        return ( <ActivitySkeleton /> );
    }

    if (!activity) return null;

    const bannerImageUrl = activity.bannerImageUrl ?? '';
    const subImageUrls = activity.subImages?.slice(0, 4).map(img => img.imageUrl) ?? [];

    const content = activity.description ?? '';
    const pricePerPerson = activity.price ?? 0;
    const address = activity.address ?? '';
    const averageRating = reviewData?.averageRating ?? 0;
    const totalReviews = reviewData?.totalCount ?? 0;

    const reviews = (reviewData?.reviews ?? []).map(review => ({
        name: review.user.nickname,
        date: new Date(review.createdAt).toLocaleDateString('ko-KR'),
        rating: review.rating,
        content: review.content,
    }));

    return (
        <div>
            <div className="desktop:pt-9 pb-18 tablet:pt-6 tablet:pb-12 mobile:pt-4 mobile:pb-10">
                {isTablet || isMobile ? (
                    <div className="flex flex-col items-center">
                        <ImageGallery bannerImageUrl={bannerImageUrl} subImageUrls={subImageUrls} />
                        <ActivityInfo
                            category={activity.category}
                            title={activity.title}
                            rating={{ average: averageRating, count: totalReviews }}
                            location={address}
                            description={activity.description}
                            isMine={user?.id === activity.userId}
                        />
                        <Description content={content} />
                        <KakaoMap address={address} />
                        <ReviewList totalReviews={totalReviews} averageRating={averageRating} reviews={reviews} />
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
                        <div>
                            <ImageGallery bannerImageUrl={bannerImageUrl} subImageUrls={subImageUrls} />
                            <Description content={content} />
                            <KakaoMap address={address} />
                            <ReviewList totalReviews={totalReviews} averageRating={averageRating} reviews={reviews} />
                            <Pagination
                                currentPage={currentPage}
                                totalPages={Math.ceil(totalReviews / 10)}
                                onPageChange={(page) => {
                                    if (page < 1 || page > Math.ceil(totalReviews / 10)) return;
                                    setCurrentPage(page);
                                }}
                            />
                        </div>
                        <div>
                            <ActivityInfo
                                category={activity.category}
                                title={activity.title}
                                rating={{ average: averageRating, count: totalReviews }}
                                location={address}
                                description={activity.description}
                                isMine={user?.id === activity.userId}
                                activityId={activity.id}
                            />
                            <Reservation
                                pricePerPerson={pricePerPerson}
                                activityId={activityId}
                                isMine={user?.id !== activity.userId}
                            />
                        </div>
                    </div>
                )}
            </div>

            {(isTablet || isMobile) && (
                <div className="fixed bottom-0 left-0 right-0 z-50">
                    <ReservationBtn
                        pricePerPerson={pricePerPerson}
                        isReady={selectedDate !== null && selectedTime !== null}
                        onReserve={() => setIsReservationOpen(true)}
                        onDateClick={() => setIsPanelOpen(true)}
                        isMine={user?.id !== activity.userId}
                        activityId={activityId}
                        selectedDate={selectedDate}
                        selectedTime={selectedTime}
                        guestCount={guestCount}
                        availableSchedule={availableSchedule ?? []}
                    />
                </div>
            )}

            <SlidePanel
                isOpen={isPanelOpen}
                onClose={() => {
                    setIsPanelOpen(false);
                    setReservationStep('date');
                }}
            >
                {isMobile ? (
                reservationStep === 'date' ? (
                    <ReservationMobile
                        pricePerPerson={pricePerPerson}
                        activityId={activityId}
                        onNext={(date, time) => {
                            setSelectedDate(date);
                            setSelectedTime(time);
                            setReservationStep('guest');
                        }}
                    />
                ) : (
                    <ReservationMobileCnt
                        pricePerPerson={pricePerPerson}
                        activityId={activityId}
                        onBack={() => setReservationStep('date')}
                        onConfirm={(guestCount) => {
                            setGuestCount(guestCount);
                            setIsPanelOpen(false);
                        }}
                    />
                )
                ) : (
                    <ReservationTablet
                        pricePerPerson={pricePerPerson}
                        activityId={activityId}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        selectedTime={selectedTime}
                        setSelectedTime={setSelectedTime}
                        guestCount={guestCount}
                        setGuestCount={setGuestCount}
                        onConfirm={() => setIsPanelOpen(false)}
                    />
                )}
            </SlidePanel>
        </div>
    );
}