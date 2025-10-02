import { memo, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { CiShoppingCart } from "react-icons/ci";

const CartIcon = memo(() => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleMouseEnter = useCallback(() => setOpen(true), []);
  const handleMouseLeave = useCallback(() => setOpen(false), []);

  return (
    <div
      className="cursor-pointer relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Icon + Count + Total */}
      <div className="flex items-center gap-6">
        {/* Cart Icon */}
        <div className="relative">
          <CiShoppingCart
            size={24}
            className="text-transition"
            aria-hidden="true"
          />
          <div
            aria-label={t("cart items count")}
            className="absolute -left-4 -top-3 bg-orangeColor  flex items-center justify-center rounded-full w-5 h-5 text-xs font-semibold"
          >
            0
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col">
          <p className="text-xs text-gray-400">{t("cart")}</p>
          <p dir="ltr" className="text-2xl font-bold">
            0 {t("SAR")}
          </p>
        </div>
      </div>

      {/* Dropdown */}
      <div
        role="menu"
        aria-label={t("cart dropdown")}
        className={`absolute top-full left-0 w-[250px] z-30 py-2 px-4 shadow-md bg-background-gray text-start rounded-md transform transition-all duration-300 ease-out 
        ${
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <p>{t("no product in the cart")}</p>
      </div>
    </div>
  );
});

CartIcon.displayName = "CartIcon";

export default CartIcon;
