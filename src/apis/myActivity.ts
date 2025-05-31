import { AxiosInstance } from "axios";

import axiosInstance from "./instance";
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
} from "@/types/myActivity";

class MyActivityService {
  fetcher: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.fetcher = instance;
  }

  /**
   * 내 체험 리스트 조회
   */
  async getMyActivities(params?: GetMyActivityListPayloadType) {
    const query = params?.query;
    return await this.fetcher.get<GetMyActivityListResultType>(
      "/my-activities",
      {
        params: query,
      },
    );
  }

  /**
   * 내 체험 월별 예약 현황 조회
   *
   * @property {string} query.year - ex) 2024, 2025
   * @property {string} query.month - ex) 01, 02
   */
  async getMyMonthlyActivityReservations({
    activityId,
    query,
  }: GetMyMonthlyActivityReservationsPayloadType) {
    return await this.fetcher.get<GetMyMonthlyActivityReservationsResultType>(
      `/my-activities/${activityId}/reservation-dashboard`,
      {
        params: query,
      },
    );
  }

  /**
   * 내 체험 날짜별 예약정보(신청, 승인 거절)가 있는 스케줄 조회
   */
  async getMyActivityReservedSchedule({
    activityId,
    query,
  }: GetMyActivityReservedSchedulePayloadType) {
    return await this.fetcher.get<GetMyActivityReservedScheduleResultType>(
      `/my-activities/${activityId}/reserved-schedule`,
      {
        params: query,
      },
    );
  }

  /**
   * 내 체험 예약 시간대별 예약 내역 조회
   *
   * @property {number} size - 기본 값: 10
   */
  async getMyHourlyActivityReservations({
    activityId,
    query,
  }: GetMyHourlyActivityReservationsPayloadType) {
    return await this.fetcher.get<GetMyHourlyActivityReservationsResultType>(
      `/my-activities/${activityId}/reservations`,
      {
        params: query,
      },
    );
  }

  /**
   * 내 체험 예약 상태(승인, 거절) 업데이트
   */
  async patchMyActivityReservation({
    activityId,
    reservationId,
    payload,
  }: PatchMyActivityReservationPayloadType) {
    return await this.fetcher.patch<PatchMyActivityReservationResultType>(
      `/my-activities/${activityId}/reservations/${reservationId}`,
      payload,
    );
  }

  /**
   * 내 체험 삭제
   */
  async deleteMyActivity(activityId: number) {
    return await this.fetcher.delete(`/my-activities/${activityId}`);
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
  async patchMyActivity({ activityId, payload }: PatchMyActivityPayloadType) {
    return await this.fetcher.patch(`/my-activities/${activityId}`, payload);
  }
}

const myActivityService = new MyActivityService(axiosInstance);

export default myActivityService;
