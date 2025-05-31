import { AxiosInstance } from "axios";

import axiosInstance from "./instance";
import {
  GetMyReservationListPayloadType,
  GetMyReservationListResultType,
  PatchMyReservationPayloadType,
  PatchMyReservationResultType,
  PostMyReservationReviewPayloadType,
  PostMyReservationReviewResultType,
} from "@/types/reservation";

class ReservationService {
  fetcher: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.fetcher = instance;
  }

  /**
   * 내 예약 리스트 조회
   */
  async getMyReservations(query?: GetMyReservationListPayloadType) {
    return await this.fetcher.get<GetMyReservationListResultType>(
      "/my-reservations",
      { params: query },
    );
  }

  /**
   * 내 예약 수정(취소)
   */
  async patchMyReservations({
    reservationId,
    payload,
  }: PatchMyReservationPayloadType) {
    return await this.fetcher.patch<PatchMyReservationResultType>(
      `/my-reservations/${reservationId}`,
      payload,
    );
  }

  /**
   * 내 예약 리뷰 작성
   */
  async postMyReservationReview({
    reservationId,
    payload,
  }: PostMyReservationReviewPayloadType) {
    return await this.fetcher.post<PostMyReservationReviewResultType>(
      `/my-reservations/${reservationId}`,
      payload,
    );
  }
}

const reservationService = new ReservationService(axiosInstance);

export default reservationService;
