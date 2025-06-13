import {
  ActivityCategoryType,
  ActivityScheduleTimeType,
  ActivityScheduleType,
  ActivityType,
  ReviewType,
  SubImageType,
} from "../../types/activity";
import { ActivityReservationType } from "../reservation/reservation.schema";

export interface GetActivityListPayloadType {
  query: {
    method: "offset" | "cursor";
    cursorId?: number;
    category?: ActivityCategoryType;
    keyword?: string;
    sort?: "most_reviewed" | "price_asc" | "price_desc" | "latest";
    page?: number;
    size?: number;
  };
}

export interface GetActivityListResultType {
  cursorId: number;
  totalCount: number;
  activities: ActivityType[];
}

export interface GetActivityResultType extends ActivityType {
  subImages: SubImageType[];
  schedules: ActivityScheduleType[];
}

export interface GetActivityAvailableSchedulePayloadType {
  activityId: number;
  query: {
    year: string;
    month: string;
  };
}

export type GetActivityAvailableScheduleResultType = ActivityScheduleTimeType[];

export interface GetActivityReviewListPayloadType {
  activityId: number;
  query?: {
    page?: number;
    size?: number;
  };
}

export interface GetActivityReviewListResultType {
  averageRating: number;
  totalCount: number;
  reviews: ReviewType[];
}

export interface PostActivityPayloadType {
  payload: {
    title: string;
    category: string;
    description: string;
    address: string;
    price: number;
    schedules?: Omit<ActivityScheduleType, "id">[];
    bannerImageUrl: string;
    subImageUrls?: string[];
  };
}

export interface PostActivityResultType extends ActivityType {
  subImages: SubImageType[];
  schedules: ActivityScheduleTimeType[];
}

export interface PostActivityReservationPayloadType {
  activityId: number;
  payload: {
    scheduleId: number;
    headCount: number;
  };
}

export type PostActivityReservationResultType = ActivityReservationType;

export interface PostActivityImageResultType {
  activityImageUrl: string;
}
