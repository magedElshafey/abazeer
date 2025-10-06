import { memo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useGetAllCategories from "@/features/categories/api/useGetAllCategories";
import SidebarIntro from "../../../mobile-navbar/common/SidebarIntro";
import Backdrop from "../../../mobile-navbar/common/Backdrop";
import { IoIosArrowBack } from "react-icons/io";
import type { Categories } from "../../../../../../../features/categories/types/Categories";
import Loader from "@/common/components/loader/spinner/Loader";
import EmptyData from "@/common/components/empty-data/EmptyData";
import { CategoriesListType } from "@/features/categories/types/categoriesList.types";

interface CategoriesSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CategoryItemProps {
  category: CategoriesListType | CategoriesListType["children"][0];
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
    "children" in category
      ? !!category.children
      : "children" in category
      ? !!category.children
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
            <img alt={category?.name} src={category?.icon} />
          ) : null}
          <span className={`pl-${level * 2}`}>{category.name}</span>
        </button>

        {hasChildren && (
          <button
            onClick={toggleOpen}
            aria-expanded={open}
            aria-label={`Toggle ${category.name}`}
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
          {"children" in category &&
            category.children?.map((child: Categories) => (
              <CategoryItem
                key={child.id}
                category={child}
                level={level + 1}
                dir={dir}
                onNavigate={onNavigate}
              />
            ))}

          {"children" in category &&
            category.children?.map((child: Categories) => (
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
  const { isLoading, data } = useGetAllCategories();
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
          {isLoading ? (
            <div className="flex-center my-4">
              <Loader color="white" />
            </div>
          ) : data && data?.length ? (
            data?.map((cat) => (
              <CategoryItem
                key={cat.id}
                category={cat}
                dir={dir}
                onNavigate={handleNavigate}
              />
            ))
          ) : (
            <EmptyData />
          )}
        </ul>
      </aside>
    </>
  );
};

export default memo(CategoriesSidebar);
