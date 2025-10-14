import { useState, useCallback, useRef, useEffect, memo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { TfiSearch } from "react-icons/tfi";
import { IoIosArrowDown } from "react-icons/io";
import Border from "../../../../../components/border/Border";
import SearchResults from "./components/SearchResult";
import DropdownMenu from "./components/DropdownMenu";
import { CategoriesListType } from "@/features/categories/types/category.types";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
interface SearchProps {
  onClose?: () => void;
}
const Search: React.FC<SearchProps> = memo(({ onClose }) => {
  const DEBOUNCE_INTERVAL = 400;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState<CategoriesListType | null>(
    null
  );
  const [isFocused, setIsFocused] = useState(false);
  const [search, setSearch] = useState({ value: "", deferred: "" });

  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** 🧠 Dropdown handlers */
  const toggleDropdown = useCallback(() => {
    setShowDropDown((prev) => !prev);
  }, []);

  const handleSelectCategory = useCallback((opt: CategoriesListType) => {
    setSelectedOpt(opt);
    setShowDropDown(false);
  }, []);

  /** 🔍 Search logic with debounce */
  const handleInputChange = useCallback((val: string) => {
    // update immediate value
    setSearch((prev) => ({ ...prev, value: val }));

    // if empty input, clear deferred immediately (avoid stale queries)
    if (!val.trim()) {
      // clear any scheduled deferred update
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
      // clear deferred so enabled becomes false
      setSearch({ value: "", deferred: "" });
      return;
    }

    // otherwise debounce updating deferred
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearch((prev) => ({ ...prev, deferred: val }));
      debounceRef.current = null;
    }, DEBOUNCE_INTERVAL);
  }, []);

  const clearSearch = useCallback(() => {
    // clear both value & deferred and any pending timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    setSearch({ value: "", deferred: "" });
  }, []);

  /** 🧭 Navigate on search button click */
  const handleSearch = useCallback(() => {
    const params: Record<string, string> = {};
    if (selectedOpt?.id) params.category = String(selectedOpt.id);
    if (search.value.trim()) params.q = search.value.trim();
    navigate(`/products?${new URLSearchParams(params)}`);
  }, [navigate, search.value, selectedOpt]);

  /** 🧩 Outside click handler */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { data: products, isFetching } = useQuery({
    queryKey: [apiRoutes.search, search.deferred],
    enabled: !!search.deferred,
    queryFn: async ({ queryKey, signal }) => {
      const [, term] = queryKey as [string, string];
      const response = await Axios.get(apiRoutes.search, {
        params: { name: term },
        signal,
      });
      return response.data.data;
    },
    staleTime: 1000 * 30,
  });

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
    };
  }, []);

  const hasSearchValue = !!search.value;
  const showResults = isFocused;

  return (
    <div className="flex-1 bg-background-gray p-3 flex items-center gap-3 min-w-0 relative">
      {/* Dropdown */}
      <div className="relative flex-shrink-0 w-[200px]" ref={dropdownRef}>
        <button
          type="button"
          onClick={toggleDropdown}
          aria-haspopup="menu"
          aria-expanded={showDropDown}
          className="flex items-center gap-2 w-full truncate focus:outline-none focus:ring-2 focus:ring-orangeColor"
        >
          <span className="truncate">
            {selectedOpt ? selectedOpt.name : t("all categories")}
          </span>
          <IoIosArrowDown size={15} aria-hidden="true" />
          <Border />
        </button>
        {showDropDown && <DropdownMenu onSelect={handleSelectCategory} />}
      </div>

      {/* Input */}
      <input
        type="text"
        aria-label={t("search")}
        className="flex-1 border-none outline-none bg-transparent caret-orangeColor truncate"
        placeholder={t("search")}
        value={search.value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        onChange={(e) => handleInputChange(e.target.value)}
      />

      {/* Button */}
      <button
        onClick={handleSearch}
        disabled={!selectedOpt && !search.value.trim()}
        aria-label={t("search")}
        className="text-transition hidden lg:block flex-shrink-0 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <TfiSearch size={20} />
      </button>

      {/* Search Results */}
      {showResults && (
        <div className="absolute top-full left-0 w-full bg-white border rounded shadow-lg z-[1000] overflow-y-auto max-h-[350px]">
          <SearchResults
            products={products}
            isLoading={isFetching}
            hasSearchValue={hasSearchValue}
            onClear={clearSearch}
            onClose={onClose}
          />
        </div>
      )}
    </div>
  );
});

Search.displayName = "Search";
export default Search;
