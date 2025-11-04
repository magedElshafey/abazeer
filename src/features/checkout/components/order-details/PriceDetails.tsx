import { useTranslation } from "react-i18next";
import { useCart } from "@/store/CartProvider";

const PriceDetails = () => {
  const { t } = useTranslation();
  const { total, tax, shipping, subtotal, couponCode } = useCart();

  return (
    <dl className="text-gray-700">
      <div className="flex-between mb-2">
        <dt>{t("subtotal")}</dt>
        <dd>
          {subtotal} {t("SAR")}
        </dd>
      </div>
      <div className="flex-between mb-2">
        <dt>{t("Tax (VAT - 15%)")}</dt>
        <dd>
          {tax} {t("SAR")}
        </dd>
      </div>
      <div className="flex-between mb-2">
        <dt>{t("shipping fee")}</dt>
        <dd>{shipping}</dd>
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
