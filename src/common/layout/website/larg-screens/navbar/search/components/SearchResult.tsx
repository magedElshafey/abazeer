import { memo, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "@/features/products/types/product.types";
import Loader from "@/common/components/loader/spinner/Loader";
import { CiSearch } from "react-icons/ci";
import { useTranslation } from "react-i18next";

interface SearchResultsProps {
  products?: Product[];
  isLoading: boolean;
  hasSearchValue: boolean;
  onClear: () => void;
  onClose?: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = memo(
  ({ products, isLoading, hasSearchValue, onClear, onClose }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    /** 🧠 Derived states */
    const isEmpty =
      !isLoading && hasSearchValue && (!products || products.length === 0);
    const showPrompt = !isLoading && !hasSearchValue;

    /** 🚀 Memoize rendered list to avoid re-renders */
    const renderedProducts = useMemo(() => {
      if (!products?.length) return null;
      return products.map((product) => (
        <button
          key={product.id}
          onClick={() => {
            navigate(`/products/${product.id}`);
            onClear();
            onClose?.();
          }}
          className="flex items-center gap-3 p-2 w-full text-start hover:bg-gray-50 rounded transition"
          role="option"
          aria-label={product.name}
        >
          <img
            src={product.image || "/images/placeholder.jpg"}
            alt={product.name}
            className="w-10 h-10 object-cover rounded"
            loading="lazy"
            decoding="async"
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 line-clamp-2">
              {product.name}
            </p>
            {product.price && (
              <p className="text-xs text-gray-500">{product.price}</p>
            )}
          </div>
        </button>
      ));
    }, [products, navigate, onClear, onClose]);

    /** 🎨 Render logic */
    return (
      <div
        className="p-2 max-h-[350px] overflow-y-auto"
        role="listbox"
        aria-live="polite"
      >
        {/* 🔄 Loading state */}
        {isLoading && (
          <div className="flex items-center justify-center p-4" role="status">
            <Loader />
            <span className="ml-2 text-gray-600">{t("loading")}</span>
          </div>
        )}

        {/* 💬 Initial state (before typing) */}
        {showPrompt && (
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <CiSearch
              size={32}
              className="text-gray-400 mb-2"
              aria-hidden="true"
            />
            <p className="text-sm font-medium text-gray-600">
              {t("startTypingToSearch")}
            </p>
            <p className="text-xs text-gray-500">
              {t("searchForProductsCategoriesOrBrands")}
            </p>
          </div>
        )}

        {/* 🚫 Empty state */}
        {isEmpty && (
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <CiSearch
              size={32}
              className="text-gray-400 mb-2"
              aria-hidden="true"
            />
            <p className="text-gray-600 font-medium">{t("noProductsFound")}</p>
            <p className="text-sm text-gray-500">
              {t("tryAdjustingSearchTerms")}
            </p>
          </div>
        )}

        {/* ✅ Results */}
        {!isLoading && !isEmpty && hasSearchValue && (
          <div className="flex flex-col gap-1">{renderedProducts}</div>
        )}
      </div>
    );
  }
);

SearchResults.displayName = "SearchResults";
export default SearchResults;
