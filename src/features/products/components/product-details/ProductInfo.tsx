import { FC } from "react";
import { Link } from "react-router-dom";
import ProductRate from "./ProductRate";
import { useTranslation } from "react-i18next";
import MainBtn from "../../../../common/components/buttons/MainBtn";
import ProductQuantity from "./ProductQuantity";
import AddToCartButton from "@/features/cart/components/button/AddToCartButton";
import { ProductDetails } from "../../types/product.types";
import HtmlConverter from "../../../../common/components/htmlConverter/HtmlConverter";
import FavoriteButton from "./FavoriteButton";

import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/store/CartProvider";
type Props = {
  product: ProductDetails;
};

const ProductInfo: FC<Props> = ({ product }) => {
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const handleBuyNow = useCallback(() => {
    addToCart({
      id: product.id,
      name: product.name,
      image: product.image || "",
      price: product.price,
      quantity: 1,
      category: product.category?.name,
      has_discount: product.has_discount,
      discount_percentage: product.discount_percentage,
      average_rate: product.average_rate,
      ratings_count: product.ratings_count,
      stock_quantity: product.stock_quantity,
      sold_quantity: product.sold_quantity,
      sale_price: product.sale_price,
      is_in_wishlist: product.is_in_wishlist
    });

    navigate("/checkout");
  }, [addToCart, navigate, product]);
  return (
    <div className="px-2 flex flex-col gap-4">
      <div className="border-b pb-4">
        <p className="text-inherit text-xl mb-2 text-wrap">{product?.name}</p>
        <ProductRate
          rating={product?.average_rate}
          reviewCount={product?.reviews.length}
        />
      </div>
      <div>
        <p className="inline text-2xl font-bold text-text-darkRed">
          {product.has_discount ? product.sale_price : product.price} {t("SAR")}
        </p>
        <span className="invisible">place</span>
        {product?.has_discount && (
          <p className="inline text-lg font-bold text-text-gray opacity-60 line-through">
            {product?.price} {t("SAR")}
          </p>
        )}
      </div>
      <div className="appearance-auto">
        <HtmlConverter html={product?.description} />
      </div>
      <div
        className={`text-sm w-fit flex items-center gap-4 rounded border py-1 px-2 ${
          product?.stock_status === "in_stock"
            ? "bg-background-green/20 border-background-green"
            : "bg-red-50 border-red-300"
        }`}
      >
        <p>{t("availability")}</p>
        <p
          className={
            product?.stock_status === "in_stock"
              ? "text-background-green"
              : "text-red-600"
          }
        >
          {product?.stock_quantity} {t("currently available")}
        </p>
      </div>
      <div>
        <p>{t("quantity")}</p>
        <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-2 mt-1">
          <ProductQuantity
            className="w-full"
            maxQuantity={product?.stock_quantity}
            onQuantityChange={setQuantity}
          />
          <AddToCartButton
            product={{ ...product, category: product?.category?.name }}
            quantity={quantity}
          />
          <MainBtn
            onClick={handleBuyNow}
            className="w-full py-1"
            theme="secondary"
          >
            {t("buy_now")}
          </MainBtn>
        </div>
      </div>
      <div className="flex items-center gap-5 pb-4 border-b">
        <FavoriteButton
          productId={product.id}
          isInWishlist={product.is_in_wishlist}
        />
      </div>

      {/* Product Metadata Section */}
      <div className="space-y-3">
        {/* Brand */}
        {product?.brand && (
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-700 me-2">
              {t("brand")}:
            </span>
            <Link
              to={`/products?brand=${product?.brand.id}`}
              className="text-gray-600 hover:text-orangeColor hover:underline transition-colors duration-200"
            >
              {product?.brand.name}
            </Link>
          </div>
        )}

        {/* Category */}
        {product?.category && (
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-700 me-2">
              {t("category")}:
            </span>
            <Link
              to={`/products?category=${product?.category.id}`}
              className="text-gray-600 hover:text-orangeColor hover:underline transition-colors duration-200"
            >
              {product?.category.name}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
