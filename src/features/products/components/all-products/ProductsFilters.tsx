import { FC, memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useProductsFilters } from "../../providers/ProductsFiltersProvider";
import PriceFilter from "@/common/components/double-slider/PriceFilter";
import CategoryFilter from "./CategoryFilter";
import BrandFilter from "./BrandFilter";
import DiscountFilter from "./DiscountFilter";
import OfferFilter from "./OfferFilter";

const ProductsFilters: FC = () => {
    const { t } = useTranslation();
    const { isDrawerOpen, setIsDrawerOpen } = useProductsFilters();

    // Disable scroll on body when drawer is open (mobile/tablet only)
    useEffect(() => {
        if (isDrawerOpen) {
            // Disable scroll
            document.body.style.overflow = 'hidden';
        } else {
            // Re-enable scroll
            document.body.style.overflow = 'unset';
        }

        // Cleanup function to restore scroll when component unmounts
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isDrawerOpen]);

    return (
        <div className="w-full lg:w-1/4 relative lg:block">
            {/* Overlay for mobile/tablet */}
            {isDrawerOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-50"
                    onClick={() => setIsDrawerOpen(false)}
                />
            )}
            
            {/* Sidebar content */}
            <div className={`
                bg-white lg:bg-transparent
                h-full
                fixed left-0 top-0 max-w-[400px] w-[80vw] lg:relative lg:w-full
                z-50 lg:z-auto
                overflow-y-auto
                transform transition-transform duration-300 ease-in-out lg:transform-none
                ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="flex flex-col gap-4">
                    {/* Price Range Filter */}
                    <div className="bg-background-gray px-2 py-4">
                        <h4 className="text-md font-medium text-gray-700 mb-3">
                            {t("price")}
                        </h4>
                        <PriceFilter
                            initialMax={5000}
                            initialMin={0}
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="bg-background-gray px-2 py-4">
                        <CategoryFilter />
                    </div>

                    {/* Brand Filter */}
                    <div className="bg-background-gray px-2 py-4">
                        <BrandFilter />
                    </div>

                    {/* Discount Filter */}
                    <div className="bg-background-gray px-2 py-4">
                        <DiscountFilter />
                    </div>

                    {/* Offer Filter */}
                    <div className="bg-background-gray px-2 py-4">
                        <OfferFilter />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(ProductsFilters);

