import { FC } from "react";
import { useAuth } from "@/store/AuthProvider";
import { useTranslation } from "react-i18next";
import EmptyStateCard from "@/features/user/components/common/EmptyStateCard";
import MainTextArea from "@/common/components/inputs/MainTextArea";
import MainBtn from "@/common/components/buttons/MainBtn";
import RatingInput from "@/common/components/inputs/RatingInput";
import { useReviewLogic } from "../../hooks/useReviewLogic";
import { FaSignInAlt } from "react-icons/fa";

interface ReviewFormProps {
    productId: number;
}

const ReviewForm: FC<ReviewFormProps> = ({ productId }) => {
    const { user } = useAuth();
    const { t } = useTranslation();
    const { form, submitReview, isLoading } = useReviewLogic(productId);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = form;

    // If user is not logged in, show login message
    if (!user) {
        return (
            <EmptyStateCard
                icon={FaSignInAlt}
                link="/auth/login"
                buttonText={t("go_to_login")}
                title={t("login_required")}
                description={t("please_login_to_write_review")}
                className="bg-gray-50 border-2 border-dashed border-gray-300"
            />
        );
    }

    // If user is logged in, show review form
    return (
        <div className="bg-white rounded-lg">
            <h4 className="text-lg font-medium mb-4">{t("write_a_review")}</h4>
            <form onSubmit={handleSubmit((data) => submitReview(data))} className="space-y-4">
                {/* Rating Section */}
                <RatingInput
                    label="rating"
                    value={form.watch("rating")}
                    onChange={(rating) => form.setValue("rating", rating)}
                    error={errors.rating?.message}
                    required
                />

                {/* Comment Section */}
                <MainTextArea
                    label="comment"
                    placeholder="share your experience with this product"
                    error={errors.comment?.message}
                    rows={5}
                    resize="vertical"
                    {...register("comment")}
                />

                {/* Submit Button */}
                <div className="flex justify-end">
                    <MainBtn
                        type="submit"
                        isPending={isLoading}
                        className="px-6 py-2"
                    >
                        {t("submit_review")}
                    </MainBtn>
                </div>
            </form>
        </div>
    );
};

export default ReviewForm;
