import { AxiosInstance } from "axios";

import axiosInstance from "./instance";
import { HTTP_METHODS } from "@/constants/httpMethod";
import { ApiRequestParams } from "@/types/common";
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
  getMyNotifications(
    params?: ApiRequestParams<GetMyNotificationListPayloadType>,
  ) {
    const query = params?.query;
    const options = params?.options;

    return this.fetcher<GetMyNotificationListResultType>({
      url: "/my-notifications",
      method: HTTP_METHODS.GET,
      params: query,
      ...options,
    });
  }

  /**
   * 내 알림 삭제
   */
  deleteMyNotification(params?: ApiRequestParams<{ notificationId: number }>) {
    const notificationId = params?.notificationId;
    const options = params?.options;

    return this.fetcher({
      url: `/my-notifications/${notificationId}`,
      method: HTTP_METHODS.DELETE,
      ...options,
    });
  }
}

const notificationService = new NotificationService(axiosInstance);

export default notificationService;
