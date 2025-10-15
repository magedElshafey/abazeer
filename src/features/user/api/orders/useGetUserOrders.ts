import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { Response } from "@/types/Response";
import type { Order } from "../../types/orders.types";
import { useAuth } from "@/store/AuthProvider";

const useGetUserOrders = () => {
    const { user } = useAuth();

    return useQuery({
        queryKey: [apiRoutes.orders, user?.id],
        queryFn: async () => {
            const { data } = await Axios.get<Response<Order[]>>(apiRoutes.orders);
            return data?.data;
        },
        enabled: Boolean(user),
    });
};

export default useGetUserOrders;

