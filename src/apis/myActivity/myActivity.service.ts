import { AxiosInstance } from "axios";

import axiosInstance from "../instance";
import {
  GetMyActivityListPayloadType,
  GetMyActivityListResultType,
  GetMyMonthlyActivityReservationsPayloadType,
  GetMyMonthlyActivityReservationsResultType,
  GetMyHourlyActivityReservationsPayloadType,
  GetMyActivityReservedSchedulePayloadType,
  GetMyActivityReservedScheduleResultType,
  GetMyHourlyActivityReservationsResultType,
  PatchMyActivityReservationPayloadType,
  PatchMyActivityReservationResultType,
  PatchMyActivityPayloadType,
} from "@/apis/myActivity/myActivity.schema";
import { HTTP_METHODS } from "@/constants/httpMethod";
import { ApiRequestParams } from "@/types/common";

class MyActivityService {
  fetcher: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.fetcher = instance;
  }

  /**
   * 내 체험 리스트 조회
   */
  getMyActivities(params?: ApiRequestParams<GetMyActivityListPayloadType>) {
    const query = params?.query;
    const options = params?.options;

    return this.fetcher<GetMyActivityListResultType>({
      url: "/my-activities",
      method: HTTP_METHODS.GET,
      params: query,
      ...options,
    });
  }

  /**
   * 내 체험 월별 예약 현황 조회
   *
   * @property {string} query.year - ex) 2024, 2025
   * @property {string} query.month - ex) 01, 02
   */
  getMyMonthlyActivityReservations({
    activityId,
    query,
    options,
  }: ApiRequestParams<GetMyMonthlyActivityReservationsPayloadType>) {
    return this.fetcher<GetMyMonthlyActivityReservationsResultType>({
      url: `/my-activities/${activityId}/reservation-dashboard`,
      method: HTTP_METHODS.GET,
      params: query,
      ...options,
    });
  }

  /**
   * 내 체험 날짜별 예약정보(신청, 승인 거절)가 있는 스케줄 조회
   */
  getMyActivityReservedSchedule({
    activityId,
    query,
    options,
  }: ApiRequestParams<GetMyActivityReservedSchedulePayloadType>) {
    return this.fetcher<GetMyActivityReservedScheduleResultType>({
      url: `/my-activities/${activityId}/reserved-schedule`,
      method: HTTP_METHODS.GET,
      params: query,
      ...options,
    });
  }

  /**
   * 내 체험 예약 시간대별 예약 내역 조회
   *
   * @property {number} size - 기본 값: 10
   */
  getMyHourlyActivityReservations({
    activityId,
    query,
    options,
  }: ApiRequestParams<GetMyHourlyActivityReservationsPayloadType>) {
    return this.fetcher<GetMyHourlyActivityReservationsResultType>({
      url: `/my-activities/${activityId}/reservations`,
      method: HTTP_METHODS.GET,
      params: query,
      ...options,
    });
  }

  /**
   * 내 체험 예약 상태(승인, 거절) 업데이트
   */
  patchMyActivityReservation({
    activityId,
    reservationId,
    payload,
    options,
  }: ApiRequestParams<PatchMyActivityReservationPayloadType>) {
    return this.fetcher<PatchMyActivityReservationResultType>({
      url: `/my-activities/${activityId}/reservations/${reservationId}`,
      method: HTTP_METHODS.PATCH,
      data: payload,
      ...options,
    });
  }

  /**
   * 내 체험 삭제
   */
  deleteMyActivity({
    activityId,
    options,
  }: ApiRequestParams<{ activityId: number }>) {
    return this.fetcher({
      url: `/my-activities/${activityId}`,
      method: HTTP_METHODS.DELETE,
      ...options,
    });
  }

  /**
   * 내 체험 수정
   *
   * @property { number[] } subImgeIdsToRemove - 제거할 이미지 ID 배열
   * @property { string[] } subImageUrlsToAdd -추가할 이미지 경로 배열
   * @property { number[] } scheduleIdsToRemove - 제거할 스케줄 배열
   * @property {
   *   {
   *     id: number,
   *     date: string,
   *     startTime: string,
   *     endTime: string,
   *   }[]
   * } payload.schedulesToAdd - 추가할 스케줄
   */
  patchMyActivity({
    activityId,
    payload,
    options,
  }: ApiRequestParams<PatchMyActivityPayloadType>) {
    return this.fetcher({
      url: `/my-activities/${activityId}`,
      method: HTTP_METHODS.PATCH,
      data: payload,
      ...options,
    });
  }
}

const myActivityService = new MyActivityService(axiosInstance);

export default myActivityService;
