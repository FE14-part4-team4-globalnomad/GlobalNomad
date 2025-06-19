import { queryOptions, useQuery, useMutation } from "@tanstack/react-query";

import {
  GetActivityAvailableSchedulePayloadType,
  GetActivityListPayloadType,
  GetActivityReviewListPayloadType,
  PostActivityPayloadType,
  PostActivityReservationPayloadType,
} from "./activity.schema";
import activityService from "./activity.service";
import myActivityService from "@/apis/myActivity/myActivity.service";

export const activityQueryKeys = {
  all: () => ["activity"],

  // 체험 리스트 조회용 query key
  list: (params: GetActivityListPayloadType["query"]) => [
    ...activityQueryKeys.all(),
    "list",
    params,
  ],

  // 체험 상세 조회용 query key
  detail: (activityId: number) => [...activityQueryKeys.all(), activityId],

  // 특정 체험의 예약 가능 스케줄 조회용 query key
  schedule: (activityId: number, year: number, month: number) => [
    ...activityQueryKeys.detail(activityId),
    "schedule",
    year,
    month,
  ],

  // 특정 체험의 리뷰 리스트 조회용 query key
  reviewList: (activityId: number, page?: number, size?: number) => [
    ...activityQueryKeys.detail(activityId),
    "reviews",
    page,
    size,
  ],
};

export const activityQueries = {
  // 체험 리스트 조회 (목록 페이지 등에서 사용)
  list: (params: GetActivityListPayloadType) =>
    queryOptions({
      queryKey: activityQueryKeys.list(params.query),
      queryFn: () =>
        activityService.getActivities(params).then((res) => res.data),
    }),

  // 체험 상세 조회 (상세 페이지에서 사용)
  detail: (activityId: number) =>
    queryOptions({
      queryKey: activityQueryKeys.detail(activityId),
      queryFn: () =>
        activityService.getActivity({ activityId }).then((res) => res.data),
    }),

  // 체험 예약 가능한 스케줄 조회 (예약 달력 렌더링 시 사용)
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

  // 체험 리뷰 리스트 조회 (리뷰 영역에서 사용)
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

// 체험 리스트 조회 훅 (목록 페이지에서 사용)
export const useActivityListQuery = (
  params: GetActivityListPayloadType,
  enabled = true
) =>
  useQuery({
    ...activityQueries.list(params),
    enabled,
  });

// 체험 상세 조회 훅 (상세 페이지에서 사용)
export const useActivityQuery = (activityId: number, enabled = true) =>
  useQuery({
    ...activityQueries.detail(activityId),
    enabled,
  });

// 예약 가능한 스케줄 조회 훅 (예약 달력에서 사용)
export const useActivityAvailableScheduleQuery = (
  params: GetActivityAvailableSchedulePayloadType,
  enabled = true
) =>
  useQuery({
    ...activityQueries.availableSchedule(params),
    enabled,
  });

// 체험 리뷰 리스트 조회 훅 (리뷰 영역에서 사용)
export const useActivityReviewListQuery = (
  params: GetActivityReviewListPayloadType,
  enabled = true
) =>
  useQuery({
    ...activityQueries.reviewList(params),
    enabled,
  });

// 체험 예약 신청 훅 (예약 버튼 클릭 시 사용)
export const useActivityReservationMutation = () =>
  useMutation({
    mutationFn: (params: PostActivityReservationPayloadType) =>
      activityService.postActivityReservation(params).then((res) => res.data),
  });

// 체험 등록 훅 (새 체험 생성 폼에서 사용)
export const usePostActivityMutation = () =>
  useMutation({
    mutationFn: (params: PostActivityPayloadType) =>
      activityService.postActivity(params).then((res) => res.data),
  });

// 이미지 업로드 훅 (배너 이미지, 서브 이미지 등록 시 사용)
export const usePostActivityImageMutation = () =>
  useMutation({
    mutationFn: (params: { payload: FormData }) =>
      activityService.postActivityImage(params).then((res) => res.data),
  });

// 내 체험 삭제 훅 (마이페이지에서 체험 삭제 시 사용)
export const useMyActivityDeleteMutation = () =>
  useMutation({
    mutationFn: (params: { activityId: number }) =>
      myActivityService.deleteMyActivity(params).then((res) => res.data),
  });