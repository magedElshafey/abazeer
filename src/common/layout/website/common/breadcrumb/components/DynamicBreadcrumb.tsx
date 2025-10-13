import { FC } from "react";
import type { BreadcrumbItem } from "../types/breadcrumb.types";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Loader from "@/common/components/loader/spinner/Loader";

interface Props {
    item: Required<BreadcrumbItem>
}

function hasDisplay(value: unknown): value is {name?: string, title?: string} {
    if(value && typeof value === "object" && ("name" in value || "title" in value)) return true;
    return false;
}

const DynamicBreadcrumb: FC<Props> = ({ item }) => {
    const {
        data,
        isFetching,
        isLoading
    } = useQuery({
        retryOnMount: false,
        enabled: false,
        queryKey: [...item.queryKey, item.parameter]
    });

    if(isFetching || isLoading) return <Loader />

    return (
        <Link to={item.path}>
            {
                hasDisplay(data) ? data.name || data.title : item.label
            }
        </Link>
    );
}

export default DynamicBreadcrumb;