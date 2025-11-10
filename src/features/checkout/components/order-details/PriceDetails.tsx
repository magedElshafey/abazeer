import { useTranslation } from "react-i18next";
import { useCart } from "@/store/CartProvider";
import useGetWebsiteSettings from "@/features/settings/api/useGetWebsiteSettings";
import SaudiCurrency from "@/common/components/currency/SaudiCurrency";

const PriceDetails = () => {
  const { t } = useTranslation();
  const {
    total,
    tax,
    shipping,
    subtotal,
    couponCode,
    discount_amount,
    cartQuery: { isFetching },
  } = useCart();

  const { data: settings } = useGetWebsiteSettings();
  return (
    <dl className={`text-gray-700 ${isFetching ? "opacity-40" : ""}`}>
      <div className="flex-between mb-2">
        <dt>{t("subtotal")}</dt>
        <dd className="flex items-center">
          <p> {subtotal.toFixed(2)}</p> <SaudiCurrency />
        </dd>
      </div>
      {couponCode?.value && !!Number(discount_amount) && (
        <div className="flex-between mb-2 text-green-600 font-medium">
          <dt>{t("discount")}</dt>
          <dd className="flex items-center">
            <p> - {Number(discount_amount).toFixed(2)}</p> <SaudiCurrency />
          </dd>
        </div>
      )}
      <div className="flex-between mb-2">
        <dt>{`${t("tax")} ${parseFloat(settings?.tax_rate || "0") * 100}%`}</dt>
        <dd className="flex items-center">
          <span>{Number(tax).toFixed(2)}</span>
          <SaudiCurrency />
        </dd>
      </div>
      <div className="flex-between mb-2">
        <dt>{t("shipping fee")}</dt>
        <dd className="flex items-center">
          <p>{Number(shipping).toFixed(2)}</p> <SaudiCurrency />
        </dd>
      </div>
      <div className="flex-between font-semibold">
        <dt>{t("Total")}</dt>
        <dd className="flex items-center">
          <p>{total}</p> <SaudiCurrency />
        </dd>
      </div>
    </dl>
  );
};

export default PriceDetails;
