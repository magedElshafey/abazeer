import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewSchema, ReviewFormData } from "../schemas/review.schema";
import useCreateReview from "../api/useCreateReview";
export const useReviewLogic = (productId: number) => {
  const { mutate: createReview, isPending } = useCreateReview();

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 1,
      comment: "",
    },
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  const submitReview = (data: ReviewFormData) => {
    createReview(
      {
        product_id: productId,
        rating: data.rating,
        comment: data.comment,
      },
      {
        onSuccess: () => {
          form.reset();
        },
      }
    );
  };

  return {
    isLoading: isPending,
    submitReview,
    form,
  };
};
