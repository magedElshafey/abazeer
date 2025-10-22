import { memo } from "react";
import { useTranslation } from "react-i18next";
import { FaCheck } from "react-icons/fa";
import { useProductsFilters } from "@/features/products/providers/ProductsFiltersProvider";
import useGetBrands from "@/features/brands/api/useGetBrands";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import type { Brand } from "@/features/brands/types/brand.types";

interface BrandItemProps {
  brand: Brand;
}

const BrandItem: React.FC<BrandItemProps> = ({ brand }) => {
  const {
    filters: { brand: brands = [] },
    handleChangeFilters,
  } = useProductsFilters();

  const selectedBrands = Array.isArray(brands) ? brands : [brands];

  const isSelected = selectedBrands.includes(brand.id.toString());

  const handleBrandToggle = () => {
    let newBrands: string[];
    
    if (isSelected) {
      // Remove brand from selection
      newBrands = selectedBrands.filter((id) => id !== brand.id.toString());
    } else {
      // Add brand to selection
      newBrands = [...selectedBrands, brand.id.toString()];
    }

    // If no brands selected, pass undefined to clear the filter
    handleChangeFilters("brand", newBrands.length > 0 ? newBrands : undefined);
  };

  return (
    <div className="w-full">
      <div
        onClick={handleBrandToggle}
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

        <span
          className="text-sm text-text-gray"
        >
          {brand.name}
        </span>
      </div>
    </div>
  );
};

const BrandFilter: React.FC = () => {
  const { t } = useTranslation();
  const { filters: {category} } = useProductsFilters();
  const queryResult = useGetBrands({ category: category });
  const brands = queryResult.data || [];

  return (
    <FetchHandler queryResult={queryResult} skeletonType="list">
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-3">
          {t("brands")}
        </h3>
        {brands.length === 0 ? (
          <div className="text-center py-4 text-gray-500 text-sm">
            {t("no brands available")}
          </div>
        ) : (
          <div className="space-y-1">
            {brands.map((brand) => (
              <BrandItem key={brand.id} brand={brand} />
            ))}
          </div>
        )}
      </div>
    </FetchHandler>
  );
};

export default memo(BrandFilter);

