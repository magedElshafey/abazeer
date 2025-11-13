import { useCallback } from "react";
import { useCart } from "@/store/CartProvider";
import { useTranslation } from "react-i18next";
import type { CartItem } from "../../types/Cart.types";
import { CiTrash } from "react-icons/ci";
import Skeleton from "@/common/components/loader/skeltons/Skeleton";
import SaudiCurrency from "@/common/components/currency/SaudiCurrency";
import { Link } from "react-router-dom";

interface CartCardProps {
  item: CartItem;
}
const CartCard: React.FC<CartCardProps> = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();
  const { t } = useTranslation();
  const handleIncrease = useCallback(
    (id: number, currentQty: number) => {
      if (currentQty + 1 <= item.stock_quantity) {
        updateQuantity(id, currentQty + 1);
      }
    },
    [updateQuantity, item]
  );

  const handleDecrease = useCallback(
    (id: number, currentQty: number) => {
      if (currentQty > 1) updateQuantity(id, currentQty - 1);
    },
    [updateQuantity]
  );

  if (item.isLoading)
    return (
      <div className="max-w-[300px] max-h-[100px] overflow-hidden">
        <Skeleton type="list" />
      </div>
    );

  return (
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
        <Link to={`/products/${item.product_id}`}>
          <p className="font-semibold line-clamp-1 text-orangeColor hover:underline">{item.name}</p>
        </Link>
        <p className="text-gray-500 text-xs">{item.category || t("product")}</p>
        <div className="flex items-center gap-3">
          <p className="text-orangeColor font-semibold text-sm mt-1 flex items-center">
            <p>{item.sale_price || item.price}</p> <SaudiCurrency />
          </p>
          <p className="text-gray-500">* {item?.quantity}</p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-2">
          <button
            aria-describedby={`product-${item.id}`}
            onClick={() => handleDecrease(item.item_id, item.quantity ?? 1)}
            aria-label={t("decrease quantity")}
            className="w-6 h-6 border rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-100"
          >
            −
          </button>
          <span className="text-sm font-medium">{item.quantity ?? 1}</span>
          <button
            aria-describedby={`product-${item.id}`}
            onClick={() => handleIncrease(item.item_id, item.quantity ?? 1)}
            aria-label={t("increase quantity")}
            className="w-6 h-6 border rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </div>

      {/* Remove Button */}
      <button
        aria-describedby={`product-${item.id}`}
        onClick={() => removeFromCart(item.item_id)}
        aria-label={t("remove item")}
        className="text-gray-400 hover:text-red-500 transition-colors p-2"
      >
        <CiTrash size={18} aria-hidden="true" />
      </button>
    </li>
  );
};

export default CartCard;
