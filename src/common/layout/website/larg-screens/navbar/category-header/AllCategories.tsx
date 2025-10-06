import { memo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useGetAllCategories from "@/features/categories/api/useGetAllCategories";
import { useTranslation } from "react-i18next";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosArrowBack } from "react-icons/io";
import Loader from "@/common/components/loader/spinner/Loader";
import EmptyData from "@/common/components/empty-data/EmptyData";
const AllCategories = memo(() => {
  const { isLoading, data } = useGetAllCategories();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const dir = i18n.dir();

  const handleMouseEnter = useCallback(() => setOpen(true), []);
  const handleMouseLeave = useCallback(() => setOpen(false), []);
  const handleNavigate = useCallback(
    (id: number) => {
      navigate(`/product-category/${id}`);
      setOpen(false);
    },
    [navigate]
  );

  return (
    <div
      className="relative cursor-pointer text-nowrap"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger Button */}
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="categories-menu"
        className="py-2 px-4 flex items-center gap-3 bg-orangeColor rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
      >
        <GiHamburgerMenu size={20} aria-hidden="true" />
        <span>{t("shop with categories")}</span>
      </button>

      {/* Main Dropdown */}
      <div
        id="categories-menu"
        role="menu"
        aria-label={t("categories")}
        className={`absolute top-full z-50 ${
          dir === "rtl" ? "right-0" : "left-0"
        } 
        bg-white shadow-lg p-3 border rounded-md transform transition-all duration-300 ease-out 
        ${
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {isLoading ? (
          <div className="flex-center my-4">
            <Loader />
          </div>
        ) : data && data?.length ? (
          data.map((item) => (
            <div key={item.id} className="group relative mb-2">
              <button
                onClick={() => handleNavigate(item.id)}
                className="w-full flex justify-between items-center gap-5 hover:bg-gray-100 p-2 rounded transition"
                role="menuitem"
              >
                <div className="flex items-center gap-2">
                  {item?.icon && (
                    <img
                      src={item?.icon}
                      alt={item?.name}
                      className="w-8 h-8 object-contain"
                    />
                  )}

                  <span>{item.name}</span>
                </div>
                {item.children && item.children.length > 0 && (
                  <IoIosArrowBack
                    size={18}
                    aria-hidden="true"
                    className={`transition-transform duration-300 ${
                      dir === "rtl" ? "" : "rotate-180"
                    } group-hover:rotate-90`}
                  />
                )}
              </button>

              {item.children && item.children.length > 0 && (
                <div
                  role="menu"
                  aria-label={`${item.name} sub menu`}
                  className={`absolute top-0 ${
                    dir === "rtl" ? "right-full mr-2" : "left-full ml-2"
                  } bg-white shadow-lg border rounded-md p-4 
                  opacity-0 translate-x-4 pointer-events-none 
                  group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto 
                  transition-all duration-300 ease-out w-[400px] text-nowrap`}
                >
                  <div className="grid grid-cols-2 gap-6">
                    {item.children.map((subItem) => (
                      <div key={subItem.id} className="space-y-2">
                        <button
                          onClick={() => handleNavigate(subItem.id)}
                          className="font-semibold text-gray-700 hover:text-orangeColor transition cursor-pointer"
                          role="menuitem"
                        >
                          {subItem.name}
                        </button>
                        <ul className="space-y-1 text-sm text-gray-600">
                          {subItem.children?.map((subSubItem) => (
                            <li key={subSubItem.id}>
                              <button
                                onClick={() => handleNavigate(subSubItem.id)}
                                className="hover:text-orangeColor transition cursor-pointer"
                                role="menuitem"
                              >
                                {subSubItem.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <EmptyData />
        )}
      </div>
    </div>
  );
});

AllCategories.displayName = "AllCategories";
export default AllCategories;
/**
 *  {}
 */
