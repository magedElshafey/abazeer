import { memo, useState, useCallback, useEffect, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useCart } from "@/store/CartProvider";
import { CiShoppingCart } from "react-icons/ci";
import i18n from "@/lib/i18n/i18n";
import CartDetails from "@/features/cart/components/details/CartDetails";
const CartIcon = memo(() => {
  const { t } = useTranslation();
  const { items, total } = useCart();
  const cartItems = useMemo(() => items || [], [items]);
  const itemCount = cartItems.length || 0;
  const totalAmount = total ?? "0.00";

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback(() => setOpen(true), []);
  const handleMouseLeave = useCallback(() => setOpen(false), []);
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if ((e.key === "Enter" || e.key === " ") && !open) setOpen(true);
    },
    [open]
  );

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
              className="absolute -left-3 -top-3 bg-orangeColor flex-center w-5 h-5 text-xs "
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
        className={`border-t-transparent top-full ${
          i18n.language === "ar" ? "-right-[280px]" : "-left-[280px]"
        } transition-all duration-300 ease-out transform origin-top absolute border-t-[10px] ${
          open
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
        ref={dropdownRef}
      >
        <div
          // ref={dropdownRef}
          role="menu"
          aria-label={t("cart dropdown")}
          className={`min-w-[340px] bg-white shadow-xl rounded-xl p-4 z-40 border border-gray-100
         `}
        >
          <CartDetails />
        </div>
      </div>
    </div>
  );
});

CartIcon.displayName = "CartIcon";
export default CartIcon;
