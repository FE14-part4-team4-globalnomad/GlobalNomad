import { useEffect, useState } from "react";

import reservationService from "@/apis/reservation/reservation.service";
import { MyReservationType } from "@/types/reservation";

export const useReservationData = () => {
  const [reservations, setReservations] = useState<MyReservationType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const { data } = await reservationService.getMyReservations();
        setReservations(data.reservations);
      } catch (error) {
        console.error("예약 데이터를 불러오는 데 실패했습니다.", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReservations();
  }, []);

  return { reservations, setReservations, isLoading };
};
