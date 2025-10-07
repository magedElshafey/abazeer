import { memo, useState, useCallback, useMemo, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { CiShoppingCart } from "react-icons/ci";
import i18n from "@/lib/i18n/i18n";
import { useCart } from "@/store/CartProvider";

const CartIcon = memo(() => {
  const { items, total } = useCart();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ✅ Memoized cart items
  const cartItems = useMemo(() => items || [], [items]);
  const itemCount = cartItems.length || 0;
  const totalAmount = total?.toFixed(2) ?? "0.00";

  const handleMouseEnter = useCallback(() => setOpen(true), []);
  const handleMouseLeave = useCallback(() => setOpen(false), []);
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  }, []);

  // ✅ Close on Escape key
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
      {/* Icon + Count + Total */}
      <button
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t("cart")}
        className="flex items-center gap-4 focus:outline-none focus:ring-2 focus:ring-orangeColor rounded-md transition-all"
      >
        {/* Cart Icon */}
        <div className="relative">
          <CiShoppingCart
            size={26}
            className="text-gray-700"
            aria-hidden="true"
          />
          {itemCount > 0 && (
            <span
              aria-label={t("cart items count")}
              className="absolute -right-2 -top-2 bg-orangeColor text-white flex items-center justify-center rounded-full w-5 h-5 text-xs font-semibold"
            >
              {itemCount}
            </span>
          )}
        </div>

        {/* Text */}
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
          i18n.language === "ar" ? "right-0" : "left-0"
        } min-w-[280px] bg-white shadow-lg rounded-xl p-4 mt-3 z-40 border border-gray-100
        transition-all duration-300 ease-out transform origin-top ${
          open
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {itemCount > 0 ? (
          <ul className="space-y-3 max-h-80 overflow-y-auto">
            {cartItems.map((item) => (
              <li
                key={item?.id}
                role="menuitem"
                tabIndex={0}
                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition"
              >
                <img
                  src={item?.image || "/placeholder.png"}
                  alt={item?.name || t("product")}
                  className="w-12 h-12 object-contain rounded-md bg-gray-50"
                  loading="lazy"
                />
                <div className="flex flex-col flex-1 text-sm">
                  <p className="font-semibold text-gray-700 line-clamp-1">
                    {item?.name}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {item?.price?.toFixed(2)} {t("SAR")} × {item?.quantity ?? 1}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-gray-500 py-6">
            <p>{t("no product in the cart")}</p>
          </div>
        )}
      </div>
    </div>
  );
});

CartIcon.displayName = "CartIcon";

export default CartIcon;
