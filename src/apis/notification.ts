import { AxiosInstance } from "axios";

import axiosInstance from "./instance";
import {
  GetMyNotificationListPayloadType,
  GetMyNotificationListResultType,
} from "@/types/notification";

class NotificationService {
  fetcher: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.fetcher = instance;
  }

  /**
   * 내 알림 리스트 조회
   */
  async getMyNotifications({ query }: GetMyNotificationListPayloadType) {
    return await this.fetcher.get<GetMyNotificationListResultType>(
      "/my-notifications",
      {
        params: query,
      },
    );
  }

  /**
   * 내 알림 삭제
   */
  async deleteMyNotification(notificationId: number) {
    return await this.fetcher.delete(`/my-notifications/${notificationId}`);
  }
}

const notificationService = new NotificationService(axiosInstance);

export default notificationService;
