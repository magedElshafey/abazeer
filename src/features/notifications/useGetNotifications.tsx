import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { Response } from "@/types/Response";
import type { Notification } from "./types/notification.types";
import { useAuth } from "@/store/AuthProvider";

const useGetNotifications = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: [apiRoutes.notifications, user?.id],
    queryFn: async ({ signal }) => {
      const { data } = await Axios.get<Response<Notification[]>>(
        apiRoutes.notifications,
        { signal }
      );
      return data?.data;
    },
    enabled: Boolean(user),
  });
};

export default useGetNotifications;
