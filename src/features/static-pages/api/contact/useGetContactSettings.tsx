import { useQuery } from "@tanstack/react-query";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { Axios } from "@/lib/axios/Axios";
import { ContactSettings } from "../../types/contact.type";
const useGetContactSettings = () => {
  return useQuery({
    queryKey: [apiRoutes?.contactSettings],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.contactSettings);
      return data?.data as ContactSettings;
    },
  });
};

export default useGetContactSettings;
