import { useQuery, useMutation, queryOptions } from "@tanstack/react-query";

import {
  GetActivityAvailableSchedulePayloadType,
  GetActivityReviewListPayloadType,
  PostActivityReservationPayloadType,
} from "@/apis/activity/activity.schema";
import activityService from "@/apis/activity/activity.service";
import myActivityService from "@/apis/myActivity/myActivity.service";

const activityQuery = {
  detail: (activityId: number) => ["activity", activityId],
  availableSchedule: (activityId: number, year: string, month: string) => [
    "activityAvailableSchedule",
    activityId,
    year,
    month,
  ],
  reviewList: (activityId: number, page?: number, size?: number) => [
    "activityReviewList",
    activityId,
    page,
    size,
  ],

  options: {
    detail: (activityId: number) =>
      queryOptions({
        queryKey: activityQuery.detail(activityId),
        queryFn: () =>
          activityService.getActivity({ activityId }).then((res) => res.data),
      }),

    availableSchedule: (params: GetActivityAvailableSchedulePayloadType) =>
      queryOptions({
        queryKey: activityQuery.availableSchedule(
          params.activityId,
          params.query.year,
          params.query.month
        ),
        queryFn: () =>
          activityService
            .getActivityAvailableSchedule(params)
            .then((res) => res.data),
      }),

    reviewList: (params: GetActivityReviewListPayloadType) =>
      queryOptions({
        queryKey: activityQuery.reviewList(
          params.activityId,
          params.query?.page,
          params.query?.size
        ),
        queryFn: () =>
          activityService
            .getActivityReviewList(params)
            .then((res) => res.data),
      }),
  },
};

// 체험 상세 조회
export const useActivityQuery = (activityId: number, enabled = true) =>
  useQuery({ ...activityQuery.options.detail(activityId), enabled });

// 체험 예약 가능 일정 조회
export const useActivityAvailableScheduleQuery = (
  params: GetActivityAvailableSchedulePayloadType,
  enabled = true
) => useQuery({ ...activityQuery.options.availableSchedule(params), enabled });

// 체험 리뷰 리스트 조회
export const useActivityReviewListQuery = (
  params: GetActivityReviewListPayloadType,
  enabled = true
) => useQuery({ ...activityQuery.options.reviewList(params), enabled });

// 체험 예약 신청
export const useActivityReservationMutation = () =>
  useMutation({
    mutationFn: (params: PostActivityReservationPayloadType) =>
      activityService.postActivityReservation(params).then((res) => res.data),
  });

// 내 체험 삭제
export const useMyActivityDeleteMutation = () =>
  useMutation({
    mutationFn: (params: { activityId: number }) =>
      myActivityService.deleteMyActivity(params).then((res) => res.data),
  });

// 필요 시 export
export { activityQuery };