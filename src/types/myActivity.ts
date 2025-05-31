import {
  ActivityCategoryType,
  ActivityScheduleType,
  GetActivityListResultType,
  PostActivityResultType,
} from "./activity";
import { ActivityReservationType } from "./reservation";

export type MyActivityReservationStatusType = "declined" | "confirmed";

export interface MyActivityReservationType extends ActivityReservationType {
  nickname: string;
}

export interface MyActivityReservationCountType {
  completed: number;
  confirmed: number;
  pending: number;
}

export interface GetMyMonthlyActivityReservationType {
  date: string;
  reservations: MyActivityReservationCountType;
}

export interface MyActivitiesReservedScheduleType {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: MyActivityReservationCountType;
}

//* ------------------- Payload & Result Type -------------------
export interface GetMyActivityListPayloadType {
  query?: {
    cursorId?: number;
    size?: number;
  };
}

export type GetMyActivityListResultType = GetActivityListResultType;

export interface GetMyMonthlyActivityReservationsPayloadType {
  activityId: number;
  query: {
    year: string;
    month: string;
  };
}

export type GetMyMonthlyActivityReservationsResultType =
  GetMyMonthlyActivityReservationType[];

export interface GetMyActivityReservedSchedulePayloadType {
  activityId: number;
  query: {
    date: string;
  };
}

export type GetMyActivityReservedScheduleResultType =
  MyActivitiesReservedScheduleType[];

export interface GetMyHourlyActivityReservationsPayloadType {
  activityId: number;
  query: {
    cursorId?: number;
    size?: number;
    scheduleId: number;
    status: "pending" | MyActivityReservationStatusType;
  };
}

export interface GetMyHourlyActivityReservationsResultType {
  cursorId: number;
  totalCount: number;
  reservations: MyActivityReservationType[];
}

export interface PatchMyActivityReservationPayloadType {
  activityId: number;
  reservationId: number;
  payload: {
    status: MyActivityReservationStatusType;
  };
}

export type PatchMyActivityReservationResultType = Omit<
  MyActivityReservationType,
  "nickname"
>;

export interface PatchMyActivityPayloadType {
  activityId: number;
  payload: {
    title: string;
    category: ActivityCategoryType;
    description: string;
    price: number;
    address: string;
    bannerImageUrl: string;
    subImageIdsToRemove: number[];
    subImageUrlsToAdd: string[];
    scheduleIdsToRemove: number[];
    schedulesToAdd: Omit<ActivityScheduleType, "id">[];
  };
}

export type PatchMyActivityResultType = PostActivityResultType;
