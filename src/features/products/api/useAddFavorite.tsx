import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { useAuth } from "@/store/AuthProvider";
import type { Response } from "@/types/Response";

const useAddFavorite = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user } = useAuth();

  return useMutation({
    mutationKey: ["addFavorite"],
    mutationFn: async (product_id: number) => {
      if (!user) {
        navigate("/auth/login");
        return Promise.reject(new Error("User not authenticated"));
      }

      const { data } = await Axios.post<Response<unknown>>(
        apiRoutes.wishlist,
        { product_id }
      );
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [apiRoutes.products] });
    },
  });
};

export default useAddFavorite;

