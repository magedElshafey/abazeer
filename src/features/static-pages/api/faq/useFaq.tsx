import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { delayOptions } from "@/lib/tanstack-react-query/delayOptions";
import type { Faq } from "../../types/Faq.type";
const useFaq = () => {
  return useQuery({
    queryKey: [apiRoutes?.faqs],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.faqs);
      return data?.data as Faq[];
    },
    ...delayOptions,
  });
};

export default useFaq;
