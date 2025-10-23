import { Axios } from "@/lib/axios/Axios";
import { useQuery } from "@tanstack/react-query";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { Setting } from "../types/settings.type";
import { delayOptions } from "@/lib/tanstack-react-query/delayOptions";

const useGetWebsiteSettings = () => {
  const settings = useQuery({
    queryKey: [apiRoutes?.setting],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.setting);
      return data?.data as Setting;
    },
    ...delayOptions,
  });

  return settings;
};

export default useGetWebsiteSettings;
