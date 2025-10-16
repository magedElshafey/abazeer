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
  // Generate star rating based on rate
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400 w-4 h-4" />);
      } else {
        stars.push(<FaStar key={i} className="text-gray-300 w-4 h-4" />);
      }
    }

    return stars;
  };

  return (
    <div className="border rounded-lg p-4 ">
      <div className="flex  gap-2 mb-5">
        <div className="w-16 flex-shrink-0">
          <Avatar url="/images/600x600.jpg" alt={review.user.name} size={60} />
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="font-medium text-gray-800">{review.user.name}</span>
          <div className="flex text-yellow-400">{renderStars(review.rate)}</div>
          <p className="text-gray-600">{review.comment}</p>
        </div>

        {/* Review Content */}
      </div>
      <div className="flex-between">
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
/**
 *   <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
             
            </div>

           
          </div>
       
        </div>
 */
