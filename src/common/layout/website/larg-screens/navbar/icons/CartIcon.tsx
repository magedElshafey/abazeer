import { memo, useState, useCallback, useMemo, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { CiShoppingCart, CiTrash } from "react-icons/ci";
import i18n from "@/lib/i18n/i18n";
import { useCart } from "@/store/CartProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
const CartIcon = memo(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { items, total, removeFromCart, updateQuantity, clearCart } = useCart();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const cartItems = useMemo(() => items || [], [items]);
  const itemCount = cartItems.length || 0;
  const totalAmount = total?.toFixed(2) ?? "0.00";

  const handleMouseEnter = useCallback(() => setOpen(true), []);
  const handleMouseLeave = useCallback(() => setOpen(false), []);
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  }, []);

  const handleGoToCart = useCallback(() => {
    setOpen(false);
    navigate("/cart");
  }, [navigate]);

  const handleIncrease = useCallback(
    (id: number, currentQty: number) => updateQuantity(id, currentQty + 1),
    [updateQuantity]
  );

  const handleDecrease = useCallback(
    (id: number, currentQty: number) => {
      if (currentQty > 1) updateQuantity(id, currentQty - 1);
    },
    [updateQuantity]
  );

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

  useEffect(() => {
    if (open) document.addEventListener("keydown", handleKeyDown);
    else document.removeEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, handleKeyDown]);

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Icon + Total */}
      <button
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t("cart")}
        className="flex items-center gap-4 focus:outline-none focus:ring-2 focus:ring-orangeColor rounded-md transition-all"
      >
        <div className="relative">
          <CiShoppingCart
            size={26}
            className="text-gray-700"
            aria-hidden="true"
          />
          {itemCount > 0 && (
            <span
              aria-label={t("cart items count")}
              className="absolute -right-2 -top-2 bg-orangeColor flex-center w-5 h-5 text-xs "
            >
              {itemCount}
            </span>
          )}
        </div>

        <div className="flex flex-col items-start text-start">
          <p className="text-xs text-gray-400">{t("cart")}</p>
          <p dir="ltr" className="text-lg font-bold text-gray-800">
            {totalAmount} {t("SAR")}
          </p>
        </div>
      </button>

      {/* Dropdown */}
      <div
        ref={dropdownRef}
        role="menu"
        aria-label={t("cart dropdown")}
        className={`absolute top-full ${
          i18n.language === "ar" ? "-right-[280px]" : "-left-[280px]"
        } min-w-[340px] bg-white shadow-xl rounded-xl p-4 mt-3 z-40 border border-gray-100
        transition-all duration-300 ease-out transform origin-top ${
          open
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {itemCount > 0 ? (
          <>
            <ul className="space-y-3 max-h-96 overflow-y-auto" role="list">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  role="menuitem"
                  tabIndex={0}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-all"
                >
                  {/* Product Image */}
                  <img
                    src={item.image || "/images/600x600.jpg"}
                    alt={item.name}
                    loading="lazy"
                    className="w-16 h-16 object-contain rounded-md bg-gray-50 flex-shrink-0"
                  />

                  {/* Product Details */}
                  <div className="flex flex-col flex-1 text-sm text-gray-700">
                    <p className="font-semibold line-clamp-1">{item.name}</p>
                    <p className="text-gray-500 text-xs">
                      {item.category || t("product")}
                    </p>
                    <p className="text-orangeColor font-semibold text-sm mt-1">
                      {item.sale_price || item.price} {t("SAR")}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          handleDecrease(item.id, item.quantity ?? 1)
                        }
                        aria-label={t("decrease quantity")}
                        className="w-6 h-6 border rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-100"
                      >
                        −
                      </button>
                      <span className="text-sm font-medium">
                        {item.quantity ?? 1}
                      </span>
                      <button
                        onClick={() =>
                          handleIncrease(item.id, item.quantity ?? 1)
                        }
                        aria-label={t("increase quantity")}
                        className="w-6 h-6 border rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    aria-label={t("remove item")}
                    className="text-gray-400 hover:text-red-500 transition-colors p-2"
                  >
                    <CiTrash size={18} aria-hidden="true" />
                  </button>
                </li>
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
            <p>{t("no product in the cart")}</p>
          </div>
        )}
      </div>
    </div>
  );
});

CartIcon.displayName = "CartIcon";
export default CartIcon;
