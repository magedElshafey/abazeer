import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { memo, useCallback, useMemo } from "react";
import { FaStar } from "react-icons/fa";
import SquareImage from "../../../../common/components/images/sqaure-image/SqaureImage";
import AddToCartButton from "../../../cart/components/button/AddToCartButton";

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    category: string;
    image: string;
    reviews: {
      avg: number;
      total: number;
    };
    quantity: number;
    remaining: number;
    price_before_disccount: number;
    price_afterDisccount: number;
    disccount_percentage: number;
  };
}

const ProductCard: React.FC<ProductCardProps> = memo(({ product }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigate = useCallback(() => {
    navigate(`/products/${product.id}`);
  }, [navigate, product.id]);

  const reviewStars = useMemo(() => {
    return Array.from({ length: 5 }, (_, index) => {
      const filled = index < Math.round(product?.reviews?.avg || 0);
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
  }, [product?.reviews?.avg]);

  const progressPercent = product.quantity
    ? Math.min((product.remaining / product.quantity) * 100, 100)
    : 0;

  return (
    <button
      onClick={handleNavigate}
      className="border relative p-6 group shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden  w-full bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orangeColor text-start"
      aria-label={`${product.title} - ${product.category}`}
    >
      {/* ✅ Discount badge */}
      {product.disccount_percentage > 0 && (
        <div
          className="w-16 absolute top-0 left-0 p-1 flex-center bg-orangeColor text-white font-bold z-40 rounded-br-lg"
          aria-label={`${product.disccount_percentage}% ${t("discount")}`}
        >
          <p>{product.disccount_percentage}%</p>
        </div>
      )}

      {/* ✅ Product image */}
      <SquareImage src={product.image} alt={product.title} />

      {/* ✅ Content */}
      <div className="mt-3 relative">
        <p className="mb-1 transition-colors duration-200 group-hover:text-orangeColor font-medium text-sm text-gray-600">
          {product.category}
        </p>

        <p className="mb-1 font-semibold text-blue-400 text-base line-clamp-1 text-balance">
          {product.title}
        </p>

        {/* ✅ Reviews */}
        <div
          className="flex items-center gap-1 mb-1"
          aria-label={`${product.reviews.avg} out of 5 stars`}
        >
          {reviewStars}
          <span className="text-sm text-gray-500 ml-1">
            ({product.reviews.total || 0})
          </span>
        </div>

        {/* ✅ Price */}
        <div className="flex items-center gap-3 mb-2">
          <p
            aria-label={`${product.price_afterDisccount} ${t("Saudi Riyal")}`}
            className="text-red-600 text-lg font-bold"
          >
            {product.price_afterDisccount} {t("SAR")}
          </p>

          {product.price_before_disccount > product.price_afterDisccount && (
            <p className="text-gray-500 line-through text-sm">
              {product.price_before_disccount} {t("SAR")}
            </p>
          )}
        </div>

        {/* ✅ Progress bar */}
        <div
          className="w-full h-3 bg-gray-200 overflow-hidden mb-1"
          aria-label={`Stock remaining: ${product.remaining} of ${product.quantity}`}
        >
          <div
            className="h-full bg-orangeColor transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <p className="font-medium text-sm mb-3 text-end" aria-live="polite">
          {t("sold")} : {product.remaining} / {product.quantity}
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
    </button>
  );
});

export default ProductCard;
