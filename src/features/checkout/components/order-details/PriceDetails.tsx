// import { useTranslation } from "react-i18next";
// interface PriceDetailsProps {
//   method: Shippings;
// }
// import { useCart } from "@/store/CartProvider";
// import { Shippings } from "../../types/shipping.types";
// const PriceDetails: React.FC<PriceDetailsProps> = ({ method }) => {
//   const { t } = useTranslation();
//   const { total } = useCart();
//   const tax = 0.15 * total;

//   return (
//     <ul className="py-3">
//       <li className="flex-between mb-3">
//         <p>{t("subtotal")}</p>
//         <p className="font-medium">
//           {total} {t("SAR")}
//         </p>
//       </li>
//       <li className="flex-between mb-3">
//         <p>{t("Tax (VAT - 10%, Import Tax - 15%)")}</p>
//         <p className="font-medium">
//           {tax} {t("SAR")}
//         </p>
//       </li>
//       <li className="flex-between mb-3">
//         <p>{t("shipping fee")}</p>
//         <p className="font-medium">
//           {method.value} {method?.value !== 0 ? t("SAR") : null}
//         </p>
//       </li>
//       <li className="flex-between">
//         <p>{t("Total")}</p>
//         <p className="font-medium">
//           {tax + total + method?.value} {t("SAR")}
//         </p>
//       </li>
//     </ul>
//   );
// };

// export default PriceDetails;
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useCart } from "@/store/CartProvider";
import type { Shippings } from "../../types/shipping.types";

const PriceDetails: React.FC<{ method: Shippings }> = ({ method }) => {
  const { t } = useTranslation();
  const { total } = useCart();

  const tax = useMemo(() => 0.15 * total, [total]);
  const grandTotal = useMemo(
    () => total + tax + method?.value,
    [total, tax, method?.value]
  );

  return (
    <dl className="text-gray-700">
      <div className="flex-between mb-2">
        <dt>{t("subtotal")}</dt>
        <dd>
          {total} {t("SAR")}
        </dd>
      </div>
      <div className="flex-between mb-2">
        <dt>{t("Tax (VAT - 15%)")}</dt>
        <dd>
          {tax.toFixed()} {t("SAR")}
        </dd>
      </div>
      <div className="flex-between mb-2">
        <dt>{t("shipping fee")}</dt>
        <dd>
          {method?.value} {method?.value !== 0 ? t("SAR") : ""}
        </dd>
      </div>
      <div className="flex-between font-semibold">
        <dt>{t("Total")}</dt>
        <dd>
          {grandTotal.toFixed()} {t("SAR")}
        </dd>
      </div>
    </dl>
  );
};

export default PriceDetails;
