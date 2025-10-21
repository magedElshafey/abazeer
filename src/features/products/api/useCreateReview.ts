import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { Response } from "@/types/Response";
import { toast } from "sonner";
import { ReviewFormData } from "../schemas/review.schema";
import toastErrorMessage from "@/utils/toastApiError";

interface CreateReviewPayload extends ReviewFormData {
  product_id: number;
}

const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createReview"],
    mutationFn: async ({
      product_id,
      rating,
      comment,
    }: CreateReviewPayload) => {
      const { data } = await Axios.post<Response<unknown>>(apiRoutes.reviews, {
        product_id,
        rating,
        comment,
      });
      return data;
    },
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: [apiRoutes.products] });
      toast.success(response.message);
    },
    onError: (error: Error) => {
      toastErrorMessage(error);
    },
  });
};

export default useCreateReview;
