// import { useState } from "react";
// import { useCart } from "@/store/CartProvider";
// import { useTranslation } from "react-i18next";
// import OrderCard from "./OrderCard";
// import ShippingMethods from "../shipping-methods/ShippingMethods";
// import OrderCardSkeleton from "@/common/components/loader/skeltons/OrderCardSkeleton";
// import { useQueryClient } from "@tanstack/react-query";
// import { apiRoutes } from "@/services/api-routes/apiRoutes";
// import { shippingMethods } from "@/data/data";
// import { Shippings } from "../../types/shipping.types";
// import PriceDetails from "./PriceDetails";

// const OrderDetails = () => {
//   const { items } = useCart();
//   const { t } = useTranslation();
//   const queryClient = useQueryClient();

//   const cartQuery = queryClient.getQueryState([apiRoutes.cart]);
//   const isLoading = cartQuery?.status === "pending";
//   const showSkeleton = isLoading || !items || items.length === 0;
//   const [method, setMethod] = useState<Shippings>(shippingMethods[0]);
//   return (
//     <div className="w-full bg-slate-100 py-3 px-5">
//       <div className="pb-3 border-b">
//         <h5 className="mb-4">
//           {t("products")} : {showSkeleton ? "..." : items?.length ?? 0}
//         </h5>
//         <ul>
//           {showSkeleton ? (
//             <>
//               <div className="mb-5">
//                 <OrderCardSkeleton />
//               </div>
//               <div className="mb-5">
//                 <OrderCardSkeleton />
//               </div>
//               <div className="mb-5">
//                 <OrderCardSkeleton />
//               </div>
//             </>
//           ) : (
//             items?.map((item) => (
//               <div className="mb-5" key={item?.id}>
//                 <OrderCard item={item} />
//               </div>
//             ))
//           )}
//         </ul>
//       </div>

//       <div className="py-3 border-b">
//         <h5 className="mb-4">{t("shipping methods")}</h5>
//         <ShippingMethods method={method} setMethod={setMethod} />
//       </div>
//       <PriceDetails method={method} />
//     </div>
//   );
// };

// export default OrderDetails;
import { memo, useState, useMemo } from "react";
import { useCart } from "@/store/CartProvider";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import OrderCard from "./OrderCard";
import OrderCardSkeleton from "@/common/components/loader/skeltons/OrderCardSkeleton";
import ShippingMethods from "../shipping-methods/ShippingMethods";
import PriceDetails from "./PriceDetails";
import { shippingMethods } from "@/data/data";
import type { Shippings } from "../../types/shipping.types";

const OrderDetails = memo(() => {
  const { items } = useCart();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const cartQuery = queryClient.getQueryState([apiRoutes.cart]);
  const isLoading = cartQuery?.status === "pending";

  const [method, setMethod] = useState<Shippings>(shippingMethods[0]);

  const totalItems = useMemo(() => items?.length ?? 0, [items]);

  return (
    <div
      className="bg-slate-100 p-5 rounded-xl shadow-sm"
      aria-label={t("order details")}
    >
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
              <li key={item.id} className="mb-5">
                <OrderCard item={item} />
              </li>
            ))}
      </ul>

      <section className="py-4 border-t border-b mt-4">
        <h5 className="font-semibold mb-3">{t("shipping methods")}</h5>
        <ShippingMethods method={method} setMethod={setMethod} />
      </section>

      <footer className="pt-4">
        <PriceDetails method={method} />
      </footer>
    </div>
  );
});

export default OrderDetails;
