import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { delayOptions } from "@/lib/tanstack-react-query/delayOptions";
import { Ads } from "../../types/ads.types";
const useGetAds = () => {
  return useQuery({
    queryKey: [apiRoutes?.ads],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.ads);
      return data?.data as Ads[];
    },
    ...delayOptions,
  });
};

export default useGetAds;
