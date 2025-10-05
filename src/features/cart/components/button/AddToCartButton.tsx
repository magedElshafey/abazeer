import { useTranslation } from "react-i18next";
import { CiShoppingCart } from "react-icons/ci";
import { memo } from "react";

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

    const handleAddToCart = () => {
      console.log("Add to cart:", product.id);
    };

    return (
      <button
        onClick={handleAddToCart}
        tabIndex={tabIndex}
        className="
          w-full bg-orangeColor 
          py-2 px-4 
          flex items-center justify-center gap-2 
          
          transition-all duration-300
          hover:bg-orange-300 active:scale-[0.98]
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300
          disabled:opacity-50 disabled:cursor-not-allowed
        "
        aria-label={`${t("add to cart")} ${product.title}`}
        title={t("add to cart") || "Add to cart"}
        type="button"
      >
        <span>{t("add to cart")}</span>
        <CiShoppingCart size={20} aria-hidden="true" focusable="false" />
      </button>
    );
  }
);

export default AddToCartButton;
