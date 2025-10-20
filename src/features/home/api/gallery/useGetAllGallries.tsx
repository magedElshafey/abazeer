import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { delayOptions } from "@/lib/tanstack-react-query/delayOptions";
import { Gallery } from "../../types/gallery.types";
const useGetAllGallries = () => {
  return useQuery({
    queryKey: [apiRoutes?.gallery],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.gallery);
      return data?.data as Gallery[];
    },
    ...delayOptions,
  });
};

export default useGetAllGallries;
