import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { useProductsFilters } from "../../providers/ProductsFiltersProvider";
import SortDropdown from "./SortDropdown";
import ViewToggle from "./ViewToggle";
import { HiFilter } from "react-icons/hi";

const AllProductsHeader: FC = () => {
    const { t } = useTranslation();
    const { isDrawerOpen, setIsDrawerOpen } = useProductsFilters();

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <div className="flex-between py-10">
            <div className="flex items-center gap-4">                
                <button
                    type="button"
                    onClick={toggleDrawer}
                    className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orangeColor focus:border-transparent transition-colors"
                    aria-label={`Toggle ${t("filters")}`}
                >
                    <HiFilter size={18} />
                    <span className="text-sm font-medium hidden sm:inline">{t("filters")}</span>
                </button>
                <h1 className="text-3xl font-bold hidden lg:block">{t("products")}</h1>
            </div>

            <div className="flex-between lg:w-1/2 gap-4">
                <div className="flex items-center gap-4">
                    <span className="font-medium text-text-gray hidden sm:inline">{t("sort_by")}</span>
                    <SortDropdown />
                </div>

                <ViewToggle />
            </div>
        </div>
    );
};

export default memo(AllProductsHeader);