import { useEffect, useState } from "react";

import { MyReservationType } from "@/types/reservation";

export const useReservationFilter = (reservations: MyReservationType[]) => {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [filteredReservations, setFilteredReservations] = useState<
    MyReservationType[]
  >([]);

  useEffect(() => {
    if (!selectedStatus) {
      setFilteredReservations(reservations);
    } else {
      setFilteredReservations(
        reservations.filter((r) => r.status === selectedStatus),
      );
    }
  }, [selectedStatus, reservations]);

  return { selectedStatus, setSelectedStatus, filteredReservations };
};
