import { useMutation } from "@tanstack/react-query";
import { Axios } from "../../../lib/axios/Axios";
import { apiRoutes } from "../../../services/api-routes/apiRoutes";
import { ResetPasswordSchemaType } from "../schema/resetPasswordSchema";
import { Response } from "@/types/Response";

const useResetPassword = () => {
  return useMutation({
    mutationKey: ["reset-password"],
    mutationFn: async (formData: ResetPasswordSchemaType) => {
      const { data } = await Axios.post<Response>(apiRoutes?.resetPassword, formData);
      return data;
    },
  });
};

export default useResetPassword;
