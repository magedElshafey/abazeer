import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FaTrashAlt, FaHeart } from "react-icons/fa";
import AddToCartButton from "@/features/cart/components/button/AddToCartButton";
import useAddFavorite from "@/features/products/api/useAddFavorite";
import useGetFavorites from "../api/favorites/useGetFavorites";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import Loader from "@/common/components/loader/spinner/Loader";
import EmptyStateCard from "./common/EmptyStateCard";

const FavoritesTable: FC = () => {
  const { t } = useTranslation();
  const { mutate: removeFromFavorites, isPending } = useAddFavorite();
  const favoritesQuery = useGetFavorites();

  const handleRemoveFromFavorites = async (productId: number) => {
    removeFromFavorites(productId);
  };

  const formatPrice = (price: string) => {
    return parseFloat(price).toFixed(2);
  };

  const getStockStatus = (stockQuantity: number) => {
    return stockQuantity > 0 ? "in-stock" : "out-of-stock";
  };

  const getStockStatusColor = (stockQuantity: number) => {
    return stockQuantity > 0 ? "text-green-600" : "text-red-600";
  };

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
                <tr
                  key={product.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  {/* Product Column */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col md:flex-row gap-2 justify-start  md:gap-4">
                      <img
                        src={product.image || "/images/400x400.png"}
                        alt={product.name}
                        loading="lazy"
                        className="w-14 h-14 object-contain aspect-square"
                      />

                      <div className="flex flex-col">
                        <Link
                          to={`/products/${product.id}`}
                          className="font-medium text-gray-900 truncate text-sm hover:text-orangeColor transition-colors"
                        >
                          {product.name}
                        </Link>
                        <p className="text-gray-500 text-xs">
                          {t("category")}:{" "}
                          <span className="text-orangeColor">
                            {product.category}
                          </span>
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Unit Price Column */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col text-nowrap">
                      <span className="text-red-600 font-medium">
                        {product.has_discount
                          ? product.sale_price
                          : formatPrice(product.price)}{" "}
                        {t("SAR")}
                      </span>
                      {product.has_discount && (
                        <span className="text-gray-400 text-sm line-through">
                          {formatPrice(product.price)} {t("SAR")}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Stock Status Column */}
                  <td className="py-4 px-6">
                    <span
                      className={`font-medium ${getStockStatusColor(
                        product.stock_quantity
                      )}`}
                    >
                      {t(getStockStatus(product.stock_quantity))}
                    </span>
                  </td>

                  {/* Add to Cart Column */}
                  <td className="py-4 px-6">
                    <div className="text-nowrap">
                      <AddToCartButton product={product} quantity={1} />
                    </div>
                  </td>

                  {/* Remove Column */}
                  <td className="py-4 px-6">
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleRemoveFromFavorites(product.id)}
                        disabled={isPending}
                        className="p-2 text-gray-500 hover:text-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label={t("remove from favorites")}
                        title={t("remove from favorites")}
                      >
                        {isPending ? <Loader /> : <FaTrashAlt size={16} />}
                      </button>
                    </div>
                  </td>
                </tr>
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
