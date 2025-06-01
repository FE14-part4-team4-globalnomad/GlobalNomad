import { ActivityReservationType } from "../apis/reservation/reservation.schema";

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

export interface MyActivityReservedScheduleType {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: MyActivityReservationCountType;
}
