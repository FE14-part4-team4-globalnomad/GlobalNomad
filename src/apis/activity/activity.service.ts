import { AxiosInstance } from "axios";

import axiosInstance from "../instance";
import {
  GetActivityAvailableSchedulePayloadType,
  GetActivityAvailableScheduleResultType,
  GetActivityListPayloadType,
  GetActivityListResultType,
  GetActivityResultType,
  GetActivityReviewListPayloadType,
  GetActivityReviewListResultType,
  PostActivityImageResultType,
  PostActivityPayloadType,
  PostActivityReservationPayloadType,
  PostActivityReservationResultType,
  PostActivityResultType,
} from "@/apis/activity/activity.schema";
import { HTTP_METHODS } from "@/constants/httpMethod";
import { ApiRequestParams } from "@/types/common";

class ActivityService {
  fetcher: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.fetcher = instance;
  }

  /**
   * 체험 리스트 조회
   *
   * @property {number} page - 기본 값: 1
   * @property {number} size - 기본 값: 20
   */
  getActivities({
    query,
    options,
  }: ApiRequestParams<GetActivityListPayloadType>) {
    return this.fetcher<GetActivityListResultType>({
      url: "/activities",
      method: HTTP_METHODS.GET,
      params: query,
      ...options,
    });
  }

  /**
   * 체험 등록
   */
  postActivity({
    payload,
    options,
  }: ApiRequestParams<PostActivityPayloadType>) {
    return this.fetcher<PostActivityResultType>({
      url: "/activities",
      method: HTTP_METHODS.POST,
      data: payload,
      ...options,
    });
  }

  /**
   * 체험 상세 조회
   */
  getActivity({
    activityId,
    options,
  }: ApiRequestParams<{ activityId: number }>) {
    return this.fetcher<GetActivityResultType>({
      url: `/activities/${activityId}`,
      method: HTTP_METHODS.GET,
      ...options,
    });
  }

  /**
   * 체험 예약 가능일 조회
   * @property {string} query.year - ex) 2024, 2025
   * @property {string} query.month - ex) 01, 02
   */
  getActivityAvailableSchedule({
    activityId,
    query,
    options,
  }: ApiRequestParams<GetActivityAvailableSchedulePayloadType>) {
    return this.fetcher<GetActivityAvailableScheduleResultType>({
      url: `/activities/${activityId}/available-schedule`,
      method: HTTP_METHODS.GET,
      params: query,
      ...options,
    });
  }

  /**
   * 체험 리뷰 조회
   *
   * @property {number} query.page - 기본 값: 1
   * @property {number} query.size - 기본 값: 3
   */
  getActivityReviewList({
    activityId,
    query,
    options,
  }: ApiRequestParams<GetActivityReviewListPayloadType>) {
    return this.fetcher<GetActivityReviewListResultType>({
      url: `/activities/${activityId}/reviews`,
      method: HTTP_METHODS.GET,
      params: query,
      ...options,
    });
  }

  /**
   * 체험 예약 신청
   */
  postActivityReservation({
    activityId,
    payload,
    options,
  }: ApiRequestParams<PostActivityReservationPayloadType>) {
    return this.fetcher<PostActivityReservationResultType>({
      url: `/activities/${activityId}/reservations`,
      method: HTTP_METHODS.POST,
      data: payload,
      ...options,
    });
  }

  /**
   * 체험 이미지 url 생성
   */
  postActivityImage({
    payload,
    options,
  }: ApiRequestParams<{ payload: FormData }>) {
    return this.fetcher<PostActivityImageResultType>({
      url: `/activities/image`,
      method: HTTP_METHODS.POST,
      data: payload,
      ...options,
    });
  }
}

const activityService = new ActivityService(axiosInstance);

export default activityService;
