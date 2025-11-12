import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { Product } from "../types/product.types";
import { useSearchParams } from "react-router-dom";

interface UseGetProductsOptions {
  featured?: boolean;
  landing?: boolean;
  essential?: boolean;
  delay?: Partial<UseQueryOptions<Product[]>>;
  recentlyViewed?: boolean;
}

const useGetAllProducts = ({
  featured,
  landing,
  delay,
  essential,
  recentlyViewed
}: UseGetProductsOptions = {}) => {
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get("sort_by");
  const filterParams = Array.from(searchParams.entries()).reduce((current, [key, value]) => {
    if(key.startsWith("filter-")) {
      const filterKey = key.split("-")?.[1] || "";
      const currentValue = current.get(filterKey);
      if(filterKey && currentValue) {
        current.delete(filterKey);
        current.append(`${filterKey}[]`, currentValue);
        current.append(`${filterKey}[]`, value);
      } else if(current.get(`${filterKey}[]`)) {
        current.append(`${filterKey}[]`, value);
      } else current.set(filterKey, value);
    }
    return current;
  }, new URLSearchParams());
  if(sortBy) filterParams.set("sort", sortBy);

  return useQuery<Product[]>({
    queryKey: [apiRoutes.products, { featured, landing, essential }, filterParams.toString()],
    queryFn: async ({signal}) => {
      const { data } = await Axios.get(`${apiRoutes.products}?${filterParams.toString()}`, {
        params: {
          featured,
          landing,
          essential,
          recent_viewed: recentlyViewed
        },
        signal
      });

      return data?.data as Product[];
    },
    ...delay,
  });
};

export default useGetAllProducts;