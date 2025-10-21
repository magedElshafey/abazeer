import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { delayOptions } from "@/lib/tanstack-react-query/delayOptions";
import { Testimonials } from "../../types/testimonials.types";
const useGetTestimonials = () => {
  return useQuery({
    queryKey: [apiRoutes?.testimonials],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.testimonials);
      return data?.data as Testimonials[];
    },
    ...delayOptions,
  });
};

export default useGetTestimonials;
