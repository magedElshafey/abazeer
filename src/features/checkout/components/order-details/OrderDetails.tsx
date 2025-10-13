import { useState } from "react";
import { useCart } from "@/store/CartProvider";
import { useTranslation } from "react-i18next";
import OrderCard from "./OrderCard";
import ShippingMethods from "../shipping-methods/ShippingMethods";
import OrderCardSkeleton from "@/common/components/loader/skeltons/OrderCardSkeleton";
import { useQueryClient } from "@tanstack/react-query";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { shippingMethods } from "@/data/data";
import { Shippings } from "../../types/shipping.types";

const OrderDetails = () => {
  const { items } = useCart();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const cartQuery = queryClient.getQueryState([apiRoutes.cart]);
  const isLoading = cartQuery?.status === "pending";
  const showSkeleton = isLoading || !items || items.length === 0;
  const [method, setMethod] = useState<Shippings>(shippingMethods[0]);

  return (
    <div className="w-full bg-slate-100 py-3 px-5">
      <div className="pb-3 border-b">
        <h5 className="mb-4">
          {t("products")} : {showSkeleton ? "..." : items?.length ?? 0}
        </h5>
        <ul>
          {showSkeleton ? (
            <>
              <div className="mb-5">
                <OrderCardSkeleton />
              </div>
              <div className="mb-5">
                <OrderCardSkeleton />
              </div>
              <div className="mb-5">
                <OrderCardSkeleton />
              </div>
            </>
          ) : (
            items?.map((item) => (
              <div className="mb-5" key={item?.id}>
                <OrderCard item={item} />
              </div>
            ))
          )}
        </ul>
      </div>

      <div className="py-3">
        <h5 className="mb-4">{t("shipping methods")}</h5>
        <ShippingMethods method={method} setMethod={setMethod} />
      </div>
    </div>
  );
};

export default OrderDetails;
