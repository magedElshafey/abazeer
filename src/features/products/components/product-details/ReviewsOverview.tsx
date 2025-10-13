import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ProductDetails } from "../../types/product.types";
import { FaStar } from "react-icons/fa";
import ReviewForm from "./ReviewForm";

interface ReviewsOverviewProps {
    product: ProductDetails;
}

const ReviewsOverview: FC<ReviewsOverviewProps> = ({ product }) => {
    const { t } = useTranslation();

    // Calculate rating distribution
    const calculateRatingDistribution = () => {
        const reviews = product.reviews || [];
        const totalReviews = reviews.length;
        
        if (totalReviews === 0) {
            return {
                5: 0,
                4: 0,
                3: 0,
                2: 0,
                1: 0
            };
        }

        const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        
        reviews.forEach(review => {
            const rating = review.rate;
            if (rating >= 1 && rating <= 5) {
                distribution[rating as keyof typeof distribution]++;
            }
        });

        // Convert to percentages
        return {
            5: parseFloat(((distribution[5] / totalReviews) * 100).toFixed(1)),
            4: parseFloat(((distribution[4] / totalReviews) * 100).toFixed(1)),
            3: parseFloat(((distribution[3] / totalReviews) * 100).toFixed(1)),
            2: parseFloat(((distribution[2] / totalReviews) * 100).toFixed(1)),
            1: parseFloat(((distribution[1] / totalReviews) * 100).toFixed(1))
        };
    };

    const ratingDistribution = calculateRatingDistribution();
    const totalReviews = product.reviews?.length || 0;

    // Render stars for average rating
    const renderAverageStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(
                    <FaStar key={i} className="text-yellow-400 w-5 h-5" />
                );
            } else {
                stars.push(
                    <FaStar key={i} className="text-gray-300 w-5 h-5" />
                );
            }
        }

        return stars;
    };

    return (
        <div className="mb-6">
            <h3 className="text-xl font-semibold text-text-light pb-3 border-b-2 border-orangeColor mb-4">
                {t("customer_reviews")}
            </h3>
            
            {/* Responsive Layout */}
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Reviews Overview - 1/4 on large screens, full width on smaller */}
                <div className="w-full lg:w-1/3">
                    {/* Average Rating Section */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="text-4xl font-bold text-text-gray">
                            {product.average_rate?.toFixed(2) || "0.00"}
                        </div>
                        <div className="flex flex-col">
                            <div className="flex text-yellow-400 mb-1">
                                {renderAverageStars(product.average_rate || 0)}
                            </div>
                            <div className="text-sm text-gray-600">
                                ({totalReviews} {t("reviews")})
                            </div>
                        </div>
                    </div>

                    {/* Rating Distribution */}
                    <div className="space-y-3">
                        {[5, 4, 3, 2, 1].map((rating) => (
                            <div key={rating} className="flex items-center gap-3">
                                <div className="flex items-center gap-1 w-16">
                                    <span className="text-sm text-gray-600">{rating}</span>
                                    <FaStar className="text-yellow-400 w-4 h-4" />
                                </div>
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                    <div 
                                        className="bg-orangeColor h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${ratingDistribution[rating as keyof typeof ratingDistribution]}%` }}
                                    />
                                </div>
                                <div className="text-sm text-gray-600 w-10 text-right">
                                    {ratingDistribution[rating as keyof typeof ratingDistribution].toFixed(1)}%
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Review Input - 3/4 on large screens, full width on smaller */}
                <div className="w-full lg:w-2/3">
                    <ReviewForm productId={product.id} />
                </div>
            </div>
        </div>
    );
};

export default ReviewsOverview;
