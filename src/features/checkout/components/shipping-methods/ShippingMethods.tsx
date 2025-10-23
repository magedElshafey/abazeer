import { memo } from "react";
import { useTranslation } from "react-i18next";
import type { Shippings } from "../../types/shipping.types";
import useGetWebsiteSettings from "@/features/settings/api/useGetWebsiteSettings";
import ListSkeleton from "@/common/components/loader/skeltons/ListSkeleton";

interface Props {
  method: Shippings;
  setMethod: React.Dispatch<React.SetStateAction<Shippings>>;
  shippingMethods: Shippings[];
}

const ShippingMethods: React.FC<Props> = memo(
  ({ method, setMethod, shippingMethods }) => {
    const { t } = useTranslation();

    const { isLoading, data } = useGetWebsiteSettings();

    if(isLoading) return (
      <div className="max-h-[200px] overflow-hidden">
        <ListSkeleton />
      </div>
    )

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
  }
);

export default ShippingMethods;
