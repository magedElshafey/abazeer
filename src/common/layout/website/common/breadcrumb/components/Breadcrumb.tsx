import { useMemo } from "react";
import { Link, useLocation, useMatches } from "react-router-dom";
import { BreadcrumbItem, RouteHandle } from "../types/breadcrumb.types";
import { useTranslation } from "react-i18next";
import DynamicBreadcrumb from "./DynamicBreadcrumb";

const Breadcrumb = () => {
  const matches = useMatches();
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const breadcrumbItems: BreadcrumbItem[] = useMemo(() => {
    const homeRoute = {
      path: "/",
      label: "home",
    } as BreadcrumbItem;

    const items = matches.flatMap((item) => {
      if (!item.handle || item.pathname === "/") return [];
      const parameters = Object.values(item.params);
      return [
        {
          label: (item.handle as RouteHandle).breadcrumb,
          path: item.pathname,
          isDynamic: !!parameters.length,
          parameter: parameters[parameters.length - 1] as string,
          queryKey: (item.handle as RouteHandle)?.queryKey || undefined,
          display_attribute:
            (item.handle as RouteHandle).display_attribute || undefined,
        },
      ] as BreadcrumbItem[];
    });

    return [homeRoute, ...items];
  }, [matches]);

  if (pathname === "/") return null;

  return (
    <div className="w-full bg-background-gray py-2 md:py-0">
      <div className="containerr flex items-center gap-2 py-2 text-xs sm:text-sm md:text-base">
        {breadcrumbItems.map((item, index, arr) => {
          const isLastItem = index === arr.length - 1;
          if (item.isDynamic !== undefined && item.queryKey)
            return (
              <>
                <DynamicBreadcrumb item={item as Required<BreadcrumbItem>} />
                {!isLastItem && <span>/</span>}
              </>
            );

          return (
            <>
              <Link
                to={item.path}
                className="last:pointer-events-none last:text-black text-text-link cursor-pointer"
              >
                {t(item.label)}
              </Link>
              {!isLastItem && <span>/</span>}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Breadcrumb;
