import { FC, PropsWithChildren } from "react";
import ProductsFiltersProvider, { useProductsFilters } from "./ProductsFiltersProvider";
import ProductsViewProvider, { useProductsView } from "./ProductsViewProvider";

/**
 * Combined ProductsProvider for backward compatibility
 * This provider wraps both ProductsFiltersProvider and ProductsViewProvider
 * 
 * @deprecated Use ProductsFiltersProvider and ProductsViewProvider separately instead
 */
const ProductsContextProvider: FC<PropsWithChildren> = ({ children }) => {
    return (
        <ProductsFiltersProvider>
            <ProductsViewProvider>
                {children}
            </ProductsViewProvider>
        </ProductsFiltersProvider>
    );
}

/**
 * @deprecated Use useProductsFilters() and useProductsView() separately instead
 */
export const useProductsContext = () => {
    const filtersContext = useProductsFilters();
    const viewContext = useProductsView();
    
    return {
        ...filtersContext,
        ...viewContext,
    };
};

export default ProductsContextProvider;