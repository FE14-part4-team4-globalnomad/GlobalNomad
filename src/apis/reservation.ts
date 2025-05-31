import { AxiosInstance } from "axios";

import axiosInstance from "./instance";
import { HTTP_METHODS } from "@/constants/httpMethod";
import { ApiRequestParams } from "@/types/common";
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
  getMyReservations(
    params?: ApiRequestParams<GetMyReservationListPayloadType>,
  ) {
    const query = params?.query;
    const options = params?.options;

    return this.fetcher<GetMyReservationListResultType>({
      url: "/my-reservations",
      method: HTTP_METHODS.GET,
      params: query,
      ...options,
    });
  }

  /**
   * 내 예약 수정(취소)
   */
  patchMyReservations({
    reservationId,
    payload,
    options,
  }: ApiRequestParams<PatchMyReservationPayloadType>) {
    return this.fetcher<PatchMyReservationResultType>({
      url: `/my-reservations/${reservationId}`,
      method: HTTP_METHODS.PATCH,
      data: payload,
      ...options,
    });
  }

  /**
   * 내 예약 리뷰 작성
   */
  postMyReservationReview({
    reservationId,
    payload,
    options,
  }: ApiRequestParams<PostMyReservationReviewPayloadType>) {
    return this.fetcher<PostMyReservationReviewResultType>({
      url: `/my-reservations/${reservationId}`,
      method: HTTP_METHODS.POST,
      data: payload,
      ...options,
    });
  }
}

const reservationService = new ReservationService(axiosInstance);

export default reservationService;
