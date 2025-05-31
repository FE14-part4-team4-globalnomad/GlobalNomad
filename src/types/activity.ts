import { ActivityReservationType } from "./reservation";

export type ActivityCategoryType =
  | "문화 · 예술"
  | "식음료"
  | "스포츠"
  | "투어"
  | "관광"
  | "웰빙";

export interface SubImageType {
  id: number;
  imageUrl: string;
}

export interface ActivityType {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: ActivityCategoryType;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityScheduleType {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

export interface ActivityScheduleTimeType {
  date: string;
  times: {
    id: number;
    endTime: string;
    startTime: string;
  }[];
}

export interface ReviewType {
  id: number;
  user: {
    id: number;
    nickname: string;
    profileImageUrl: string;
  };
  activityId: number;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

//* ------------------- Payload & Result Type -------------------
/**
 * @property {number} page - 기본 값: 1
 * @property {number} size - 기본 값: 20
 */
export interface GetActivityListPayloadType {
  method: "offset" | "cursor";
  cursorId?: number;
  category?: ActivityCategoryType;
  keyword?: string;
  sort?: "most_reviewed" | "price_asc" | "price_desc" | "latest";
  page?: number;
  size?: number;
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

/**
 * @property {string} year - ex) 2024, 2025
 * @property {string} month - ex) 01, 02
 */
export interface GetActivityListAvailableSchedulePayloadType {
  activityId: number;
  year: string;
  month: string;
}

export type GetActivityListAvailableScheduleResultType =
  ActivityScheduleTimeType[];

/**
 * @property {number} page - 기본 값: 1
 * @property {number} size - 기본 값: 3
 */
export interface GetActivityReviewListPayloadType {
  activityId: number;
  payload: {
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
  title: string;
  category: string;
  description: string;
  address: string;
  price: number;
  schedules: Omit<ActivityScheduleType, "id">[];
  bannerImageUrl: string;
  subImageUrls: string[];
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
