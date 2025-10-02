import { useMutation } from "@tanstack/react-query";
import { Axios } from "../../../../lib/axios/Axios";
import { apiRoutes } from "../../../../services/api-routes/apiRoutes";

const useForgetPassword = () => {
  return useMutation({
    mutationKey: ["forget-password"],
    mutationFn: async (formData: FormData) => {
      const { data } = await Axios.post(apiRoutes?.forgetPassword, formData);
      return data;
    },
  });
};

export default useForgetPassword;
