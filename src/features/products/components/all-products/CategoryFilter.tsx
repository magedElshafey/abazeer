import { useState, memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Plus, Minus } from "lucide-react";
import { useProductsFilters } from "@/features/products/providers/ProductsFiltersProvider";
import useGetAllCategories from "@/features/categories/api/useGetAllCategories";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import type { CategoriesListType } from "@/features/categories/types/category.types";

interface CategoryItemProps {
  category: CategoriesListType;
  level?: number;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category, level = 0 }) => {
  const { t } = useTranslation();
  const {
    filters: { category: selectedCategory },
    handleChangeFilters,
  } = useProductsFilters();

  const hasChildren = category.children && category.children.length > 0;
  const isSelected = selectedCategory === category.id.toString();

  // Recursively check if selected category is a descendant of current category
  const hasSelectedDescendant = (cat: CategoriesListType, targetId: string): boolean => {
    if(cat.id as unknown as string == targetId) return true;
    if (!cat.children || cat.children.length === 0) return false;
    
    for (const child of cat.children) {
      if (child.id.toString() === targetId) return true;
      if (hasSelectedDescendant(child, targetId)) return true;
    }
    
    return false;
  };

  // Initialize expanded state based on whether selected category is a descendant
  const shouldBeExpanded = selectedCategory ? hasSelectedDescendant(category, selectedCategory) : false;
  const [isExpanded, setIsExpanded] = useState(shouldBeExpanded);

  // Update expanded state when selected category changes
  useEffect(() => {
    setIsExpanded(shouldBeExpanded);
  }, [shouldBeExpanded]);

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleCategoryClick = () => {
    // Toggle selection: if already selected, deselect it
    if (isSelected) {
      handleChangeFilters("category", undefined);
    } else {
      handleChangeFilters("category", category.id.toString());
    }
    // Reset brand filter when category changes
    handleChangeFilters("brand", undefined);
  };

  return (
    <div className="w-full">
      <div
        className={`flex items-center justify-between py-2 px-2 rounded-md cursor-pointer transition-colors hover:bg-gray-50 ${
          isSelected ? "bg-green-50" : ""
        }`}
        style={{
          paddingInlineStart: `${level * 20}px`,
        }}
      >
        <div
          className="flex items-center gap-2 flex-1"
          onClick={handleCategoryClick}
        >
          <span
            className={`text-sm transition-colors ${
              isSelected
                ? "text-orangeColor font-bold"
                : "text-text-gray hover:text-orangeColor"
            }`}
          >
            {category.name}
          </span>
        </div>

        {/* Expand/Collapse button */}
        {hasChildren && (
          <button
            onClick={handleToggleExpand}
            className="p-1 rounded-md hover:bg-gray-200 transition-colors"
            aria-label={isExpanded ? t("collapse") : t("expand")}
          >
            {isExpanded ? (
              <Minus className="w-4 h-4 text-gray-500" />
            ) : (
              <Plus className="w-4 h-4 text-gray-500" />
            )}
          </button>
        )}
      </div>

      {/* Render children recursively */}
      {hasChildren && isExpanded && (
        <div className="mt-1">
          {category.children!.map((child) => (
            <CategoryItem key={child.id} category={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const CategoryFilter: React.FC = () => {
  const { t } = useTranslation();
  const queryResult = useGetAllCategories();
  const categories = queryResult.data || [];

  return (
    <FetchHandler queryResult={queryResult} skeletonType="list">
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-3">
          {t("categories")}
        </h3>
        {categories.length === 0 ? (
          <div className="text-center py-4 text-gray-500 text-sm">
            {t("No categories available")}
          </div>
        ) : (
          <div className="space-y-1">
            {categories.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </div>
        )}
      </div>
    </FetchHandler>
  );
};

export default memo(CategoryFilter);

