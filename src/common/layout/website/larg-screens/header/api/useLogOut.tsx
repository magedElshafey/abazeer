import { useQuery } from "@tanstack/react-query";
import { apiRoutes } from "../../../../../../services/api-routes/apiRoutes";
import { Axios } from "../../../../../../lib/axios/Axios";
const useLogOut = () => {
  return useQuery({
    queryKey: ["logout"],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.logout);
      console.log("data from logout", data);
      return data;
    },
    enabled: false,
  });
};

export default useLogOut;
