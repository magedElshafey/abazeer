import { useMemo } from "react";
import { Link, useMatches } from "react-router-dom";
import { BreadcrumbItem, RouteHandle } from "../types/breadcrumb.types";
import { useTranslation } from "react-i18next";

const Breadcrumb = () => {
    const matches = useMatches();
    const { t } = useTranslation();

    const breadcrumbItems: BreadcrumbItem[] = useMemo(() => {
        const homeRoute = {
            path: "/",
            label: "home"
        } as BreadcrumbItem;

        const items = matches.flatMap(item => {
            if (!item.handle || item.pathname === "/") return [];
            const parameters = Object.values(item.params);
            return [{
                label: (item.handle as RouteHandle).breadcrumb,
                path: item.pathname,
                isDynamic: !!parameters.length,
            }] as BreadcrumbItem[]
        });

        return [homeRoute, ...items];
    }, [matches]);

    return (
        <div className="w-full bg-background-gray">
            <div className="containerr flex items-center gap-2 py-2">
                {
                    breadcrumbItems.map((item, index, arr) => {
                        const isLastItem = index === arr.length - 1;
                        return (
                            <>
                                <Link
                                    to={item.path}
                                    className="last:pointer-events-none last:text-black text-text-link cursor-pointer"
                                >
                                    {t(item.label)}
                                </Link>
                                {
                                    !isLastItem && (
                                        <span>/</span>
                                    )
                                }
                            </>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Breadcrumb;