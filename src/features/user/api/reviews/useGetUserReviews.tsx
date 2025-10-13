import { useInfiniteQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { PaginatedResponse } from "@/types/Response";
import type { Review } from "@/features/products/types/review.types";
import { useAuth } from "@/store/AuthProvider";
import { getNextPage } from "@/utils/getNextPage";

const useGetUserReviews = () => {
    const { user } = useAuth();

    return useInfiniteQuery<PaginatedResponse<Review[]>>({
        queryKey: [apiRoutes.myReviews, user?.id],
        queryFn: async ({ pageParam = 1 }) => {
            const { data } = await Axios.get<PaginatedResponse<Review[]>>(
                `${apiRoutes.myReviews}?page=${pageParam}`
            );
            return data;
        },
        getNextPageParam: (lastPage) => getNextPage(lastPage),
        initialPageParam: 1,
        enabled: Boolean(user),
    });
};

export default useGetUserReviews;

