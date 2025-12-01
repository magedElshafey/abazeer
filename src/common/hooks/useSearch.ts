import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CategoriesListType } from "@/features/categories/types/category.types";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";

interface UseSearchProps {
  onClose?: () => void;
}

export const useSearch = ({ onClose }: UseSearchProps = {}) => {
  const navigate = useNavigate();
  const DEBOUNCE_INTERVAL = 400;

  const [selectedCategory, setSelectedCategory] = useState<CategoriesListType | null>(null);
  const [searchTerm, setSearchTerm] = useState({ value: "", deferred: "" });
  
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // --- Search Input Handlers ---

  const handleInputChange = useCallback((val: string) => {
    // update immediate value
    setSearchTerm((prev) => ({ ...prev, value: val }));

    // if empty input, clear deferred immediately
    if (!val.trim()) {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
      setSearchTerm({ value: "", deferred: "" });
      return;
    }

    // debounce updating deferred
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearchTerm((prev) => ({ ...prev, deferred: val }));
      debounceRef.current = null;
    }, DEBOUNCE_INTERVAL);
  }, []);

  const clearSearch = useCallback(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    setSearchTerm({ value: "", deferred: "" });
  }, []);

  // --- Category Handlers ---

  const handleSelectCategory = useCallback((opt: CategoriesListType | null) => {
    setSelectedCategory(opt);
  }, []);

  // --- API Query ---

  const { data: products, isFetching } = useQuery({
    queryKey: [apiRoutes.search, searchTerm.deferred, selectedCategory],
    enabled: !!searchTerm.deferred,
    queryFn: async ({ queryKey, signal }) => {
      const [, term] = queryKey as [string, string];
      const params: any = { name: term };

      if (selectedCategory?.id) {
        params.category = selectedCategory.id;
      }

      const response = await Axios.get(apiRoutes.search, {
        params,
        signal,
      });

      return response.data.data;
    },
    staleTime: 1000 * 30,
  });

  // --- Navigation ---

  const performSearch = useCallback(() => {
    const params: Record<string, string> = {};

    if (selectedCategory?.id) {
      params["filter-category"] = String(selectedCategory.id);
    }

    if (searchTerm.value.trim()) {
      params["filter-name"] = searchTerm.value.trim();
    }

    navigate(`/products?${new URLSearchParams(params)}`);

    if (onClose) onClose();
  }, [navigate, searchTerm.value, selectedCategory, onClose]);

  // --- Cleanup ---

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
    };
  }, []);

  // --- Derived State ---
  
  const hasSearchValue = !!searchTerm.value.trim();
  const hasDeferredValue = !!searchTerm.deferred.trim();

  const searchState = useMemo(() => {
    if (!hasDeferredValue) return "idle";
    if (isFetching) return "loading";
    if (products?.length === 0) return "empty";
    if (products?.length > 0) return "success";
    return "idle";
  }, [hasDeferredValue, isFetching, products]);

  return {
    searchTerm: searchTerm.value,
    deferredSearchTerm: searchTerm.deferred,
    selectedCategory,
    products,
    isFetching,
    searchState,
    hasSearchValue,
    hasDeferredValue,
    handleInputChange,
    handleSelectCategory,
    clearSearch,
    performSearch,
  };
};
