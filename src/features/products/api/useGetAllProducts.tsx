import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { Product } from "../types/product.types";

interface UseGetProductsOptions {
  featured?: boolean;
  landing?: boolean;
  essential?: boolean;
  delay?: Partial<UseQueryOptions<Product[]>>;
}

const useGetAllProducts = ({
  featured,
  landing,
  delay,
  essential,
}: UseGetProductsOptions = {}) => {
  return useQuery<Product[]>({
    queryKey: [apiRoutes.products, { featured, landing, essential }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (featured !== undefined) params.append("featured", String(featured));
      if (landing !== undefined) params.append("landing", String(landing));
      if (essential !== undefined)
        params.append("essential", String(essential));

      const queryString = params.toString() ? `?${params.toString()}` : "";
      const { data } = await Axios.get(`${apiRoutes.products}${queryString}`);

      return data?.data as Product[];
    },
    ...delay,
  });
};

export default useGetAllProducts;