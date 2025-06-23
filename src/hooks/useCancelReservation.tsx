import reservationService from "@/apis/reservation/reservation.service";
import WarningModal from "@/components/modal/WarningModal";
import { useOverlay } from "@/hooks/useOverlay";
import { MyReservationType } from "@/types/reservation";

export const useCancelReservation = (
  setReservations: React.Dispatch<React.SetStateAction<MyReservationType[]>>,
) => {
  const overlay = useOverlay();

  const handleCancelReservation = (reservationId: number) => {
    overlay.overlay(
      <WarningModal
        message="예약을 취소하시겠어요?"
        confirmText="취소하기"
        onConfirm={async () => {
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
          } finally {
            overlay.close();
          }
        }}
      />,
    );
  };

  return handleCancelReservation;
};
