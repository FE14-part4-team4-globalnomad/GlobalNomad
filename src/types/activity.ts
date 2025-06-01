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
