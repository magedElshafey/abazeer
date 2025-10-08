import { useQuery } from "@tanstack/react-query";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { Static } from "../../types/static.type";
import { Axios } from "@/lib/axios/Axios";
const useGetAllStaticPages = () => {
  return useQuery({
    queryKey: [apiRoutes?.static_pages],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.static_pages);
      return data?.data as Static[];
    },
  });
};

export default useGetAllStaticPages;
