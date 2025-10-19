import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { Response } from "@/types/Response";
import type { Product } from "@/features/products/types/product.types";
import { useAuth } from "@/store/AuthProvider";

const useGetFavorites = () => {
    const { user } = useAuth();

    return useQuery({
        queryKey: [apiRoutes.favorites, user?.id],
        queryFn: async ({ signal }) => {
            const { data } = await Axios.get<Response<Product[]>>(apiRoutes.favorites, {signal});
            return data?.data;
        },
        enabled: Boolean(user),
    });
};

export default useGetFavorites;
