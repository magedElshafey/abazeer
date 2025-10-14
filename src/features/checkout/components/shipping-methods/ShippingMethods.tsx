// import { Shippings } from "../../types/shipping.types";
// import { shippingMethods } from "@/data/data";
// import { useTranslation } from "react-i18next";
// interface ShippingMethodsProps {
//   method: Shippings;
//   setMethod: React.Dispatch<React.SetStateAction<Shippings>>;
// }
// const ShippingMethods: React.FC<ShippingMethodsProps> = ({
//   method,
//   setMethod,
// }) => {
//   const { t } = useTranslation();
//   return (
//     <ul>
//       {shippingMethods?.map((item) => (
//         <li
//           key={item?.id}
//           className={`cursor-pointer w-full flex items-center gap-3 rounded-lg p-4 mb-5 duration-300 border hover:border-blue-600 ${
//             method?.id === item?.id ? "border-blue-600" : ""
//           }`}
//           onClick={() => setMethod(item)}
//         >
//           <div
//             className={`w-5 h-5 duration-300 rounded-[50%] border ${
//               method?.id === item?.id ? "bg-blue-600" : "bg-white"
//             } `}
//           ></div>
//           <p>
//             {t(item?.name)} -{" "}
//             {item?.id === 1 ? t(item.coastLabel) : item.coastLabel}{" "}
//             {item?.id !== 1 ? t("SAR") : null}
//           </p>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default ShippingMethods;
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { shippingMethods } from "@/data/data";
import type { Shippings } from "../../types/shipping.types";

interface Props {
  method: Shippings;
  setMethod: React.Dispatch<React.SetStateAction<Shippings>>;
}

const ShippingMethods: React.FC<Props> = memo(({ method, setMethod }) => {
  const { t } = useTranslation();

  return (
    <ul role="radiogroup" aria-label={t("shipping methods")}>
      {shippingMethods.map((item) => {
        const isActive = method?.id === item?.id;
        return (
          <li
            key={item.id}
            role="radio"
            aria-checked={isActive}
            tabIndex={0}
            onClick={() => setMethod(item)}
            onKeyDown={(e) => e.key === "Enter" && setMethod(item)}
            className={`cursor-pointer flex items-center gap-3 rounded-lg p-4 mb-4 border transition-all duration-200 ${
              isActive
                ? "border-orangeColor bg-orangeColor/20"
                : "hover:border-orangeColor"
            }`}
          >
            <div
              className={`w-5 h-5 border-2 rounded-full transition-colors ${
                isActive
                  ? "bg-orangeColor border-orangeColor"
                  : "border-gray-400"
              }`}
            />
            <span>
              {t(item.name)} – {item.coastLabel} {item.id !== 1 && t("SAR")}
            </span>
          </li>
        );
      })}
    </ul>
  );
});

export default ShippingMethods;
