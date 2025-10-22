import { Axios } from "@/lib/axios/Axios";
import { useQuery } from "@tanstack/react-query";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { Setting } from "../types/settings.type";
import { delayOptions } from "@/lib/tanstack-react-query/delayOptions";
import { useEffect } from "react";
const useGetWebsiteSettings = () => {

  const settings = useQuery({
    queryKey: [apiRoutes?.setting],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.setting);
      return data?.data as Setting;
    },
    ...delayOptions,
  });

  useEffect(() => {
    if(!settings.isLoading && settings.data && settings.data.site_favicon) {
      const favicon = document.querySelector("link[rel='icon']");
      favicon?.setAttribute("href", settings?.data?.site_favicon as string)
    }
  }, [settings.data, settings.isLoading]);

  return settings;
};

export default useGetWebsiteSettings;
