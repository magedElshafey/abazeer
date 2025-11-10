import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { memo, useCallback, useMemo } from "react";
import { FaStar } from "react-icons/fa";
import AddToCartButton from "../../../cart/components/button/AddToCartButton";
import { Product } from "../../types/product.types";
import { twMerge } from "tailwind-merge";
import ProductAlertButton from "../product-alert/ProductAlertButton";
import MainBtn from "@/common/components/buttons/MainBtn";
import SaudiCurrency from "@/common/components/currency/SaudiCurrency";

interface ProductListCardProps {
  product: Product;
  className?: string;
}

const ProductListCard: React.FC<ProductListCardProps> = memo(
  ({ product, className }) => {
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
      ? ((product?.sold_quantity || 0) / product.stock_quantity) * 100
      : 0;
    const handleCategoryNavigate = useCallback(() => {
      navigate(`/products?filter-category=${product.category_id}`);
    }, [navigate, product.category_id]);
    return (
      <div
        className={twMerge(
          "border relative group shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden w-full bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orangeColor rounded-lg flex gap-4 p-4",
          className
        )}
        aria-label={`${product.name} - ${product.category}`}
      >
        {/* ✅ Discount badge */}
        {product?.has_discount && product.discount_percentage > 0 && (
          <div
            className="w-16 absolute top-0 left-0 p-1 flex-center bg-orangeColor text-white font-bold z-40 rounded-br-lg"
            aria-label={`${product.discount_percentage}% ${t("discount")}`}
          >
            <p>{Math.ceil(product.discount_percentage)}%</p>
          </div>
        )}

        {/* ✅ Product image */}
        <div className="w-32 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
              onClick={handleNavigate}
            />
          ) : (
            <img
              src="/images/600x600.jpg"
              alt={product.name}
              className="w-full h-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
              onClick={handleNavigate}
            />
          )}
        </div>

        {/* ✅ Right side: Content and Button in column */}
        <div className="flex-1 flex flex-col justify-between gap-3">
          {/* ✅ Product Info */}
          <div>
            <p
              onClick={handleCategoryNavigate}
              className="mb-1 transition-colors duration-200 group-hover:text-orangeColor hover:underline w-fit cursor-pointer font-medium text-xs text-gray-600"
            >
              {product.category}
            </p>

            <button
              onClick={handleNavigate}
              className="mb-2 font-medium text-blue-400 text-base line-clamp-2 cursor-pointer duration-200 hover:underline text-start"
            >
              {product.name}
            </button>

            {/* ✅ Reviews */}
            <div
              className="flex items-center gap-1 mb-2"
              aria-label={`${product.average_rate} out of 5 stars`}
            >
              <div className="flex gap-0.5">{reviewStars}</div>
              <span className="text-sm text-gray-500 ml-1">
                ({product.ratings_count || 0})
              </span>
            </div>

            {/* ✅ Price */}
            <div className="flex items-center gap-3 mb-2">
              <div
                aria-label={`${product.sale_price || product?.price} ${t(
                  "Saudi Riyal"
                )}`}
                className="text-orangeColor text-xl font-bold flex justify-center items-center  gap-1"
              >
                <p> {product.sale_price || +product?.price}</p>
                <SaudiCurrency />
              </div>

              {product?.has_discount && product?.sale_price && (
                <p className="text-gray-500 line-through text-sm flex items-center gap-1">
                  <p>{product.price}</p> <SaudiCurrency />
                </p>
              )}
            </div>

            {/* ✅ Progress bar */}
            <div
              className={`w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-1 ${
                product.stock_quantity == 0 ? "invisible" : ""
              }`}
              aria-label={`Stock remaining: ${product.sold_quantity} of ${product.stock_quantity}`}
            >
              <div
                className="h-full bg-orangeColor transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {product.stock_quantity > 0 ? (
              <p
                className="font-medium text-sm mb-2 text-end"
                aria-live="polite"
              >
                {t("sold")} : {product.sold_quantity || 0} /{" "}
                {product.stock_quantity + (product?.sold_quantity || 0)}
              </p>
            ) : (
              <p className="font-medium text-sm mb-2 text-end">
                {t("not-available")}
              </p>
            )}
          </div>

          {/* ✅ Add to cart button - full width on mobile, fixed width on desktop */}
          <div className="w-full md:w-fit md:self-start">
            {product?.stock_quantity > 0 ? (
              <div className="w-full">
                <AddToCartButton product={product} tabIndex={0} />
              </div>
            ) : (
              <ProductAlertButton productId={product.id}>
                {({ onClick }) => (
                  <MainBtn
                    onClick={onClick}
                    className="sm:!w-fit px-5 text-sm font-normal  rounded-md"
                  >
                    {t("notify me")}
                  </MainBtn>
                )}
              </ProductAlertButton>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default ProductListCard;
