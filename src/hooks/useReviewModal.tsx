import reservationService from "@/apis/reservation/reservation.service";
import ReviewModal from "@/app/(DefaultLayout)/(ProfileLayout)/reservation/components/ReviewModal";
import { useOverlay } from "@/hooks/useOverlay";
import { MyReservationType } from "@/types/reservation";

export const useReviewModal = (
  setReservations: React.Dispatch<React.SetStateAction<MyReservationType[]>>,
) => {
  const overlay = useOverlay();

  const handleOpenReviewModal = (reservation: MyReservationType) => {
    overlay.overlay(
      <ReviewModal
        title={reservation.activity.title}
        schedule={`${reservation.date} · ${reservation.startTime} - ${reservation.endTime} (${reservation.headCount}명)`}
        onSubmit={async (rating, content) => {
          try {
            await reservationService.postMyReservationReview({
              reservationId: reservation.id,
              payload: {
                rating,
                content,
              },
            });
            setReservations((prev) =>
              prev.map((r) =>
                r.id === reservation.id ? { ...r, reviewSubmitted: true } : r,
              ),
            );
          } catch (error) {
            console.error("리뷰 작성 실패:", error);
          } finally {
            overlay.close();
          }
        }}
      />,
    );
  };

  return handleOpenReviewModal;
};
