import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { Flashsale } from "@/features/products/types/flashSale.types";
const useGetFlashsale = () => {
  return useQuery({
    queryKey: [apiRoutes?.flash_sale],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.flash_sale);
      return data?.data as Flashsale;
    },
  });
};

export default useGetFlashsale;
