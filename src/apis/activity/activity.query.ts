import {
  queryOptions,
  useQuery,
  useMutation,
} from "@tanstack/react-query";

import {
  GetActivityAvailableSchedulePayloadType,
  GetActivityReviewListPayloadType,
  PostActivityReservationPayloadType,
} from "./activity.schema";
import activityService from "./activity.service";
import myActivityService from "@/apis/myActivity/myActivity.service";

export const activityQueryKeys = {
  all: () => ["activity"],
  detail: (activityId: number) => [...activityQueryKeys.all(), activityId],
  schedule: (activityId: number, year: number, month: number) => [
    ...activityQueryKeys.detail(activityId),
    "schedule",
    year,
    month,
  ],
  reviewList: (activityId: number, page?: number, size?: number) => [
    ...activityQueryKeys.detail(activityId),
    "reviews",
    page,
    size,
  ],
};

export const activityQueries = {
  detail: (activityId: number) =>
    queryOptions({
      queryKey: activityQueryKeys.detail(activityId),
      queryFn: () =>
        activityService.getActivity({ activityId }).then((res) => res.data),
    }),

  availableSchedule: (params: GetActivityAvailableSchedulePayloadType) =>
    queryOptions({
      queryKey: activityQueryKeys.schedule(
        params.activityId,
        Number(params.query.year),
        Number(params.query.month)
      ),
      queryFn: () =>
        activityService.getActivityAvailableSchedule(params).then((res) => res.data),
    }),

  reviewList: (params: GetActivityReviewListPayloadType) =>
    queryOptions({
      queryKey: activityQueryKeys.reviewList(
        params.activityId,
        params.query?.page,
        params.query?.size
      ),
      queryFn: () =>
        activityService.getActivityReviewList(params).then((res) => res.data),
    }),
};

export const useActivityQuery = (activityId: number, enabled = true) =>
  useQuery({
    ...activityQueries.detail(activityId),
    enabled,
  });

export const useActivityAvailableScheduleQuery = (
  params: GetActivityAvailableSchedulePayloadType,
  enabled = true
) =>
  useQuery({
    ...activityQueries.availableSchedule(params),
    enabled,
  });

export const useActivityReviewListQuery = (
  params: GetActivityReviewListPayloadType,
  enabled = true
) =>
  useQuery({
    ...activityQueries.reviewList(params),
    enabled,
  });

export const useActivityReservationMutation = () =>
  useMutation({
    mutationFn: (params: PostActivityReservationPayloadType) =>
      activityService.postActivityReservation(params).then((res) => res.data),
  });

export const useMyActivityDeleteMutation = () =>
  useMutation({
    mutationFn: (params: { activityId: number }) =>
      myActivityService.deleteMyActivity(params).then((res) => res.data),
  });