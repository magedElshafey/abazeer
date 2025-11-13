import { FC, useState, useRef, useCallback, useEffect, memo } from "react";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown } from "react-icons/io";
import type { ProductsFiltersContext } from "../../types/product.types";
import { sortableKeys } from "../../constants/products.constants";
import { useProductsFilters } from "../../providers/ProductsFiltersProvider";

const SortDropdown: FC = () => {
    const { t } = useTranslation();
    const { setSortBy, sortBy } = useProductsFilters();

    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const labels: Record<string, string> = {
        "name-asc": t("name_ascending"),
        "name-desc": t("name_descending"),
        "price-asc": t("price_ascending"),
        "price-desc": t("price_descending"),
        "rating-asc": t("rating_ascending"),
        "rating-desc": t("rating_descending"),
        "date-asc": t("date_ascending"),
        "date-desc": t("date_descending"),
    };

    const sortOptions = [
        { value: undefined, label: t("default") },
        ...sortableKeys.flatMap(option => [
            {
                label: labels[`${option}-asc`] || `${option} Ascending`,
                value: `${option}-asc` as ProductsFiltersContext["sortBy"]
            },
            {
                label: labels[`${option}-desc`] || `${option} Descending`,
                value: `${option}-desc` as ProductsFiltersContext["sortBy"]
            }
        ])
    ];


    const selectedOption = sortOptions.find(option => option.value === sortBy) || sortOptions[0];

    const handleShowDropdown = useCallback(() => {
        setShowDropdown(prev => !prev);
    }, []);

    const handleOptionSelect = useCallback((value: ProductsFiltersContext["sortBy"]) => {
        setSortBy?.(value);
        setShowDropdown(false);
    }, [setSortBy]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={showDropdown}
                aria-controls="sort-menu"
                onClick={handleShowDropdown}
                className="flex-between min-w-min sm:min-w-52 gap-2 px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-orangeColor focus:border-transparent transition-colors"
            >
                <span>{selectedOption.label}</span>
                <IoIosArrowDown size={15} className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showDropdown && (
                <ul
                    role="menu"
                    aria-label="sort options"
                    className="absolute min-w-fit w-full top-full sm:start-full md:start-0 bg-white shadow-lg border border-gray-200 rounded-md mt-1 z-30 overflow-y-auto"
                >
                    {sortOptions.map((option) => (
                        <li key={option.value || 'default'}>
                            <button
                                type="button"
                                role="menuitem"
                                className={`w-full text-start text-nowrap px-3 py-2 text-sm hover:bg-gray-100 transition-colors ${option.value === sortBy ? 'bg-orangeColor/20 text-orangeColor font-medium' : 'text-gray-700'
                                    }`}
                                onClick={() => handleOptionSelect(option.value as ProductsFiltersContext["sortBy"])}
                            >
                                {option.label}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default memo(SortDropdown);
