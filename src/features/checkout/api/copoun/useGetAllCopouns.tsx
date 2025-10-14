import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { Copoun } from "../../types/copoun.type";
const useGetAllCopouns = () => {
  return useQuery({
    queryKey: [apiRoutes?.allCopouns],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.allCopouns);
      return data?.data as Copoun[];
    },
  });
};

export default useGetAllCopouns;
