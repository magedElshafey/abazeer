import { useTranslation } from "react-i18next";
import { CiShoppingCart } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
import { memo, useCallback } from "react";
import { useCart } from "@/store/CartProvider";
import { Product } from "@/features/products/types/product.types";

interface AddToCartButtonProps {
  product: Product;
  tabIndex?: number;
  quantity?: number;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = memo(
  ({ product, quantity = 1, tabIndex = 0 }) => {
    const { t } = useTranslation();
    const { addToCart, removeFromCart, isInCart } = useCart();

    const inCart = isInCart(product.id);

    const handleAddToCart = useCallback(() => {
      addToCart({
        id: product.id,
        name: product.name,
        image: product.image || "",
        price: product.price,
        quantity,
        category: product.category,
        has_discount: product.has_discount,
        discount_percentage: product.discount_percentage,
        average_rate: product.average_rate,
        ratings_count: product.ratings_count,
        stock_quantity: product?.stock_quantity,
        sold_quantity: product?.sold_quantity,
        sale_price: product?.sale_price,
        is_in_wishlist: product.is_in_wishlist,
        item_id: product.id,
        product_id: product.id,
        category_id: product.category_id,
      });
    }, [product, quantity, addToCart]);
    const handleRemoveFromCart = useCallback(() => {
      if(inCart) removeFromCart(inCart?.item_id);
    }, [removeFromCart, inCart]);

    return (
      <button
        onClick={inCart ? handleRemoveFromCart : handleAddToCart}
        tabIndex={tabIndex}
        className={`
        w-full 
        ${
          inCart
            ? "bg-red-500 hover:bg-red-600"
            : "bg-orangeColor hover:bg-orangeColor/90"
        } 
        text-white py-2 px-4 
        flex-center gap-1
        rounded-md
        transition-all duration-300
        active:scale-[0.98]
        focus-visible:outline-none focus-visible:ring-2 
        focus-visible:ring-orange-300
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
        aria-label={
          inCart
            ? `${t("remove from cart")} ${product.name}`
            : `${t("add to cart")} ${product.name}`
        }
        title={inCart ? t("remove from cart") : t("add to cart")}
        type="button"
      >
        <span className="text-sm">
          {inCart ? t("remove from cart") : t("add to cart")}
        </span>
        {inCart ? (
          <FaTrashAlt size={15} aria-hidden="true" focusable="false" />
        ) : (
          <CiShoppingCart size={15} aria-hidden="true" focusable="false" />
        )}
      </button>
    );
  }
);

export default AddToCartButton;
