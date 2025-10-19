import { FC } from "react";
import { useTranslation } from "react-i18next";
import { FaHeart } from "react-icons/fa";
import useGetFavorites from "../api/favorites/useGetFavorites";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import EmptyStateCard from "./common/EmptyStateCard";
import FavoriteItem from "./FavoriteItem";

const FavoritesTable: FC = () => {
  const { t } = useTranslation();
  const favoritesQuery = useGetFavorites();

  return (
    <FetchHandler
      queryResult={favoritesQuery}
      skeletonType="table"
      loadingType="skeleton"
    >
      {favoritesQuery.data && (favoritesQuery.data || []).length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-start py-4 px-6 font-medium text-gray-700">
                  {t("product")}
                </th>
                <th className="text-start py-4 px-6 font-medium text-gray-700">
                  {t("price")}
                </th>
                <th className="text-start py-4 px-6 font-medium text-gray-700">
                  {t("availability")}
                </th>
                <th className="text-center py-4 px-6 font-medium text-gray-700" />
                <th className="text-center py-4 px-6 font-medium text-gray-700" />
              </tr>
            </thead>
            <tbody>
              {(favoritesQuery?.data || []).map((product) => (
                <FavoriteItem key={product.id} product={product} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyStateCard
          icon={FaHeart}
          link="/"
          buttonText={t("browse_products")}
          title={t("no_favorites_title")}
          description={t("no_favorites_description")}
        />
      )}
    </FetchHandler>
  );
};

export default FavoritesTable;
