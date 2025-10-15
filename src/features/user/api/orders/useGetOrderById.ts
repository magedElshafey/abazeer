import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { Response } from "@/types/Response";
import type { OrderDetails } from "../../types/orders.types";
import { useAuth } from "@/store/AuthProvider";

const useGetOrderById = (orderId: string | number) => {
    const { user } = useAuth();

    return useQuery({
        queryKey: [apiRoutes.orders, orderId],
        queryFn: async () => {
            const { data } = await Axios.get<Response<OrderDetails>>(`${apiRoutes.orders}/${orderId}`);
            return data?.data;
        },
        enabled: Boolean(user && orderId),
    });
};

export default useGetOrderById;