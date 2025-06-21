import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  GetMyNotificationListResultType,
  GetMyNotificationListPayloadType,
} from "./notification.schema";
import notificationService from "./notification.service";

const myNotificationsQueryKey = ["myNotifications"];

export const useMyNotificationListQuery = (
  params?: GetMyNotificationListPayloadType
) => {
  const size = params?.query?.size ?? 10;

  return useInfiniteQuery<GetMyNotificationListResultType>({
    queryKey: myNotificationsQueryKey,
    initialPageParam: undefined,
    queryFn: ({ pageParam }) =>
      notificationService
        .getMyNotifications({
          query: {
            cursorId: pageParam as number | undefined,
            size,
          },
        })
        .then((res) => res.data),
    getNextPageParam: (lastPage) =>
      lastPage.notifications.length < size ? undefined : lastPage.cursorId,
  });
};

export const useDeleteMyNotificationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: number) =>
      notificationService.deleteMyNotification({ notificationId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: myNotificationsQueryKey });
    },
  });
};