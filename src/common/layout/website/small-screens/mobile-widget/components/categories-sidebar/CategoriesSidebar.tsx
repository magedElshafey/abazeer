import { memo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useGetAllCategories from "@/features/categories/api/useGetAllCategories";
import SidebarIntro from "../../../mobile-navbar/common/SidebarIntro";
import Backdrop from "../../../mobile-navbar/common/Backdrop";
import { IoIosArrowBack } from "react-icons/io";
import Loader from "@/common/components/loader/spinner/Loader";
import EmptyData from "@/common/components/empty-data/EmptyData";
import type { CategoriesListType } from "@/features/categories/types/category.types";
interface CategoriesSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CategoryItemProps {
  category: CategoriesListType;
  level?: number;
  dir: "ltr" | "rtl";
  onNavigate: (id: number) => void;
}

const CategoryItem = memo(
  ({ category, level = 0, dir, onNavigate }: CategoryItemProps) => {
    const [open, setOpen] = useState(false);

    const hasChildren =
      Array.isArray(category.children) && category.children.length > 0;

    const toggleOpen = useCallback(() => {
      setOpen((prev) => !prev);
    }, []);

    const handleClick = useCallback(() => {
      onNavigate(category.id);
    }, [category.id, onNavigate]);

    return (
      <li className="py-2 border-b last:border-b-0 mx-2" role="none">
        <div className="flex justify-between items-center">
          <button
            onClick={handleClick}
            className="flex gap-2 items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors"
            role="menuitem"
          >
            {category.icon && (
              <img
                alt={category.name}
                src={category.icon}
                className="w-5 h-5 object-contain"
                loading="lazy"
              />
            )}
            <span style={{ paddingLeft: level * 12 }}>{category.name}</span>
          </button>

          {hasChildren && (
            <button
              onClick={toggleOpen}
              aria-expanded={open}
              aria-label={`Toggle ${category.name}`}
              className="p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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

        {hasChildren && (
          <ul
            className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
              open ? "max-h-96" : "max-h-0"
            }`}
            role="menu"
          >
            {category.children!.map((child) => (
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
  }
);
CategoryItem.displayName = "CategoryItem";

const CategoriesSidebar = memo(
  ({ isOpen, onClose }: CategoriesSidebarProps) => {
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
          aria-label="categories navigation"
        >
          <SidebarIntro onClose={onClose} height="h-24">
            <div className="flex-center">
              <p className="text-white text-xl font-bold">{t("categories")}</p>
            </div>
          </SidebarIntro>

          <ul role="menu" className="mt-2" aria-label="categories list">
            {isLoading ? (
              <div className="flex-center my-4">
                <Loader />
              </div>
            ) : data?.length ? (
              data.map((cat) => (
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
  }
);
CategoriesSidebar.displayName = "CategoriesSidebar";

export default CategoriesSidebar;
