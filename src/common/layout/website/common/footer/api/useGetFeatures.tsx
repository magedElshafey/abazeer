import { Axios } from "@/lib/axios/Axios";
import { useQuery } from "@tanstack/react-query";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { Response } from "@/types/Response";
import type { Feature } from "@/features/settings/types/settings.type";

const useGetFeatures = () => {
  return useQuery({
    queryKey: [apiRoutes?.features],
    queryFn: async () => {
      const { data } = await Axios.get<Response<Feature[]>>(apiRoutes?.features);
      return data?.data as Feature[];
    },
  });
};

export default useGetFeatures;

