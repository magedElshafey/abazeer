import { useState, useCallback, memo, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Border from "../../../../components/border/Border";
import { IoIosArrowDown } from "react-icons/io";
import { TfiSearch } from "react-icons/tfi";

type Category = {
  id: number;
  title: string;
  subCategories: { id: number; title: string }[];
};

const categories: Category[] = [
  {
    id: 1,
    title: "fruites",
    subCategories: [
      { id: 2, title: "apples" },
      { id: 3, title: "banana" },
      { id: 4, title: "mango" },
      { id: 5, title: "strawbarry" },
      { id: 6, title: "oranges" },
    ],
  },
  {
    id: 2,
    title: "vegatbles",
    subCategories: [
      { id: 7, title: "tomatoes" },
      { id: 8, title: "botatoes" },
      { id: 9, title: "beans" },
      { id: 10, title: "onions" },
      { id: 11, title: "carrots" },
    ],
  },
];

interface DropdownProps {
  categories: Category[];
  onSelect: (opt: { id: number; title: string }) => void;
}

const Dropdown = memo(({ categories, onSelect }: DropdownProps) => {
  return (
    <ul
      role="menu"
      aria-label="categories"
      className="absolute top-full right-0 w-[180px] bg-white shadow-lg p-2 border z-30 text-start max-h-56 overflow-y-auto"
    >
      {categories.map((category) => (
        <li key={category.id} className="mb-3">
          <button
            type="button"
            role="menuitem"
            className="cursor-pointer w-full text-start hover:bg-gray-100 p-1 rounded"
            onClick={() => onSelect(category)}
          >
            {category.title}
          </button>
          {category.subCategories.map((sub) => (
            <div key={sub.id} className="mt-2 mb-1">
              <button
                type="button"
                role="menuitem"
                className="ms-2 cursor-pointer w-full text-start hover:bg-gray-100 p-1 rounded"
                onClick={() => onSelect(sub)}
              >
                {sub.title}
              </button>
            </div>
          ))}
        </li>
      ))}
    </ul>
  );
});
Dropdown.displayName = "Dropdown";

const Search = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showDropDown, setShowDropDown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOpt, setSelectedOpt] = useState<{
    id: number;
    title: string;
  } | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleShowDropDown = useCallback(() => {
    setShowDropDown((prev) => !prev);
  }, []);

  const handleSelectedOption = useCallback(
    (opt: { id: number; title: string }) => {
      setSelectedOpt(opt);
      setShowDropDown(false);
    },
    []
  );

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

  // ✅ إغلاق الـ dropdown عند الضغط خارجها
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
    <div className="flex-1  bg-background-gray p-3 flex items-center gap-3">
      {/* Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={showDropDown}
          aria-controls="categories-menu"
          onClick={handleShowDropDown}
          className="flex items-center gap-4"
        >
          <div className="flex items-center gap-2">
            <span>{selectedOpt ? selectedOpt.title : t("all categories")}</span>
            <IoIosArrowDown size={15} aria-hidden="true" />
          </div>
          <Border />
        </button>
        {showDropDown && (
          <Dropdown categories={categories} onSelect={handleSelectedOption} />
        )}
      </div>

      {/* Input */}
      <input
        type="text"
        aria-label={t("search")}
        className="flex-1 border-none outline-none bg-transparent caret-orangeColor"
        placeholder={t("search")}
        value={searchTerm}
        onChange={handleSearchTermChange}
      />

      {/* Search button */}
      <button
        onClick={handleSearchButtonClick}
        disabled={!selectedOpt && !searchTerm.trim()}
        className="text-transition disabled:cursor-not-allowed disabled:opacity-40"
        aria-label={t("search")}
      >
        <TfiSearch size={20} />
      </button>
    </div>
  );
};

export default Search;
