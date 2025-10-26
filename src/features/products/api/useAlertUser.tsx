import { Axios } from "@/lib/axios/Axios"
import { apiRoutes } from "@/services/api-routes/apiRoutes"
import { useAuth } from "@/store/AuthProvider"
import { Response } from "@/types/Response"
import { useMutation } from "@tanstack/react-query"

const useAlertUser = (productId: number) => {
    const {user} = useAuth();

    return useMutation({
        mutationFn: async (data?: string) => {
           const response = await Axios.post<Response>(apiRoutes.alertUser, {
            email: data || undefined,
            user_id: data ? undefined : user?.id,
            product_id: productId
           });
           return response;
        },
    })
}

export default useAlertUser;