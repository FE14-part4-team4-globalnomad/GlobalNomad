import { MyNotificationType } from "../../types/notification";

export interface GetMyNotificationListPayloadType {
  query?: {
    cursorId?: number;
    size?: number;
  };
}

export interface GetMyNotificationListResultType {
  cursorId: number;
  totalCount: number;
  notifications: MyNotificationType[];
}
