import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { useSearchParams } from "react-router-dom";
import type {
  Filters,
  ProductsFiltersContext as IProductsFiltersContext,
} from "../types/product.types";
import { sortableKeys } from "../constants/products.constants";

const ProductsFiltersContext = createContext<IProductsFiltersContext>({
  sortBy: undefined,
  filters: {},
  setSortBy: () => null,
  isDrawerOpen: false,
  setIsDrawerOpen: () => null,
  handleChangeFilters: () => null,
  resetFilters: () => null,
  appliedFilters: {},
});

const ProductsFiltersProvider: FC<PropsWithChildren> = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isPushed = useRef(false);
  const [sortBy, setSortBy] = useState<IProductsFiltersContext["sortBy"]>(
    () => {
      const sortParam = searchParams.get("sort_by");
      const sortKey = sortParam?.split("-")[0];
      if (
        sortParam &&
        sortableKeys.some((key) => sortKey === key || sortKey === key)
      ) {
        return sortParam as IProductsFiltersContext["sortBy"];
      }
      return undefined;
    }
  );

  useEffect(() => {
    function handleBackNavigate() {
      isPushed.current = false;
    }
    window.addEventListener("popstate", handleBackNavigate);
    return () => {
      window.removeEventListener("popstate", handleBackNavigate);
    };
  }, []);

  const [filters, setFilters] = useState<Filters>(() => {
    const parsed: Filters = {};
    for (const [key, value] of searchParams.entries()) {
      if (key.startsWith("filter-")) {
        const filterKey = key.split("-")[1] as keyof Filters;
        if (filterKey in parsed) {
          const existingValue = parsed[filterKey];
          if (Array.isArray(existingValue)) {
            (existingValue as string[]).push(value);
          } else {
            parsed[filterKey] = [existingValue as string, value] as any;
          }
        } else {
          parsed[filterKey] = value as any;
        }
      }
    }
    return parsed;
  });

  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const handleSortChange = useCallback(
    (newSortBy: IProductsFiltersContext["sortBy"]) => {
      if (!isPushed.current) {
        window.history.pushState({}, "");
        isPushed.current = true;
      }
      setSortBy(newSortBy);
      setSearchParams(
        (searchParams) => {
          if (newSortBy) {
            searchParams.set("sort_by", newSortBy);
          } else {
            searchParams.delete("sort_by");
          }
          return searchParams;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  function handleChangeFilters(
    key: keyof Filters,
    value: Filters[typeof key] | undefined,
    debounce?: boolean
  ) {
    if (!isPushed.current) {
      window.history.pushState({}, "");
      isPushed.current = true;
    }
    function handleChange() {
      setSearchParams(
        (params) => {
          const paramKey = `filter-${key}`;

          // Always delete existing parameters first
          params.delete(paramKey);

          if (!value || (Array.isArray(value) && value.length === 0)) {
            // Already deleted above, nothing more to do
          } else if (Array.isArray(value)) {
            // Append each value as a separate parameter
            value.forEach((val) => {
              params.append(paramKey, val);
            });
          } else {
            params.set(paramKey, value.toString());
          }
          return params;
        },
        { replace: true }
      );
    }

    setFilters((old) => ({
      ...old,
      [key]: value,
    }));

    // debounce the parameters changing...
    if (debounce) {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        handleChange();
      }, 600);
    } else {
      handleChange();
    }
  }

  const resetFilters = useCallback(() => {
    if (!isPushed.current) {
      window.history.pushState({}, "");
      isPushed.current = true;
    }
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    setFilters({});

    setSearchParams((params) => {
      Array.from(params.keys()).forEach((key) => {
        if (key.startsWith("filter-")) {
          params.delete(key);
        }
      });
      return params;
    });
  }, [setSearchParams]);

  // Keep local state (sortBy, filters) in sync with current search params
  useEffect(() => {
    // sortBy - same logic as initial state
    const sortParam = searchParams.get("sort_by");
    const sortKey = sortParam?.split("-")[0];
    const nextSort =
      sortParam &&
      sortableKeys.some((key) => sortKey === key || sortKey === key)
        ? (sortParam as IProductsFiltersContext["sortBy"])
        : undefined;
    setSortBy(nextSort);

    // filters - same logic as initial state
    const nextFilters: Filters = {};
    for (const [key, value] of searchParams.entries()) {
      if (key.startsWith("filter-")) {
        const filterKey = key.split("-")[1] as keyof Filters;
        if (filterKey in nextFilters) {
          const existingValue = nextFilters[filterKey];
          if (Array.isArray(existingValue)) {
            (existingValue as string[]).push(value);
          } else {
            nextFilters[filterKey] = [existingValue as string, value] as any;
          }
        } else {
          nextFilters[filterKey] = value as any;
        }
      }
    }
    setFilters(nextFilters);
  }, [searchParams]);

  const appliedFilters = Array.from(searchParams.entries()).reduce(
    (current, [key, value]) => {
      if (key.startsWith("filter-")) {
        current[key.split("-")[1]] = value;
      }
      return current;
    },
    {} as Record<string, string>
  );

  return (
    <ProductsFiltersContext.Provider
      value={{
        sortBy,
        setSortBy: handleSortChange,
        isDrawerOpen,
        setIsDrawerOpen,
        filters,
        handleChangeFilters,
        resetFilters,
        appliedFilters,
      }}
    >
      {children}
    </ProductsFiltersContext.Provider>
  );
};

export const useProductsFilters = () => useContext(ProductsFiltersContext);

export default ProductsFiltersProvider;
