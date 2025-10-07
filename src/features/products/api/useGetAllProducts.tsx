import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { ProductType } from "../types/product.types";
const useGetAllProducts = () => {
  return useQuery({
    queryKey: [apiRoutes?.products],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.products);
      return data?.data as ProductType[];
    },
  });
};

export default useGetAllProducts;
