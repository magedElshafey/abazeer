import { memo } from "react";
import { useTranslation } from "react-i18next";
import { FaCheck } from "react-icons/fa";
import { useProductsFilters } from "@/features/products/providers/ProductsFiltersProvider";

const OfferFilter: React.FC = () => {
  const { t } = useTranslation();
  const {
    filters: { in_offer},
    handleChangeFilters,
  } = useProductsFilters();

  const isSelected = in_offer === "true";

  const handleToggle = () => {
    handleChangeFilters("in_offer", isSelected ? undefined : "true");
  };

  return (
    <div>
      <h3 className="text-base font-semibold text-gray-800 mb-3">
        {t("offer")}
      </h3>
      <div className="w-full">
        <div
          onClick={handleToggle}
          className="flex items-center gap-2 py-2 px-2 rounded-md cursor-pointer transition-colors hover:bg-gray-50"
        >
          {/* Custom checkbox */}
          <div
            className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
              isSelected
                ? "bg-orangeColor border-orangeColor"
                : "border-gray-300 bg-white"
            }`}
          >
            {isSelected && <FaCheck className="w-2.5 h-2.5 text-white" />}
          </div>

          <span className="text-sm text-text-gray">
            {t("only show products in offer")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(OfferFilter);

