import { useTranslation } from "react-i18next";
import { useCart } from "@/store/CartProvider";

const PriceDetails = () => {
  const { t } = useTranslation();
  const { total, tax, shipping, subtotal, couponCode, discount_amount } =
    useCart();

  return (
    <dl className="text-gray-700">
      <div className="flex-between mb-2">
        <dt>{t("subtotal")}</dt>
        <dd>
          {subtotal.toFixed(2)} {t("SAR")}
        </dd>
      </div>
      {couponCode?.value && discount_amount && (
        <div className="flex-between mb-2 text-green-600 font-medium">
          <dt>{t("discount")}</dt>
          <dd>
            - {Number(discount_amount).toFixed(2)} {t("SAR")}
          </dd>
        </div>
      )}
      <div className="flex-between mb-2">
        <dt>{t("Tax (VAT - 15%)")}</dt>
        <dd>
          {Number(tax).toFixed(2)} {t("SAR")}
        </dd>
      </div>
      <div className="flex-between mb-2">
        <dt>{t("shipping fee")}</dt>
        <dd>
          {Number(shipping).toFixed(2)} {t("SAR")}
        </dd>
      </div>
      <div className="flex-between font-semibold">
        <dt>{t("Total")}</dt>
        <dd>
          {total} {t("SAR")}
        </dd>
      </div>
    </dl>
  );
};

export default PriceDetails;
