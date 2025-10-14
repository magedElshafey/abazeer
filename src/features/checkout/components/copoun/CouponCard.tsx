// import type { Copoun } from "../../types/copoun.type";
// import { useTranslation } from "react-i18next";
// import CouponInput from "./CouponInput";
// interface CouponCardProps {
//   data: Copoun;
// }
// const CouponCard: React.FC<CouponCardProps> = ({ data }) => {
//   const { t } = useTranslation();

//   return (
//     <div className="w-full p-3 rounded-md shadow-md mb-3 border">
//       <p className="text-md font-bold text-orangeColor mb-2">
//         {Number(data?.value)?.toFixed()}{" "}
//         {data?.type_option === "percentage" ? "%" : t("SAR")}
//       </p>
//       <p className="mb-2">{data?.description}</p>
//       <CouponInput code={data?.code} readOnly={true} />
//     </div>
//   );
// };

// export default CouponCard;
import { memo } from "react";
import { useTranslation } from "react-i18next";
import type { Copoun } from "../../types/copoun.type";
import CouponInput from "./CouponInput";

interface CouponCardProps {
  data: Copoun;
}

const CouponCard: React.FC<CouponCardProps> = memo(({ data }) => {
  const { t } = useTranslation();

  const valueLabel =
    data?.type_option === "percentage"
      ? `${Number(data.value).toFixed()}%`
      : `${Number(data.value).toFixed()} ${t("SAR")}`;

  return (
    <li
      className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition-all duration-200"
      aria-label={t("coupon card")}
      tabIndex={0}
    >
      <p
        className="text-lg font-semibold text-orange-500 mb-1"
        aria-label={t("discount value")}
      >
        {valueLabel}
      </p>
      <p
        className="text-gray-700 text-sm mb-3"
        aria-label={t("coupon description")}
      >
        {data.description}
      </p>
      <CouponInput code={data.code} readOnly />
    </li>
  );
});

export default CouponCard;
