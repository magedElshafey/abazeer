import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { AboutType } from "../../types/About.type";
import { delayOptions } from "@/lib/tanstack-react-query/delayOptions";
const useAboutApi = () => {
  return useQuery({
    queryKey: [apiRoutes?.about],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.about);
      return data?.data as AboutType;
    },
    ...delayOptions,
  });
};

export default useAboutApi;
