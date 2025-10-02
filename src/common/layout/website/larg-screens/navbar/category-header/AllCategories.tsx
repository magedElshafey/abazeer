import { memo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosArrowBack } from "react-icons/io";
import { categories } from "../../../../../../data/data";
const AllCategories = memo(() => {
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
        {categories.map((item) => (
          <div key={item.id} className="group relative mb-2">
            <button
              onClick={() => handleNavigate(item.id)}
              className="w-full flex justify-between items-center gap-5 hover:bg-gray-100 p-2 rounded transition"
              role="menuitem"
            >
              <div className="flex items-center gap-2">
                <item.icon size={20} aria-hidden="true" />
                <span>{item.mainCateogry}</span>
              </div>
              {item.sub && item.sub.length > 0 && (
                <IoIosArrowBack
                  size={18}
                  aria-hidden="true"
                  className={`transition-transform duration-300 ${
                    dir === "rtl" ? "" : "rotate-180"
                  } group-hover:rotate-90`}
                />
              )}
            </button>

            {/* Sub Menu */}
            {item.sub && (
              <div
                role="menu"
                aria-label={`${item.mainCateogry} sub menu`}
                className={`absolute top-0 ${
                  dir === "rtl" ? "right-full mr-2" : "left-full ml-2"
                } bg-white shadow-lg border rounded-md p-4 
                  opacity-0 translate-x-4 pointer-events-none 
                  group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto 
                  transition-all duration-300 ease-out w-[400px] text-nowrap`}
              >
                <div className="grid grid-cols-2 gap-6">
                  {item.sub.map((subItem) => (
                    <div key={subItem.id} className="space-y-2">
                      <button
                        onClick={() => handleNavigate(subItem.id)}
                        className="font-semibold text-gray-700 hover:text-orangeColor transition cursor-pointer"
                        role="menuitem"
                      >
                        {subItem.title}
                      </button>
                      <ul className="space-y-1 text-sm text-gray-600">
                        {subItem.subSub?.map((subSubItem) => (
                          <li key={subSubItem.id}>
                            <button
                              onClick={() => handleNavigate(subSubItem.id)}
                              className="hover:text-orangeColor transition cursor-pointer"
                              role="menuitem"
                            >
                              {subSubItem.title}
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
        ))}
      </div>
    </div>
  );
});

AllCategories.displayName = "AllCategories";
export default AllCategories;
