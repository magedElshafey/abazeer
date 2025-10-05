import { useMutation } from "@tanstack/react-query";
import { Axios } from "../../../lib/axios/Axios";
import { apiRoutes } from "../../../services/api-routes/apiRoutes";
import { ForgetPasswordSchemaType } from "../schema/forgetPasswordSchema";
import { Response } from "@/types/Response";

const useForgetPassword = () => {
  return useMutation({
    mutationKey: ["forget-password"],
    mutationFn: async (formData: ForgetPasswordSchemaType) => {
      const { data } = await Axios.post<Response<unknown>>(apiRoutes?.sendOtp, formData);
      return data;
    },
  });
};

export default useForgetPassword;
