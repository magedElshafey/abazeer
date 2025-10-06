import { useTranslation } from "react-i18next";
import { CiShoppingCart } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
import { memo, useCallback } from "react";
import { useCart } from "@/store/CartProvider";

interface AddToCartButtonProps {
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
  tabIndex?: number;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = memo(
  ({ product, tabIndex = 0 }) => {
    const { t } = useTranslation();
    const { addToCart, removeFromCart, isInCart } = useCart();

    const inCart = isInCart(product.id);

    const handleAddToCart = useCallback(() => {
      addToCart({
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price_afterDisccount,
        quantity: product.quantity || 1,
      });
    }, [product, addToCart]);

    const handleRemoveFromCart = useCallback(() => {
      removeFromCart(product.id);
    }, [product, removeFromCart]);

    return (
      <button
        onClick={inCart ? handleRemoveFromCart : handleAddToCart}
        tabIndex={tabIndex}
        className={`
        w-full 
        ${
          inCart
            ? "bg-red-500 hover:bg-red-600"
            : "bg-orangeColor hover:bg-orange-300"
        } 
        text-white py-2 px-4 
        flex items-center justify-center gap-2 
        rounded-2xl
        transition-all duration-300
        active:scale-[0.98]
        focus-visible:outline-none focus-visible:ring-2 
        focus-visible:ring-orange-300
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
        aria-label={
          inCart
            ? `${t("remove from cart")} ${product.title}`
            : `${t("add to cart")} ${product.title}`
        }
        title={inCart ? t("remove from cart") : t("add to cart")}
        type="button"
      >
        <span>{inCart ? t("remove from cart") : t("add to cart")}</span>
        {inCart ? (
          <FaTrashAlt size={18} aria-hidden="true" focusable="false" />
        ) : (
          <CiShoppingCart size={18} aria-hidden="true" focusable="false" />
        )}
      </button>
    );
  }
);

export default AddToCartButton;
