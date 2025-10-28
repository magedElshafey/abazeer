import { memo, useCallback, useMemo } from "react";
import { useCart } from "@/store/CartProvider";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaStar, FaTrash } from "react-icons/fa";
import type { CartItem } from "@/features/cart/types/Cart.types";

interface OrderCardProps {
  item: CartItem;
}

const OrderCard: React.FC<OrderCardProps> = memo(({ item }) => {
  const { t } = useTranslation();
  const { updateQuantity, removeFromCart } = useCart();

  const reviewStars = useMemo(() => {
    const rate = Math.round(item?.average_rate || 0);
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`transition-colors duration-300 ${
          index < rate ? "text-yellow-400" : "text-gray-300"
        }`}
        aria-hidden="true"
      />
    ));
  }, [item?.average_rate]);

  const handleIncrease = useCallback(
    () => {
      if((item.quantity ?? 1) + 1 <= item.stock_quantity) {
        updateQuantity(item.item_id, (item.quantity ?? 1) + 1);
      }
    },
    [item, updateQuantity]
  );

  const handleDecrease = useCallback(() => {
    if ((item.quantity ?? 1) > 1)
      updateQuantity(item.item_id, (item.quantity ?? 1) - 1);
  }, [item, updateQuantity]);

  const price = item.sale_price ? item.sale_price : item.price;

  const handleRemoveItem = useCallback(() => removeFromCart(item.id), [item, removeFromCart]);

  return (
    <article
      className="w-full bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-2xl p-4 flex flex-col sm:flex-row gap-5 group"
      aria-label={item?.name}
    >
      {/* Product Image */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0">
        <img
          src={item?.image || "/images/400x400.png"}
          alt={item?.name}
          loading="lazy"
          className="w-full h-full object-contain rounded-xl border border-gray-100 bg-gray-50"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-grow gap-2">
        <div className="flex items-center gap-2">
          <Link
            to={`/products/${item?.id}`}
            className="font-semibold text-gray-800 line-clamp-2 cursor-pointer duration-150 group-hover:text-orangeColor group-hover:underline w-fit"
          >
            {item?.name}
          </Link>
          <FaTrash className="text-red-500 cursor-pointer opacity-60 hover:opacity-100 duration-100" onClick={handleRemoveItem} />
        </div>
        {/* Rating */}
        <div
          className="flex items-center gap-1"
          aria-label={`${item.average_rate} out of 5`}
        >
          {reviewStars}
          <span className="text-sm text-gray-500 ml-1">
            ({item.ratings_count || 0})
          </span>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={handleDecrease}
            aria-label={t("decrease quantity")}
            className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center 
                       text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-orange-300 transition"
          >
            −
          </button>
          <span className="text-base font-medium">{item.quantity ?? 1}</span>
          <button
            onClick={handleIncrease}
            aria-label={t("increase quantity")}
            className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center 
                       text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-orange-300 transition"
          >
            +
          </button>
        </div>
      </div>

      {/* Pricing */}
      <div className="flex flex-col justify-between items-end text-right w-full sm:w-auto">
        <p className="text-gray-600 text-sm">{t("Price")}</p>
        <p className="font-semibold text-gray-900">
          {price} {t("SAR")}
        </p>

        <div className="h-[1px] bg-gray-200 my-2 w-full sm:w-20"></div>

        <p className="text-gray-600 text-sm">{t("Total")}</p>
        <p className="font-bold text-orange-600 text-lg">
          {item.subtotal} {t("SAR")}
        </p>
      </div>
    </article>
  );
});

OrderCard.displayName = "OrderCard";
export default OrderCard;
