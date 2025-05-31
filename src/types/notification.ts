export interface MyNotificationType {
  id: number;
  teamId: string;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

//* ------------------- Payload & Result Type -------------------
export interface GetMyNotificationListResultType {
  cursorId: number;
  totalCount: number;
  notifications: MyNotificationType[];
}
