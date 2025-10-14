import { memo } from "react";
import { CategoriesListType } from "@/features/categories/types/category.types";
import useGetAllCategories from "@/features/categories/api/useGetAllCategories";
import Loader from "@/common/components/loader/spinner/Loader";
import EmptyData from "@/common/components/empty-data/EmptyData";

interface DropdownMenuProps {
  onSelect: (category: CategoriesListType) => void;
}

const DropdownMenu = memo(({ onSelect }: DropdownMenuProps) => {
  const { data, isLoading } = useGetAllCategories();

  return (
    <ul
      role="menu"
      aria-label="Categories"
      className="absolute top-[118%] w-[300px] right-0 overflow-x-hidden bg-white shadow-lg p-2 border z-[100000] max-h-[500px] overflow-y-auto rounded-md"
    >
      {isLoading && (
        <div className="flex justify-center py-3">
          <Loader />
        </div>
      )}

      {!isLoading && data?.length
        ? data.map((category) => (
            <li key={category.id} className="mb-2">
              <button
                type="button"
                role="menuitem"
                className="w-full text-start hover:bg-gray-100 p-1 rounded focus:outline-none focus:ring-2 focus:ring-orangeColor"
                onClick={() => onSelect(category)}
              >
                {category.name}
              </button>

              {category.children?.map((child) => (
                <button
                  key={child.id}
                  type="button"
                  role="menuitem"
                  className="ms-3 mt-1 w-full text-start hover:bg-gray-100 p-1 rounded focus:outline-none focus:ring-2 focus:ring-orangeColor"
                  onClick={() => onSelect(child)}
                >
                  {child.name}
                </button>
              ))}
            </li>
          ))
        : !isLoading && <EmptyData />}
    </ul>
  );
});

DropdownMenu.displayName = "DropdownMenu";
export default DropdownMenu;
