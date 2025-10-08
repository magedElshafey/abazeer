import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useProductsContext } from "../../providers/ProductsProvider";
import useGetAllProducts from "../../api/useGetAllProducts";
import ProductCard from "../card/ProductCard";
import ProductListCard from "../card/ProductListCard";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";

const AllProductsContent: FC = () => {
    const { t } = useTranslation();
    const { isDrawerOpen, setIsDrawerOpen, view, sortBy } = useProductsContext();
    const queryResult = useGetAllProducts({
        sort: sortBy
    });
    const products = queryResult.data;

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
        <div className="flex flex-col lg:flex-row gap-4">
            {/* Sidebar - 25% on large screens, drawer on small/medium */}
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
                    bg-white rounded-lg border
                    h-full
                    fixed left-0 top-0 max-w-[400px] w-[80vw] lg:relative lg:w-full
                    z-50 lg:z-auto
                    overflow-y-auto
                    transform transition-transform duration-300 ease-in-out lg:transform-none
                    ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}>
                    <p className="text-gray-500">Filters sidebar placeholder</p>
                </div>
            </div>
            
            {/* Products listing - 75% on large screens */}
            <div className="w-full flex-1">
                <div className="bg-white rounded-lg">
                    <FetchHandler queryResult={queryResult} skeletonType="product">
                        {products && products.length > 0 ? (
                            <div className={`
                                ${view === "cards" 
                                    ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-4" 
                                    : "flex flex-col gap-4"
                                }
                            `}>
                            {products.map((product) => (
                                view === "cards" ? (
                                    <ProductCard className="p-2" key={product.id} product={product} />
                                ) : (
                                    <ProductListCard key={product.id} product={product} />
                                )
                            ))}
                            </div>
                        ) : (
                            <div className="flex justify-center items-center py-12">
                                <div className="text-gray-500">{t("No data found")}</div>
                            </div>
                        )}
                    </FetchHandler>
                </div>
            </div>
        </div>
    );
};

export default AllProductsContent;
