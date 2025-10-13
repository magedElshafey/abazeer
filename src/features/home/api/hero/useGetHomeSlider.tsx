import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { SliderHome } from "../../types/slider.types";
import { delayOptions } from "@/lib/tanstack-react-query/delayOptions";
const useGetHomeSlider = () => {
  return useQuery({
    queryKey: [apiRoutes?.sliders],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.sliders);
      return data?.data as SliderHome[];
    },
    ...delayOptions,
  });
};

export default useGetHomeSlider;
