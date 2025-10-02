import { memo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SidebarIntro from "../../../mobile-navbar/common/SidebarIntro";
import Backdrop from "../../../mobile-navbar/common/Backdrop";
import { IoIosArrowBack } from "react-icons/io";
import type { Categories } from "../../../../../../../features/categories/types/Categories";
import { categories } from "../../../../../../../data/data";
interface CategoriesSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CategoryItemProps {
  category: Categories | Categories["sub"][0] | { id: number; title: string };
  level?: number;
  dir: "ltr" | "rtl";
  onNavigate: (id: number) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  level = 0,
  dir,
  onNavigate,
}) => {
  const [open, setOpen] = useState(false);

  // check لو فيه sub أو subSub
  const hasChildren =
    "sub" in category
      ? !!category.sub
      : "subSub" in category
      ? !!category.subSub
      : false;

  const toggleOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return (
    <li className="py-2 border-b last:border-b-0 mx-2" role="none">
      <div className="flex justify-between items-center">
        <button
          onClick={() => onNavigate(category.id)}
          className="flex gap-2 items-center text-left text-transition focus:outline-none"
          role="menuitem"
        >
          {"icon" in category && category.icon ? (
            <category.icon size={20} />
          ) : null}
          <span className={`pl-${level * 2}`}>
            {"mainCateogry" in category
              ? category.mainCateogry
              : category.title}
          </span>
        </button>

        {hasChildren && (
          <button
            onClick={toggleOpen}
            aria-expanded={open}
            aria-label={`Toggle ${
              "mainCateogry" in category
                ? category.mainCateogry
                : category.title
            }`}
            className="p-1"
          >
            <IoIosArrowBack
              size={18}
              className={`transition-transform duration-300 ${
                dir === "rtl" ? "" : "rotate-180"
              } ${open ? "rotate-90" : ""}`}
            />
          </button>
        )}
      </div>

      {/* children */}
      {hasChildren && (
        <ul
          className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
            open ? "max-h-96" : "max-h-0"
          }`}
          role="menu"
        >
          {"sub" in category &&
            category.sub?.map((child: Categories) => (
              <CategoryItem
                key={child.id}
                category={child}
                level={level + 1}
                dir={dir}
                onNavigate={onNavigate}
              />
            ))}

          {"subSub" in category &&
            category.subSub?.map((child: Categories) => (
              <CategoryItem
                key={child.id}
                category={child}
                level={level + 1}
                dir={dir}
                onNavigate={onNavigate}
              />
            ))}
        </ul>
      )}
    </li>
  );
};

const CategoriesSidebar: React.FC<CategoriesSidebarProps> = ({
  isOpen,
  onClose,
}) => {
  const { i18n, t } = useTranslation();
  const dir = i18n.dir();
  const navigate = useNavigate();

  const handleNavigate = useCallback(
    (id: number) => {
      navigate(`/product-category/${id}`);
      onClose();
    },
    [navigate, onClose]
  );

  return (
    <>
      <Backdrop
        isOpen={isOpen}
        onClick={onClose}
        aria="close categories navigation"
      />
      <aside
        className={`fixed top-0 right-0 h-screen overflow-y-auto w-[85%] bg-white shadow-md border z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
        aria-label="categories Navigation"
      >
        <SidebarIntro onClose={onClose} height="h-24">
          <div className="flex-center">
            <p className="text-white text-xl font-bold">{t("categories")}</p>
          </div>
        </SidebarIntro>

        <ul aria-label="categories Navigation" role="menu" className="mt-2">
          {categories?.map((cat) => (
            <CategoryItem
              key={cat.id}
              category={cat}
              dir={dir}
              onNavigate={handleNavigate}
            />
          ))}
        </ul>
      </aside>
    </>
  );
};

export default memo(CategoriesSidebar);
