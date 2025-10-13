import { Shippings } from "../../types/shipping.types";
import { shippingMethods } from "@/data/data";
import { useTranslation } from "react-i18next";
interface ShippingMethodsProps {
  method: Shippings;
  setMethod: React.Dispatch<React.SetStateAction<Shippings>>;
}
const ShippingMethods: React.FC<ShippingMethodsProps> = ({
  method,
  setMethod,
}) => {
  const { t } = useTranslation();
  return (
    <ul>
      {shippingMethods?.map((item) => (
        <li
          key={item?.id}
          className={`cursor-pointer w-full flex items-center gap-3 rounded-lg p-4 mb-5 duration-300 border hover:border-blue-600 ${
            method?.id === item?.id ? "border-blue-600" : ""
          }`}
          onClick={() => setMethod(item)}
        >
          <div
            className={`w-5 h-5 duration-300 rounded-[50%] border ${
              method?.id === item?.id ? "bg-blue-600" : "bg-white"
            } `}
          ></div>
          <p>
            {t(item?.name)} - {item?.id === 1 ? t(item.coast) : item.coast}{" "}
            {item?.id !== 1 ? t("SAR") : null}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default ShippingMethods;
