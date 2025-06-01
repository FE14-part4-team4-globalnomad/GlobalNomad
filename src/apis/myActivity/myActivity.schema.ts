import {
  ActivityCategoryType,
  ActivityScheduleType,
} from "../../types/activity";
import {
  GetMyMonthlyActivityReservationType,
  MyActivityReservedScheduleType,
  MyActivityReservationStatusType,
  MyActivityReservationType,
} from "../../types/myActivity";
import {
  GetActivityListResultType,
  PostActivityResultType,
} from "../activity/activity.schema";

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
  MyActivityReservedScheduleType[];

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
    title?: string;
    category?: ActivityCategoryType;
    description?: string;
    price?: number;
    address?: string;
    bannerImageUrl?: string;
    subImageIdsToRemove?: number[];
    subImageUrlsToAdd?: string[];
    scheduleIdsToRemove?: number[];
    schedulesToAdd?: Omit<ActivityScheduleType, "id">[];
  };
}

export type PatchMyActivityResultType = PostActivityResultType;
