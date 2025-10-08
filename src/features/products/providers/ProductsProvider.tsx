import { createContext, FC, PropsWithChildren, useContext, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import type { ProductsContext as IProductsContext } from "../types/product.types";
import { sortableKeys } from "../constants/products.constants";

const ProductsContext = createContext<IProductsContext>({
    view: "cards",
    setView: () => null,
    sortBy: undefined,
    setSortBy: () => null,
    isDrawerOpen: false,
    setIsDrawerOpen: () => null,
});

const ProductsContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [view, setView] = useState<IProductsContext["view"]>("cards");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [sortBy, setSortBy] = useState<IProductsContext["sortBy"]>(() => {
        const sortParam = searchParams.get("sort_by");
        const sortKey = sortParam?.split("-")[0];
        if (sortParam && sortableKeys.some(key => sortKey === key || sortKey === key)) {
            return sortParam as IProductsContext["sortBy"];
        }
        return undefined;
    });

    const handleSortChange = useCallback((newSortBy: IProductsContext["sortBy"]) => {
        setSortBy(newSortBy);        
        setSearchParams(searchParams => {
            if (newSortBy) {
                searchParams.set("sort_by", newSortBy);
            } else {
                searchParams.delete("sort_by");
            }
            return searchParams;
        });
    }, [setSearchParams]);

    return (
        <ProductsContext.Provider
            value={{
                view,
                setView,
                sortBy,
                setSortBy: handleSortChange,
                isDrawerOpen,
                setIsDrawerOpen
            }}
        >
            {children}
        </ProductsContext.Provider>
    );
}

export const useProductsContext = () => useContext(ProductsContext);

export default ProductsContextProvider;