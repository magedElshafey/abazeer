import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { Product, ProductsContext } from "../types/product.types";

interface UseGetProductsOptions {
  featured?: boolean;
  landing?: boolean;
  essential?: boolean;
  delay?: Partial<UseQueryOptions<Product[]>>;
  sort?: ProductsContext["sortBy"]
}

const useGetAllProducts = ({
  featured,
  landing,
  delay,
  essential,
  sort
}: UseGetProductsOptions = {}) => {
  return useQuery<Product[]>({
    queryKey: [apiRoutes.products, { featured, landing, essential, sort }],
    queryFn: async () => {
      const { data } = await Axios.get(`${apiRoutes.products}`, {
        params: {
          featured,
          landing,
          essential,
          sort,
        }
      });

      return data?.data as Product[];
    },
    ...delay,
  });
};

export default useGetAllProducts;