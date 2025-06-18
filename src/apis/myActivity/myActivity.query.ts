import { queryOptions, useQuery } from "@tanstack/react-query";

import { GetMyMonthlyActivityReservationsPayloadType } from "@/apis/myActivity/myActivity.schema";
import myActivityService from "@/apis/myActivity/myActivity.service";

const myActivityQuery = {
  all: () => ["my-activities"],
  myActivityListKey: () => [...myActivityQuery.all()],
  myActivityList: () =>
    queryOptions({
      queryKey: myActivityQuery.myActivityListKey(),
      queryFn: () =>
        myActivityService.getMyActivities().then((res) => res.data),
    }),
  myMonthlyReservationKey: (
    activityId: number,
    query: GetMyMonthlyActivityReservationsPayloadType["query"],
  ) => [...myActivityQuery.all(), activityId, "reservation-dashboard", query],
  myMonthlyReservation: (
    activityId: number,
    query: GetMyMonthlyActivityReservationsPayloadType["query"],
  ) =>
    queryOptions({
      queryKey: myActivityQuery.myMonthlyReservationKey(activityId, query),
      queryFn: () =>
        myActivityService
          .getMyMonthlyActivityReservations({
            activityId,
            query,
          })
          .then((res) => res.data),
    }),
};

// 내 체험 리스트 조회
export const useMyActivities = () =>
  // query?: GetMyActivityListPayloadType,
  // options?: UseQueryOptions<GetMyActivityListResultType>,
  {
    return useQuery(myActivityQuery.myActivityList());
  };

// 월별 예약 현황 조회
export const useMyMonthlyReservations = ({
  activityId,
  year,
  month,
}: {
  activityId: number;
  year: string;
  month: string;
}) => {
  return useQuery({
    ...myActivityQuery.myMonthlyReservation(activityId, { year, month }),
  });
};
