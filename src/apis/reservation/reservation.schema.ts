import {
  MyReservationType,
  ReservationStatusType,
} from "../../types/reservation";

export interface GetMyReservationListPayloadType {
  query: {
    cursorId?: number;
    size?: number;
    status?: ReservationStatusType;
  };
}

export interface GetMyReservationListResultType {
  cursorId: number;
  totalCount: number;
  reservations: MyReservationType[];
}

export interface PatchMyReservationPayloadType {
  reservationId: number;
  payload: {
    status: "canceled";
  };
}

export interface ActivityReservationType {
  id: number;
  teamId: string;
  userId: number;
  activityId: number;
  scheduleId: number;
  status: ReservationStatusType;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export type PatchMyReservationResultType = ActivityReservationType;

export interface PostMyReservationReviewPayloadType {
  reservationId: number;
  payload: {
    rating: number;
    content: string;
  };
}

export interface PostMyReservationReviewResultType {
  id: number;
  teamId: string;
  userId: number;
  activityId: number;
  content: string;
  rating: number;
  deletedAt: string;
  updatedAt: string;
  createdAt: string;
}
