import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { PiClockCounterClockwiseBold } from "react-icons/pi";
import useGetAllProducts from "@/features/products/api/useGetAllProducts";
import Loader from "@/common/components/loader/spinner/Loader";
import EmptyData from "@/common/components/empty-data/EmptyData";

const RecentlyViewed: FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch, isFetching } = useGetAllProducts({
    recentlyViewed: true,
  });
  const [open, setOpen] = useState(false);

  const recentlyViewedProducts = useMemo(() => data?.slice(0, 6) ?? [], [data]);
  const hasProducts = recentlyViewedProducts.length > 0;

  const handleMouseEnter = useCallback(() => {
    setOpen(true);
    if (!data && !isLoading) {
      refetch();
    }
  }, [data, isLoading, refetch]);

  const handleMouseLeave = useCallback(() => setOpen(false), []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    },
    []
  );

  const handleNavigate = useCallback(
    (id: number) => {
      navigate(`/products/${id}`);
      setOpen(false);
    },
    [navigate]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, handleKeyDown]);

  useEffect(() => {
    if (open) {
      refetch();
    }
  }, [open, refetch]);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="recently-viewed-menu"
        className="flex-center gap-2 text-gray-700 text-nowrap w-fit px-4 py-2 rounded-md transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orangeColor"
      >
        <PiClockCounterClockwiseBold size={18} aria-hidden="true" />
        <span className="pb-1">{t("recently viewed")}</span>
      </button>

      <div
        id="recently-viewed-menu"
        role="menu"
        aria-label={t("recently viewed")}
        className={`absolute w-full top-[100% - 12px] pt-2 z-30 ${
          i18n.dir() === "rtl" ? "start-0" : "end-0"
        } transition-all duration-200 ease-out transform ${
          open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="min-w-[320px] bg-white shadow-xl border border-gray-100 rounded-xl p-4">
          {isLoading || isFetching ? (
            <div className="flex-center py-6">
              <Loader />
            </div>
          ) : isError ? (
            <div className="py-4">
              <EmptyData title="Something went wrong" />
            </div>
          ) : hasProducts ? (
            <ul
              className="flex items-center gap-3 overflow-y-auto p-1"
              role="none"
            >
              {recentlyViewedProducts.map((product) => (
                <li key={product.id} role="none">
                    <div className="bg-background-gray p-2 rounded-lg cursor-pointer" onClick={() => handleNavigate(product.id)}>
                        <img
                        src={product.image || "/images/600x600.jpg"}
                        alt={product.name}
                        loading="lazy"
                        className="w-24 h-24 cursor-pointer object-contain transition-transform duration-200 group-hover:scale-105"
                        />
                    </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-4">
              <EmptyData title="no recently viewed products" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentlyViewed;