import { useMutation } from "@tanstack/react-query";
import { Axios } from "../../../../lib/axios/Axios";
import { apiRoutes } from "../../../../services/api-routes/apiRoutes";
const useResetPassword = () => {
  return useMutation({
    mutationKey: ["reset-password"],
    mutationFn: async (formData: FormData) => {
      const { data } = await Axios.post(apiRoutes?.resetPassword, formData);
      return data;
    },
  });
};

export default useResetPassword;
