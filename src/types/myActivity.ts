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

//* ------------------- Payload & Result Type -------------------
export type GetMyActivityListResultType = GetActivityListResultType;

export interface MyActivityReservationDashboardType {
  date: string;
  reservations: MyActivityReservationCountType;
}

export type GetMyActivityReservationDashboardResultType =
  MyActivityReservationDashboardType[];

export interface GetMyActivitiesReservedScheduleType {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: MyActivityReservationCountType;
}

export type GetMyActivitiesReservedScheduleResultType =
  GetMyActivitiesReservedScheduleType[];

export interface GetMyActivityReservationListResultType {
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
