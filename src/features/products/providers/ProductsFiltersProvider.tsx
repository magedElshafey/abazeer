import { createContext, FC, PropsWithChildren, useContext, useState, useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import type { Filters, ProductsFiltersContext as IProductsFiltersContext } from "../types/product.types";
import { sortableKeys } from "../constants/products.constants";

const ProductsFiltersContext = createContext<IProductsFiltersContext>({
    sortBy: undefined,
    filters: {},
    setSortBy: () => null,
    isDrawerOpen: false,
    setIsDrawerOpen: () => null,
    handleChangeFilters: () => null,
    appliedFilters: {},
});

const ProductsFiltersProvider: FC<PropsWithChildren> = ({ children }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [sortBy, setSortBy] = useState<IProductsFiltersContext["sortBy"]>(() => {
        const sortParam = searchParams.get("sort_by");
        const sortKey = sortParam?.split("-")[0];
        if (sortParam && sortableKeys.some(key => sortKey === key || sortKey === key)) {
            return sortParam as IProductsFiltersContext["sortBy"];
        }
        return undefined;
    });

    const [filters, setFilters] = useState<Filters>(() => {
        const filters: Filters = {};
        
        for (const [key, value] of searchParams.entries()) {
            if(key.startsWith("filter-")) {
                const filterKey = key.split("-")[1] as keyof Filters;
                
                // If the key already exists in filters
                if (filterKey in filters) {
                    const existingValue = filters[filterKey];
                    // If it's already an array, push the new value
                    if (Array.isArray(existingValue)) {
                        (existingValue as string[]).push(value);
                    } else {
                        // Convert to array with existing value and new value
                        filters[filterKey] = [existingValue as string, value] as any;
                    }
                } else {
                    filters[filterKey] = value as any;
                }
            }
        }
        return filters;
    });

    const debounceRef = useRef<ReturnType<typeof setTimeout>>();

    const handleSortChange = useCallback((newSortBy: IProductsFiltersContext["sortBy"]) => {
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

    function handleChangeFilters(key: keyof Filters, value: Filters[typeof key] | undefined, debounce?: boolean) {
        function handleChange() {
            setSearchParams(params => {
                const paramKey = `filter-${key}`;
                
                // Always delete existing parameters first
                params.delete(paramKey);
                
                if(!value || (Array.isArray(value) && value.length === 0)) {
                    // Already deleted above, nothing more to do
                } else if (Array.isArray(value)) {
                    // Append each value as a separate parameter
                    value.forEach(val => {
                        params.append(paramKey, val);
                    });
                } else {
                    params.set(paramKey, value.toString());
                }
                return params;
            });
    
        }
        
        setFilters(old => ({
            ...old,
            [key]: value,
        }));

        // debounce the parameters changing...
        if(debounce) {
            if(debounceRef.current) clearTimeout(debounceRef.current);
            debounceRef.current = setTimeout(() => {
                handleChange();
            }, 600);
        } else {
            handleChange();
        }
    }

    const appliedFilters = Array.from(searchParams.entries()).reduce((current, [key, value]) => {
        if(key.startsWith("filter-")) {
            current[key.split("-")[1]] = value;
        }
        return current;
    }, {} as Record<string, string>);

    return (
        <ProductsFiltersContext.Provider
            value={{
                sortBy,
                setSortBy: handleSortChange,
                isDrawerOpen,
                setIsDrawerOpen,
                filters,
                handleChangeFilters,
                appliedFilters
            }}
        >
            {children}
        </ProductsFiltersContext.Provider>
    );
}

export const useProductsFilters = () => useContext(ProductsFiltersContext);

export default ProductsFiltersProvider;