import { memo, useMemo } from "react";
import { useCart } from "@/store/CartProvider";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import OrderCard from "./OrderCard";
import OrderCardSkeleton from "@/common/components/loader/skeltons/OrderCardSkeleton";

const OrderDetails = memo(() => {
  const { items } = useCart();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const cartQuery = queryClient.getQueryState([apiRoutes.cart]);
  const isLoading = cartQuery?.status === "pending";

  const totalItems = useMemo(() => items?.length ?? 0, [items]);

  return (
    <>
      <header className="border-b pb-3 mb-4">
        <h5 className="font-semibold text-gray-800">
          {t("products")}: {isLoading ? "..." : totalItems}
        </h5>
      </header>

      <ul aria-live="polite">
        {isLoading
          ? Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="mb-5">
                <OrderCardSkeleton />
              </div>
            ))
          : items.map((item) => (
              item.isLoading ? 
              <OrderCardSkeleton />
              :
              <li key={item.id} className="mb-5">
                <OrderCard item={item} />
              </li>
            ))}
      </ul>
    </>
  );
});

export default OrderDetails;
