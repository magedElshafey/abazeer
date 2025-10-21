import { FC } from "react";
import type { BreadcrumbItem } from "../types/breadcrumb.types";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Loader from "@/common/components/loader/spinner/Loader";
import { getIdFromParam } from "@/utils/getIdFromParam";

interface Props {
  item: Required<BreadcrumbItem>;
}

function hasDisplay(
  value: unknown,
  attribute: string
): value is Record<string, any> & { name?: string; title?: string } {
  if (
    value &&
    typeof value === "object" &&
    ("name" in value || "title" in value || attribute in value)
  )
    return true;
  return false;
}

const DynamicBreadcrumb: FC<Props> = ({ item }) => {
  const { data, isFetching, isLoading } = useQuery({
    retryOnMount: false,
    enabled: false,
    queryKey: [...item.queryKey, getIdFromParam(item.parameter)],
  });

  if (isFetching || isLoading) return <Loader />;

  return (
    <Link to={item.path}>
      {hasDisplay(data, item.display_attribute)
        ? data.name || data.title || (data[item.display_attribute] as string)
        : item.label}
    </Link>
  );
};

export default DynamicBreadcrumb;
