import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/store/CartProvider";
import { toast } from "sonner";
import CartCard from "../card/CartCard";

const CartDetails = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  console.log("total", typeof total);
  const cartItems = useMemo(() => items || [], [items]);
  const itemCount = cartItems.length || 0;
  const totalAmount = total ?? "0.00";
  const handleGoToCart = useCallback(() => {
    navigate("/cart");
  }, [navigate]);

  const handleClearCart = useCallback(() => {
    toast(t("Are you sure you want to clear the cart?"), {
      description: t("This action cannot be undone."),
      action: {
        label: t("Clear"),
        onClick: () => {
          clearCart();
        },
      },
      cancel: {
        label: t("Cancel"),
        onClick: () => console.log("canceld"),
      },
      duration: 6000,
    });
  }, [clearCart, t]);
  return (
    <>
      {itemCount > 0 ? (
        <>
          <ul className="space-y-3 max-h-96 overflow-y-auto" role="list">
            {cartItems.map((item) => (
              <CartCard key={item?.id} item={item} />
            ))}
          </ul>

          {/* Divider */}
          <hr className="my-3 border-gray-200" />

          {/* Total + Actions */}
          <div className="flex items-center justify-between mt-3">
            <p className="text-sm text-gray-600 font-medium">
              {t("total")} :
              <span className="text-lg font-bold text-orangeColor ml-1">
                {totalAmount} {t("SAR")}
              </span>
            </p>
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={handleClearCart}
              className="bg-red-600 text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-red-800 transition-all focus:ring-2 focus:ring-red-300 focus:outline-none"
            >
              {t("clear cart")}
            </button>

            <button
              onClick={handleGoToCart}
              className="bg-orangeColor text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-orange-500 transition-all focus:ring-2 focus:ring-orange-300 focus:outline-none"
            >
              {t("checkout")}
            </button>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500 py-8">
          <p aria-live="polite">{t("no product in the cart")}</p>
        </div>
      )}
    </>
  );
};

export default CartDetails;
