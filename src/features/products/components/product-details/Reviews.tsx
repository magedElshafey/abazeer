import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ProductDetails } from "../../types/product.types";
import ReviewItem from "./ReviewItem";
import ReviewsOverview from "./ReviewsOverview";
import Slider from "@/common/components/slider/Slider";

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
          <Slider
            key={reviews?.length}
            showControls={true}
            breakPoints={{
              "(min-width: 772px)": { slides: { perView: 2, spacing: 16 } },
              "(max-width: 772px)": { slides: { perView: 1, spacing: 12 } },
            }}
          >
            {reviews.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </Slider>
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
