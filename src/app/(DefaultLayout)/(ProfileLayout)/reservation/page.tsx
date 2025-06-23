"use client";

import { useRouter } from "next/navigation";

import EmptyState from "./components/EmptyState";
import LoadingState from "./components/LoadingState";
import StatusBadgeGroup from "./components/StatusBadgeGroup";
import MyReservationCard from "@/components/card/MyReservationCard";
import { useCancelReservation } from "@/hooks/useCancelReservation";
import { useReservationData } from "@/hooks/useReservationData.ts";
import { useReservationFilter } from "@/hooks/useReservationFilter";
import { useReviewModal } from "@/hooks/useReviewModal";

function ReservationPage() {
  const { reservations, setReservations, isLoading } = useReservationData();
  const handleCancelReservation = useCancelReservation(setReservations);
  const handleOpenReviewModal = useReviewModal(setReservations);
  const { selectedStatus, setSelectedStatus, filteredReservations } =
    useReservationFilter(reservations);
  const router = useRouter();

  return (
    <section>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <h2 className="text-18-b text-gray-950">예약내역</h2>
          <p className="text-14-m text-gray-500">
            예약내역 변경 및 취소할 수 있습니다.
          </p>
        </div>
      </div>

      {reservations.length > 0 && (
        <div className="mt-[2.5rem] w-full overflow-x-auto scrollbar-hide -mx-4 px-4">
          <StatusBadgeGroup
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
          />
        </div>
      )}

      <div>
        {isLoading ? (
          <LoadingState />
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
          <EmptyState onClick={() => router.push("/")} />
        )}
      </div>
    </section>
  );
}

export default ReservationPage;
