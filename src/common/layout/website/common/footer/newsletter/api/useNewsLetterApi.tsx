import { useMutation } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";

const useNewsLetterApi = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const { data } = await Axios.post(apiRoutes.news_letter, { email });
      return data;
    },
  });
};

export default useNewsLetterApi;
