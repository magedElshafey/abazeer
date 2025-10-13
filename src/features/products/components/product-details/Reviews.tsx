import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ProductDetails } from "../../types/product.types";
import ReviewItem from "./ReviewItem";
import ReviewsOverview from "./ReviewsOverview";

interface ReviewsProps {
    product: ProductDetails;
}

const Reviews: FC<ReviewsProps> = ({ product }) => {
    const { t } = useTranslation();
    const reviews = product.reviews || [];

    return (
        <div className="space-y-4">
            <ReviewsOverview product={product} />
            
            {/* Individual Reviews List */}
            <div className="space-y-4">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <ReviewItem key={review.id} review={review} />
                    ))
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        {t("no_reviews_yet")}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reviews;


