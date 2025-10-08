import { useState, useCallback, memo, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Border from "../../../../../components/border/Border";
import { IoIosArrowDown } from "react-icons/io";
import { TfiSearch } from "react-icons/tfi";
import useGetAllCategories from "@/features/categories/api/useGetAllCategories";
import type { CategoriesListType } from "@/features/categories/types/category.types";
import Loader from "@/common/components/loader/spinner/Loader";
import EmptyData from "@/common/components/empty-data/EmptyData";

interface DropdownProps {
  onSelect: (opt: CategoriesListType) => void;
}

const Dropdown = memo(({ onSelect }: DropdownProps) => {
  const { isLoading, data } = useGetAllCategories();
  return (
    <ul
      role="menu"
      aria-label="categories"
      className="absolute top-full right-0  w-[180px] bg-white shadow-lg p-2 border z-[100000] text-start max-h-56 overflow-y-auto"
    >
      {isLoading ? (
        <div className="flex-center py-3">
          <Loader />
        </div>
      ) : data && data?.length ? (
        data?.map((category) => (
          <li key={category.id} className="mb-3">
            <button
              type="button"
              role="menuitem"
              className="cursor-pointer w-full text-start hover:bg-gray-100 p-1 rounded"
              onClick={() => onSelect(category)}
            >
              {category.name}
            </button>
            {category?.children && category?.children?.length
              ? category.children.map((sub: CategoriesListType) => (
                  <div key={sub.id} className="mt-2 mb-1">
                    <button
                      type="button"
                      role="menuitem"
                      className="ms-2 cursor-pointer w-full text-start hover:bg-gray-100 p-1 rounded"
                      onClick={() => onSelect(sub)}
                    >
                      {sub.name}
                    </button>
                  </div>
                ))
              : null}
          </li>
        ))
      ) : (
        <EmptyData />
      )}
    </ul>
  );
});
Dropdown.displayName = "Dropdown";

const Search = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showDropDown, setShowDropDown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOpt, setSelectedOpt] = useState<CategoriesListType | null>(
    null
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleShowDropDown = useCallback(() => {
    setShowDropDown((prev) => !prev);
  }, []);

  const handleSelectedOption = useCallback((opt: CategoriesListType) => {
    setSelectedOpt(opt);
    setShowDropDown(false);
  }, []);

  const handleSearchTermChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    []
  );

  const handleSearchButtonClick = useCallback(() => {
    const params: Record<string, string> = {};
    if (selectedOpt?.id) params.category = String(selectedOpt.id);
    if (searchTerm.trim()) params.q = searchTerm.trim();

    const queryString = new URLSearchParams(params).toString();
    navigate(`/products?${queryString}`);
  }, [navigate, searchTerm, selectedOpt]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="flex-1 bg-background-gray p-3 flex items-center gap-3 min-w-0 ">
      {/* Dropdown */}
      <div
        className="relative flex-shrink-0 min-w-[120px] max-w-[160px] "
        ref={dropdownRef}
      >
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={showDropDown}
          aria-controls="categories-menu"
          onClick={handleShowDropDown}
          className="flex items-center gap-2 w-full truncate"
        >
          <span className="truncate">
            {selectedOpt ? selectedOpt.name : t("all categories")}
          </span>
          <IoIosArrowDown size={15} aria-hidden="true" />
          <Border />
        </button>
        {showDropDown && <Dropdown onSelect={handleSelectedOption} />}
      </div>

      {/* Input */}
      <input
        type="text"
        aria-label={t("search")}
        className="flex-1 min-w-0 border-none outline-none bg-transparent caret-orangeColor truncate"
        placeholder={t("search")}
        value={searchTerm}
        onChange={handleSearchTermChange}
      />

      {/* Search button */}
      <button
        onClick={handleSearchButtonClick}
        disabled={!selectedOpt && !searchTerm.trim()}
        className="text-transition flex-shrink-0 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label={t("search")}
      >
        <TfiSearch size={20} />
      </button>
    </div>
  );
};

export default Search;
/**
 *  {data?.length ? (
        <div>
          {data.map((category) => (
            
          ))}
        </div>
      ) : null}
 */
