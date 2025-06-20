import {
  useMyHourlyReservations,
  usePatchActivityReservation,
} from "@/apis/myActivity/myActivity.query";
import Button from "@/components/button/Button";
import { MyActivityReservationStatusType } from "@/types/myActivity";

interface ReservationListProps {
  activityId: number;
  scheduleId: number;
  status: "pending" | MyActivityReservationStatusType;
}
export default function ReservationList({
  activityId,
  scheduleId,
  status,
}: ReservationListProps) {
  const { data: reservedResult } = useMyHourlyReservations(activityId, {
    scheduleId,
    status,
  });

  const updateReservationMutaion = usePatchActivityReservation(activityId);

  function handleConfirm(reservationId: number) {
    updateReservationMutaion.mutate({ reservationId, status: "confirmed" });
  }
  function handleDecline(reservationId: number) {
    updateReservationMutaion.mutate({ reservationId, status: "declined" });
  }

  return (
    <div className="grid justify-stretch gap-[12px]">
      <label className="text-18-b">예약 내역</label>
      {reservedResult?.pages[0]?.totalCount === 0 ? (
        <div className="text-center text-14-m text-gray-600 pt-2 pb-4">
          예약 내역이 없습니다
        </div>
      ) : (
        reservedResult?.pages?.map((page) =>
          page.reservations.map((reservation) => (
            <div
              key={reservation.id}
              className="flex justify-between items-center px-[16px] py-[18px] rounded-[16px] border-1 border-gray-100"
            >
              <div className="grid gap-[10px]">
                <div className="flex gap-[8px]">
                  <label className="w-[42px] text-16-b text-gray-500">
                    닉네임
                  </label>
                  {reservation.nickname}
                </div>
                <div className="flex gap-[8px]">
                  <label className="w-[42px] text-16-b text-gray-500">
                    인원
                  </label>
                  {reservation.headCount}명
                </div>
              </div>
              <div className="grid gap-[8px]">
                {status === "pending" && (
                  <>
                    <Button
                      size="modal"
                      variant="outline"
                      className="tablet:text-14-m min-w-0 w-[68px] tablet:w-[68px] h-[30x] tablet:h-[30px] rounded-[8px]"
                      onClick={() => handleConfirm(reservation.id)}
                    >
                      승인하기
                    </Button>
                    <Button
                      size="modal"
                      variant="secondary"
                      className="tablet:text-14-m min-w-0 w-[68px] tablet:w-[68px] h-[30x] tablet:h-[30px] rounded-[8px]"
                      onClick={() => handleDecline(reservation.id)}
                    >
                      거절하기
                    </Button>
                  </>
                )}
                {status === "confirmed" && (
                  <span className="rounded-[100px] py-[4px] px-[8px] text-13-b bg-[#DDF9F9] text-[#1790A0]">
                    예약 승인
                  </span>
                )}
                {status === "declined" && (
                  <span className="rounded-[100px] py-[4px] px-[8px] text-13-b bg-[#FCECEA] text-[#F96767]">
                    예약 거절
                  </span>
                )}
              </div>
            </div>
          )),
        )
      )}
    </div>
  );
}
