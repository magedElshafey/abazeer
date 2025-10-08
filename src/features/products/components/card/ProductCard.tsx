import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { memo, useCallback, useMemo } from "react";
import { FaStar } from "react-icons/fa";
import SquareImage from "../../../../common/components/images/sqaure-image/SqaureImage";
import AddToCartButton from "../../../cart/components/button/AddToCartButton";
import { Product } from "../../types/product.types";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = memo(({ product }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigate = useCallback(() => {
    navigate(`/products/${product.id}`);
  }, [navigate, product.id]);

  const reviewStars = useMemo(() => {
    return Array.from({ length: 5 }, (_, index) => {
      const filled = index < Math.round(product?.average_rate || 0);
      return (
        <FaStar
          key={index}
          className={`transition-colors duration-200 ${
            filled ? "text-yellow-400" : "text-gray-300"
          }`}
          aria-hidden="true"
        />
      );
    });
  }, [product?.average_rate]);

  const progressPercent = product.stock_quantity
    ? Math.min(
        (product.sold_quantity
          ? product?.sold_quantity
          : 0 / product.stock_quantity) * 100,
        100
      )
    : 0;

  return (
    <div
      className="border relative px-6 pt-6 pb-3 group shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden  w-full bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orangeColor text-start"
      aria-label={`${product.name} - ${product.category}`}
    >
      {/* ✅ Discount badge */}
      {product?.has_discount && product.discount_percentage > 0 && (
        <div
          className="w-16 absolute top-0 left-0 p-1 flex-center bg-orangeColor text-white font-bold z-40 rounded-br-lg"
          aria-label={`${product.discount_percentage}% ${t("discount")}`}
        >
          <p>{product.discount_percentage}%</p>
        </div>
      )}

      {/* ✅ Product image */}
      <SquareImage
        src={product.image || "/images/600x600.jpg"}
        alt={product.name}
      />

      {/* ✅ Content */}
      <div className="mt-3 relative">
        <p className="mb-1 transition-colors duration-200 group-hover:text-orangeColor font-medium text-sm text-gray-600">
          {product.category}
        </p>

        <button
          onClick={handleNavigate}
          className="mb-1 font-medium text-blue-400 text-base  line-clamp-1 cursor-pointer duration-200 hover:underline text-start"
        >
          {product.name}
        </button>

        {/* ✅ Reviews */}
        <div
          className="flex items-center gap-1 mb-1"
          aria-label={`${product.average_rate} out of 5 stars`}
        >
          {reviewStars}
          <span className="text-sm text-gray-500 ml-1">
            ({product.ratings_count || 0})
          </span>
        </div>

        {/* ✅ Price */}
        <div className="flex items-center gap-3 mb-2">
          <p
            aria-label={`${product.sale_price || product?.price} ${t(
              "Saudi Riyal"
            )}`}
            className="text-orangeColor text-lg font-bold"
          >
            {product.sale_price || +product?.price} {t("SAR")}
          </p>

          {product?.has_discount && product?.sale_price && (
            <p className="text-gray-500 line-through text-sm">
              {product.sale_price} {t("SAR")}
            </p>
          )}
        </div>

        {/* ✅ Progress bar */}
        <div
          className="w-full h-3 bg-gray-200 overflow-hidden mb-1"
          aria-label={`Stock remaining: ${product.sold_quantity} of ${product.stock_quantity}`}
        >
          <div
            className="h-full bg-orangeColor transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <p className="font-medium text-sm mb-2 text-end" aria-live="polite">
          {t("sold")} : {product.sold_quantity || 0} / {product.stock_quantity}
        </p>

        {/* ✅ Add to cart button with smooth animation */}
        <div
          className="
            lg:translate-y-full 
            lg:opacity-0
            lg:group-hover:translate-y-0 
            lg:group-hover:opacity-100
            lg:transition-all lg:duration-500 
            lg:ease-in-out
            will-change-transform will-change-opacity
          "
        >
          <AddToCartButton product={product} tabIndex={0} />
        </div>
      </div>
    </div>
  );
});

export default ProductCard;
