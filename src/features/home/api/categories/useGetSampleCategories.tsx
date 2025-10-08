import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { delayOptions } from "@/lib/tanstack-react-query/delayOptions";
import type { BaseCategory } from "@/features/categories/types/category.types";
const useGetSampleCategories = () => {
  return useQuery({
    queryKey: [apiRoutes?.simpleCategories],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.simpleCategories);
      return data?.data as BaseCategory[];
    },
    ...delayOptions,
  });
};

export default useGetSampleCategories;
