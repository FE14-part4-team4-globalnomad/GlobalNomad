import {
  queryOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import {
  GetMyActivityReservedSchedulePayloadType,
  GetMyHourlyActivityReservationsPayloadType,
  GetMyMonthlyActivityReservationsPayloadType,
  PatchMyActivityPayloadType,
} from "@/apis/myActivity/myActivity.schema";
import myActivityService from "@/apis/myActivity/myActivity.service";
import { MyActivityReservationStatusType } from "@/types/myActivity";

type PatchParams = {
  activityId: number;
  payload: PatchMyActivityPayloadType["payload"];
};

export const usePatchMyActivityMutation = () => {
  return useMutation<AxiosResponse<{ success: boolean }>, unknown, PatchParams>(
    {
      mutationFn: ({ activityId, payload }) =>
        myActivityService.patchMyActivity({ activityId, payload }),
      onError: () => {
        alert("수정에 실패했습니다.");
      },
    },
  );
};

const myActivityQuery = {
  all: () => ["my-activities"],
  // 내 체험 리스트 조회
  myActivityListKey: () => [...myActivityQuery.all()],
  myActivityList: () =>
    queryOptions({
      queryKey: myActivityQuery.myActivityListKey(),
      queryFn: () =>
        myActivityService.getMyActivities().then((res) => res.data),
    }),
  // 월별 예약 현황 조회
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
          .getMyMonthlyActivityReservations({ activityId, query })
          .then((res) => res.data),
    }),
  // 날짜별 예약된 스케줄 조회
  myReservedScheduleKey: (
    activityId: number,
    query: GetMyActivityReservedSchedulePayloadType["query"],
  ) => [...myActivityQuery.all(), activityId, "reserved-schedule", query],
  myReservedSchedule: (
    activityId: number,
    query: GetMyActivityReservedSchedulePayloadType["query"],
  ) =>
    queryOptions({
      queryKey: myActivityQuery.myReservedScheduleKey(activityId, query),
      queryFn: () =>
        myActivityService
          .getMyActivityReservedSchedule({ activityId, query })
          .then((res) => res.data),
    }),
  myHourlyReservationsKey: (
    activityId: number,
    query: GetMyHourlyActivityReservationsPayloadType["query"],
  ) => [...myActivityQuery.all(), activityId, "reservations", query],
  myHourlyReservations: (
    activityId: number,
    query: GetMyHourlyActivityReservationsPayloadType["query"],
  ) =>
    queryOptions({
      queryKey: myActivityQuery.myHourlyReservationsKey(activityId, query),
      queryFn: () =>
        myActivityService
          .getMyHourlyActivityReservations({ activityId, query })
          .then((res) => res.data),
    }),
};

// 내 체험 리스트 조회
export const useMyActivities = () => useQuery(myActivityQuery.myActivityList());

// 월별 예약 현황 조회
export const useMyMonthlyReservations = ({
  activityId,
  year,
  month,
}: {
  activityId: number;
  year: string;
  month: string;
}) =>
  useQuery({
    ...myActivityQuery.myMonthlyReservation(activityId, { year, month }),
  });

// 날짜별 예약된 스케줄 조회
export const useMyReservedSchedule = (
  activityId: number,
  query: GetMyActivityReservedSchedulePayloadType["query"],
) =>
  useQuery({
    ...myActivityQuery.myReservedSchedule(activityId, query),
  });

// 시간대별 예약 내역 조회
export const useMyHourlyReservations = (
  activityId: number,
  query: GetMyHourlyActivityReservationsPayloadType["query"],
) =>
  useInfiniteQuery({
    queryKey: myActivityQuery.myHourlyReservationsKey(activityId, query),
    queryFn: () =>
      myActivityService
        .getMyHourlyActivityReservations({ activityId, query })
        .then((res) => res.data),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return "cursorId" in lastPage ? lastPage.cursorId : undefined;
    },
  });

// 체험 예약 상태 변경 (승인/거절)
export const usePatchActivityReservation = (activityId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      reservationId,
      status,
    }: {
      reservationId: number;
      status: MyActivityReservationStatusType;
    }) =>
      myActivityService.patchMyActivityReservation({
        activityId,
        reservationId,
        payload: { status },
      }),

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: myActivityQuery.all() });
    },
  });
};

// // 체험 수정
// export const usePatchMyActivity = (
//   options?: UseMutationOptions<
//     unknown,
//     unknown,
//     {
//       activityId: number;
//       payload: PatchMyActivityPayloadType["payload"];
//     }
//   >,
// ) => {
//   return useMutation({
//     mutationFn: ({ activityId, payload }) =>
//       myActivityService.patchMyActivity({ activityId, payload }),
//     ...options,
//   });
// };

// // 체험 삭제
// export const useDeleteMyActivity = (
//   options?: UseMutationOptions<unknown, unknown, { activityId: number }>,
// ) => {
//   return useMutation({
//     mutationFn: ({ activityId }) =>
//       myActivityService.deleteMyActivity({ activityId }),
//     ...options,
//   });
// };
