import { useState, useRef, useEffect, memo } from "react";
import { useTranslation } from "react-i18next";
import { TfiSearch } from "react-icons/tfi";
import { IoIosArrowDown } from "react-icons/io";
import Border from "../../../../../components/border/Border";
import SearchResults from "./components/SearchResult";
import DropdownMenu from "./components/DropdownMenu";
import { useSearch } from "@/common/hooks/useSearch";

interface SearchProps {
  onClose?: () => void;
}

const Search: React.FC<SearchProps> = memo(({ onClose = undefined }) => {
  const { t } = useTranslation();
  
  // Custom hook for search logic
  const {
    searchTerm,
    selectedCategory,
    products,
    searchState,
    hasSearchValue,
    hasDeferredValue,
    handleInputChange,
    handleSelectCategory,
    clearSearch,
    performSearch,
  } = useSearch({ onClose });

  // UI State
  const [showDropDown, setShowDropDown] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  /** 🧠 Dropdown handlers */
  const toggleDropdown = () => setShowDropDown((prev) => !prev);

  const onSelectCategory = (opt: any) => {
    handleSelectCategory(opt);
    setShowDropDown(false);
  };

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

  const showResults = isFocused && hasDeferredValue;

  return (
    <div className="flex-1 bg-background-gray p-3 flex items-center gap-1 sm:gap-2 md:gap-3 min-w-0 relative">
      {/* Dropdown */}
      <div className="relative flex-shrink-0" ref={dropdownRef}>
        <button
          type="button"
          onClick={toggleDropdown}
          aria-haspopup="menu"
          aria-expanded={showDropDown}
          className="flex items-center gap-1 sm:gap-2 w-[70px] sm:w-[80px] md:w-fit truncate focus:outline-none focus:ring-2 focus:ring-orangeColor"
        >
          <span className="truncate">
            {selectedCategory ? selectedCategory.name : t("all categories")}
          </span>
          <IoIosArrowDown size={15} aria-hidden="true" />
          <Border />
        </button>
        {showDropDown && <DropdownMenu onSelect={onSelectCategory} />}
      </div>

      {/* Input */}
      <input
        type="text"
        aria-label={t("search")}
        className="flex-1 border-none outline-none bg-transparent caret-orangeColor truncate"
        placeholder={t("search")}
        value={searchTerm}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        onChange={(e) => handleInputChange(e.target.value)}
        aria-busy={searchState === "loading"}
      />

      {/* Button */}
      <button
        onClick={performSearch}
        disabled={!selectedCategory && !searchTerm.trim()}
        aria-label={t("search")}
        className="text-transition flex-shrink-0 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <TfiSearch size={20} />
      </button>

      {/* Search Results */}
      {showResults && (
        <div className="absolute top-full left-0 w-full bg-white border rounded shadow-lg z-[1000] max-h-[350px]">
          <SearchResults
            products={products}
            isLoading={searchState === "loading"}
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

