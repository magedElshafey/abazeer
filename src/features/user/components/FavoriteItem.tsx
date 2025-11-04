import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import AddToCartButton from "@/features/cart/components/button/AddToCartButton";
import useAddFavorite from "@/features/products/api/useAddFavorite";
import Loader from "@/common/components/loader/spinner/Loader";
import type { Product } from "@/features/products/types/product.types";
import ProductAlertButton from "@/features/products/components/product-alert/ProductAlertButton";
import MainBtn from "@/common/components/buttons/MainBtn";

interface FavoriteItemProps {
  product: Product;
}

const FavoriteItem: FC<FavoriteItemProps> = ({ product }) => {
  const { t } = useTranslation();
  const { mutate: removeFromFavorites, isPending } = useAddFavorite();

  const handleRemoveFromFavorites = () => {
    removeFromFavorites(product.id);
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
    <tr className="border-b hover:bg-gray-50 transition-colors">
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
              <span className="text-orangeColor">{product.category}</span>
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
          {product.stock_quantity > 0 ? (
            <AddToCartButton product={product} quantity={1} />
          ) : (
            <ProductAlertButton productId={product.id}>
              {({ onClick, isPending }) => (
                <MainBtn
                  isPending={isPending}
                  onClick={onClick}
                  className="flex-center sm:!w-full py-1 bg-orangeColor !font-normal text-white rounded-md"
                >
                  {t("notify me")}
                </MainBtn>
              )}
            </ProductAlertButton>
          )}
        </div>
      </td>

      {/* Remove Column */}
      <td className="py-4 px-6">
        <div className="flex justify-center">
          <button
            onClick={handleRemoveFromFavorites}
            disabled={isPending}
            className="p-2 text-red-500/60 hover:text-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={t("remove from favorites")}
            title={t("remove from favorites")}
          >
            {isPending ? <Loader /> : <FaTrashAlt size={16} />}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default FavoriteItem;
