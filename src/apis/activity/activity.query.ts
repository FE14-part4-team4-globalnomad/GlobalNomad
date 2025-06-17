import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import axios from "axios";

import {
  GetActivityAvailableSchedulePayloadType,
  GetActivityReviewListPayloadType,
  PostActivityReservationPayloadType,
} from "./activity.schema";

import activityService from "./activity.service";
import myActivityService from '@/apis/myActivity/myActivity.service';

// 체험 상세 조회
export const useActivityQuery = (activityId: number, enabled = true) =>
  useQuery({
    queryKey: ["activity", activityId],
    queryFn: () => activityService.getActivity({ activityId }).then((res) => res.data),
    enabled,
  });

// 체험 예약 가능 일정 조회
export const useActivityAvailableScheduleQuery = (
  params: GetActivityAvailableSchedulePayloadType,
  enabled = true
) =>
  useQuery({
    queryKey: [
      "activityAvailableSchedule",
      params.activityId,
      params.query.year,
      params.query.month,
    ],
    queryFn: () => activityService.getActivityAvailableSchedule(params).then((res) => res.data),
    enabled,
  });

// 체험 리뷰 리스트 조회
export const useActivityReviewListQuery = (
  params: GetActivityReviewListPayloadType,
  enabled = true
) =>
  useQuery({
    queryKey: [
      "activityReviewList",
      params.activityId,
      params.query?.page,
      params.query?.size,
    ],
    queryFn: () => activityService.getActivityReviewList(params).then((res) => res.data),
    enabled,
  });

// 체험 예약 신청
export const useActivityReservationMutation = () =>
  useMutation({
    mutationFn: (params: PostActivityReservationPayloadType) =>
      activityService.postActivityReservation(params).then((res) => res.data),
  });

// ✅ 내 체험 삭제
export const useMyActivityDeleteMutation = () =>
  useMutation({
    mutationFn: (params: { activityId: number }) =>
      myActivityService.deleteMyActivity(params).then((res) => res.data),
  });