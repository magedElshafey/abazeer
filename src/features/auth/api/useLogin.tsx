import { useMutation } from "@tanstack/react-query";
import { Axios } from "../../../lib/axios/Axios";
import { apiRoutes } from "../../../services/api-routes/apiRoutes";
const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (formData: FormData) => {
      const { data } = await Axios.post(apiRoutes?.login, formData);
      return data;
    },
  });
};

export default useLogin;
