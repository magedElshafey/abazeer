import { FC } from "react";
import { Review } from "../../types/review.types";
import { FaStar } from "react-icons/fa";
import Avatar from "@/common/components/avatar/Avatar";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import DeleteReviewButton from "@/features/user/components/reviews/DeleteReviewButton";

interface ReviewItemProps {
  review: Review;
}

const ReviewItem: FC<ReviewItemProps> = ({ review }) => {

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={
            i < fullStars ? "text-yellow-400 w-4 h-4" : "text-gray-300 w-4 h-4"
          }
        />
      );
    }
    return stars;
  };

  return (
    <div className="border rounded-lg p-4 flex flex-col justify-between h-full min-h-[220px] bg-white shadow-sm">
      {/* Top Section */}
      <div className="flex gap-2">
        <div className="w-16 flex-shrink-0">
          <Avatar url={review.user.image || "test"} alt={review.user.name} size={60} />
        </div>

        <div className="flex flex-col flex-1">
          <span className="font-medium text-gray-800">{review.user.name}</span>
          <div className="flex text-yellow-400">{renderStars(review.rate)}</div>
          <p className="text-gray-600 mt-1 line-clamp-3">{review.comment}</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
        {review.is_owner && (
          <DeleteReviewButton
            reviewId={review.id}
            queryKey={[apiRoutes.products]}
            variant="default"
          />
        )}
        <span className="text-xs text-gray-500">{review.created_at}</span>
      </div>
    </div>
  );
};

export default ReviewItem;
