export type ReservationStatusType =
  | "pending"
  | "confirmed"
  | "declined"
  | "canceled"
  | "completed";

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

export interface MyReservationType
  extends Omit<ActivityReservationType, "activityId"> {
  activity: {
    id: number;
    title: string;
    bannerImageUrl: string;
  };
}

export interface ReviewModalProps {
  title: string;
  schedule: string;
  onSubmit: (rating: number, content: string) => void;
}
