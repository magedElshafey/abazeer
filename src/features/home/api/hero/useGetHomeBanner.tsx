import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { HomeBanner } from "../../types/banner.types";
import { delayOptions } from "@/lib/tanstack-react-query/delayOptions";
const useGetHomeBanner = () => {
  return useQuery({
    queryKey: [apiRoutes?.banner],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.banner);
      return data?.data as HomeBanner;
    },
    ...delayOptions,
  });
};

export default useGetHomeBanner;
