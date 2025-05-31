import { AxiosInstance } from "axios";

import axiosInstance from "./instance";
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
} from "@/types/activity";

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
  async getActivities({ query }: GetActivityListPayloadType) {
    return await this.fetcher.get<GetActivityListResultType>("/activities", {
      params: query,
    });
  }

  /**
   * 체험 등록
   */
  async postActivity({ payload }: PostActivityPayloadType) {
    return await this.fetcher.post<PostActivityResultType>(
      "/activities",
      payload,
    );
  }

  /**
   * 체험 상세 조회
   */
  async getActivity(activityId: number) {
    return await this.fetcher.get<GetActivityResultType>(
      `/activities/${activityId}`,
    );
  }

  /**
   * 체험 예약 가능일 조회
   * @property {string} query.year - ex) 2024, 2025
   * @property {string} query.month - ex) 01, 02
   */
  async getActivityAvailableSchedule({
    activityId,
    query,
  }: GetActivityAvailableSchedulePayloadType) {
    return await this.fetcher.get<GetActivityAvailableScheduleResultType>(
      `/activities/${activityId}/available-schedule`,
      { params: query },
    );
  }

  /**
   * 체험 리뷰 조회
   *
   * @property {number} query.page - 기본 값: 1
   * @property {number} query.size - 기본 값: 3
   */
  async getActivityReviewList({
    activityId,
    query,
  }: GetActivityReviewListPayloadType) {
    return await this.fetcher.get<GetActivityReviewListResultType>(
      `/activities/${activityId}/reviews`,
      { params: query },
    );
  }

  /**
   * 체험 예약 신청
   */
  async postActivityReservation({
    activityId,
    payload,
  }: PostActivityReservationPayloadType) {
    return await this.fetcher.post<PostActivityReservationResultType>(
      `/activities/${activityId}/reservations`,
      payload,
    );
  }

  /**
   * 체험 이미지 url 생성
   */
  async postActivityImage(image: FormData) {
    return await this.fetcher.post<PostActivityImageResultType>(
      `/activities/image`,
      image,
    );
  }
}

const activityService = new ActivityService(axiosInstance);

export default activityService;
