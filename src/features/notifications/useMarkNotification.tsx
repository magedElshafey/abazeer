import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { Response } from "@/types/Response";
import type { Notification } from "./types/notification.types";
import { useAuth } from "@/store/AuthProvider";

const useMarkNotification = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (notificationId: string) => {
      const { data } = await Axios.get<Response<unknown>>(
        `${apiRoutes.notifications}/${notificationId}/mark-as-read`
      );
      return { data, notificationId };
    },
    onMutate: async (notificationId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [apiRoutes.notifications, user?.id],
      });

      // Snapshot the previous value
      const previousNotifications = queryClient.getQueryData<Notification[]>([
        apiRoutes.notifications,
        user?.id,
      ]);

      // Optimistically update the notification
      queryClient.setQueryData<Notification[]>(
        [apiRoutes.notifications, user?.id],
        (old) => {
          if (!old) return old;
          return old.map((notification) =>
            notification.id === notificationId
              ? {
                  ...notification,
                  read_at: new Date().toISOString(),
                }
              : notification
          );
        }
      );

      // Return context with the previous value
      return { previousNotifications };
    },
    onError: (_, __, context) => {
      // Rollback to the previous value on error
      if (context?.previousNotifications) {
        queryClient.setQueryData(
          [apiRoutes.notifications, user?.id],
          context.previousNotifications
        );
      }
    },
    onSettled: () => {
      // Refetch to ensure we have the latest data
      queryClient.invalidateQueries({
        queryKey: [apiRoutes.notifications, user?.id],
      });
    },
  });
};

export default useMarkNotification;

