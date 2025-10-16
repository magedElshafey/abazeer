import { FC } from "react";
import { useTranslation } from "react-i18next";
import { MdRateReview } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import EmptyStateCard from "../components/common/EmptyStateCard";
import useGetUserReviews from "../api/reviews/useGetUserReviews";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import SettingsCard from "../components/settings/SettingsCard";
import ReviewCard from "../components/reviews/ReviewCard";
import MainBtn from "@/common/components/buttons/MainBtn";
import ListSkeleton from "@/common/components/loader/skeltons/ListSkeleton";

const Reviews: FC = () => {
  const { t } = useTranslation();
  const reviewsQuery = useGetUserReviews();
  const reviews = (reviewsQuery.data?.pages || []).flatMap((page) => page.data);

  return (
    <SettingsCard
      title="reviews"
      description="my_reviews_description"
      icon={FaStar}
      iconBgColor="bg-blue-100"
      iconColor="text-blue-600"
    >
      <FetchHandler
        queryResult={reviewsQuery}
        skeletonType="list"
        loadingType="skeleton"
      >
        {reviews && reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}

            {/* Load More Button */}
            {reviewsQuery.isFetchingNextPage && <ListSkeleton />}

            {reviewsQuery.hasNextPage && !reviewsQuery.isFetchingNextPage && (
              <div className="py-10 flex-center">
                <MainBtn
                  onClick={() => {
                    reviewsQuery.fetchNextPage();
                  }}
                >
                  {t("load more")}
                </MainBtn>
              </div>
            )}
          </div>
        ) : (
          <EmptyStateCard
            icon={MdRateReview}
            link="/products"
            buttonText={t("browse_products")}
            title={t("no_reviews_title")}
            description={t("no_reviews_description")}
          />
        )}
      </FetchHandler>
    </SettingsCard>
  );
};

export default Reviews;
