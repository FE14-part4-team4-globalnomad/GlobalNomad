"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import ReviewModal from "./components/ReviewModal";
import StatusBadgeGroup from "./components/StatusBadgeGroup";
import reservationService from "@/apis/reservation/reservation.service";
import Button from "@/components/button/Button";
import MyReservationCard from "@/components/card/MyReservationCard";
import { Icon } from "@/components/icon/Icon";
import WarningModal from "@/components/modal/WarningModal";
import { useOverlay } from "@/hooks/useOverlay";
import { MyReservationType } from "@/types/reservation";

function ReservationPage() {
  const [reservations, setReservations] = useState<MyReservationType[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<
    MyReservationType[]
  >([]);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const overlay = useOverlay();

  const handleCancelReservationApi = async (reservationId: number) => {
    try {
      await reservationService.patchMyReservations({
        reservationId,
        payload: { status: "canceled" },
      });
      setReservations((prev) =>
        prev.map((r) =>
          r.id === reservationId ? { ...r, status: "canceled" } : r,
        ),
      );
    } catch (error) {
      console.error("예약 취소 실패:", error);
    }
  };

  const handleCancelReservation = (reservationId: number) => {
    overlay.overlay(
      <WarningModal
        message="예약을 취소하시겠어요?"
        confirmText="취소하기"
        onConfirm={() => {
          handleCancelReservationApi(reservationId);
          overlay.close();
        }}
      />,
    );
  };

  const handleSubmitReview = async (
    reservationId: number,
    rating: number,
    content: string,
  ) => {
    try {
      await reservationService.postMyReservationReview({
        reservationId,
        payload: {
          rating,
          content,
        },
      });
      overlay.close();
      setReservations((prev) =>
        prev.map((r) =>
          r.id === reservationId ? { ...r, reviewSubmitted: true } : r,
        ),
      );
    } catch (error) {
      console.error("리뷰 작성 실패:", error);
    }
  };

  const handleOpenReviewModal = (reservation: MyReservationType) => {
    overlay.overlay(
      <ReviewModal
        title={reservation.activity.title}
        schedule={`${reservation.date} · ${reservation.startTime} - ${reservation.endTime} (${reservation.headCount}명)`}
        onSubmit={(rating, content) =>
          handleSubmitReview(reservation.id, rating, content)
        }
      />,
    );
  };

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const { data } = await reservationService.getMyReservations();
        console.log("API 응답 데이터:", data);
        setReservations(data.reservations);
        setFilteredReservations(data.reservations);
        setIsLoading(false);
      } catch (error) {
        console.error("예약 목록을 불러오는 데 실패했습니다", error);
        setIsLoading(false);
      }
    };

    fetchReservations();
  }, []);

  useEffect(() => {
    if (!selectedStatus) {
      setFilteredReservations(reservations);
    } else {
      setFilteredReservations(
        reservations.filter((r) => r.status === selectedStatus),
      );
    }
  }, [selectedStatus, reservations]);

  return (
    <section>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <h2 className="text-18-b text-gray-950">예약내역</h2>
          <p className="text-14-m text-gray-500">
            예약내역 변경 및 취소할 수 있습니다.
          </p>
        </div>
        {reservations.length > 0 && (
          <div className="w-full overflow-x-auto scrollbar-hide -mx-4 px-4">
            <StatusBadgeGroup
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
            />
          </div>
        )}
      </div>

      <div>
        {isLoading ? (
          <div className="flex justify-center items-center h-[20rem]">
            <p className="text-14-m text-gray-500">불러오는 중...</p>
          </div>
        ) : filteredReservations.length > 0 ? (
          <div className="flex flex-col gap-2 mt-3">
            {filteredReservations.map((reservation) => (
              <MyReservationCard
                key={reservation.id}
                reservationInfo={reservation}
                onCancelReservation={() =>
                  handleCancelReservation(reservation.id)
                }
                onUpdateReview={() => handleOpenReviewModal(reservation)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-5 gap-1">
            <Icon name="Empty" size={182} />
            <p className="text-18-m text-gray-600">아직 예약한 체험이 없어요</p>
            <Button
              size="empty"
              variant="primary"
              rounded
              onClick={() => router.push("/")}
            >
              둘러보기
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ReservationPage;
