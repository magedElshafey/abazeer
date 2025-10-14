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
  const { items, total } = useCart();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const cartQuery = queryClient.getQueryState([apiRoutes.cart]);
  const isLoading = cartQuery?.status === "pending";
  const showSkeleton = isLoading || !items || items.length === 0;
  const [method, setMethod] = useState<Shippings>(shippingMethods[0]);
  const tax = 0.15 * total;
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

      <div className="py-3 border-b">
        <h5 className="mb-4">{t("shipping methods")}</h5>
        <ShippingMethods method={method} setMethod={setMethod} />
      </div>
      <div className="py-3">
        <div className="flex-between mb-3">
          <p>{t("subtotal")}</p>
          <p className="font-medium">
            {total} {t("SAR")}
          </p>
        </div>
        <div className="flex-between mb-3">
          <p>{t("Tax (VAT - 10%, Import Tax - 15%)")}</p>
          <p className="font-medium">
            {tax} {t("SAR")}
          </p>
        </div>
        <div className="flex-between mb-3">
          <p>{t("shipping fee")}</p>
          <p className="font-medium">
            {method.value} {method?.value !== 0 ? t("SAR") : null}
          </p>
        </div>
        <div className="flex-between">
          <p>{t("Total")}</p>
          <p className="font-medium">
            {tax + total + method?.value} {t("SAR")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
