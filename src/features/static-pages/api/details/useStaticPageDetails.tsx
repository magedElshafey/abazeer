import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import type { Static } from "../../types/static.type";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { delayOptions } from "@/lib/tanstack-react-query/delayOptions";
const useStaticPageDetails = (slug: string) => {
  return useQuery({
    queryKey: [`${apiRoutes?.static_page}-${slug}`],
    queryFn: async () => {
      const { data } = await Axios.get(`${apiRoutes?.static_page}/${slug}`);
      return data?.data as Static;
    },
    enabled: !!slug,
    ...delayOptions,
  });
};

export default useStaticPageDetails;
