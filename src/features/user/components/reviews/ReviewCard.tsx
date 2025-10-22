import { FC } from "react";
import { FaStar } from "react-icons/fa";
import type { MyReview } from "@/features/products/types/review.types";
import DeleteReviewButton from "./DeleteReviewButton";
import { useNavigate } from "react-router-dom";

interface ReviewCardProps {
  review: MyReview;
}

const ReviewCard: FC<ReviewCardProps> = ({ review }) => {
  const navigate = useNavigate();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row items-center gap-2 sm:gap-4">
        {/* Product Image */}
        <img
          src={
            review.product.image ? review.product.image : `/images/600x600.jpg`
          }
          alt="Product"
          className="w-16 h-16 object-contain aspect-square"
        />

        {/* Product and Review Info */}
        <div className=" flex flex-col">
          {/* Product Name */}
          <h3
            className="font-semibold text-blue-400 text-sm mb-1 hover:underline hover:text-blue-500 cursor-pointer"
            onClick={() => navigate(`/products/${review.product.id}`)}
          >
            {review.product.name}
          </h3>

          {/* Star Rating */}
          <div className="flex items-center gap-1 mb-1">
            {renderStars(review.rate)}
          </div>

          {/* Date */}
          <p className="text-xs text-gray-500 mb-2">{review.created_at}</p>

          {/* Review Comment */}
          <p className="text-sm text-gray-700 mb-3">{review.comment}</p>
        </div>
      </div>
      <div className="w-full flex justify-end">
        {/* Delete Button */}
        <DeleteReviewButton reviewId={review.id} variant="simple" />
      </div>
    </div>
  );
};

export default ReviewCard;
