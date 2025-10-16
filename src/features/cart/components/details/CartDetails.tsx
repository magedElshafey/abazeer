import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/store/CartProvider";
import { toast } from "sonner";
import CartCard from "../card/CartCard";
import { useAuth } from "@/store/AuthProvider";
interface CartDetailsProps {
  onClose?: () => void;
}
const CartDetails: React.FC<CartDetailsProps> = ({ onClose = undefined }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, total, clearCart } = useCart();
  const cartItems = useMemo(() => items || [], [items]);
  const itemCount = cartItems.length || 0;
  const totalAmount = total ?? "0.00";
  const handleGoToCart = useCallback(() => {
    navigate(user ? "/checkout" : "/auth/login");
    if (onClose) {
      onClose();
    }
  }, [navigate, user, onClose]);

  const handleClearCart = useCallback(() => {
    toast(t("Are you sure you want to clear the cart?"), {
      description: t("This action cannot be undone."),
      action: {
        label: t("Clear"),
        onClick: () => {
          clearCart();
          if (onClose) {
            onClose();
          }
        },
      },
      cancel: {
        label: t("Cancel"),
        onClick: () => {
          if (onClose) {
            onClose();
          } else {
            console.log("canceled");
          }
        },
      },
      duration: 6000,
    });
  }, [clearCart, t, onClose]);
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
