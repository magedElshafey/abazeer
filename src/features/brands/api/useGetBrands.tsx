import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { Brand } from "../types/brand.types";

interface UseGetBrandsOptions {
  featured?: boolean;
  delay?: Partial<UseQueryOptions<Brand[]>>;
  category?: string;
}

const useGetBrands = ({ featured, delay, category }: UseGetBrandsOptions = {}) => {
  return useQuery<Brand[]>({
    queryKey: [apiRoutes.brands, { featured, category }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (featured !== undefined) params.append("featured", String(featured));
      if (category !== undefined) params.append("category", category);

      const queryString = params.toString() ? `?${params.toString()}` : "";
      const { data } = await Axios.get(`${apiRoutes.brands}${queryString}`);

      return data?.data as Brand[];
    },
    ...delay,
  });
};

export default useGetBrands;
