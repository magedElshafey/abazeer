import { useMutation } from "@tanstack/react-query";
import { Axios } from "../../../lib/axios/Axios";
import { apiRoutes } from "../../../services/api-routes/apiRoutes";
import { LoginSchemaType } from "../schema/loginSchema";
import { Response } from "@/types/Response";
import { User } from "../types/auth.types";

const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (formData: LoginSchemaType) => {
      const { data } = await Axios.post<Response<User>>(apiRoutes?.login, formData);
      return data;
    },
  });
};

export default useLogin;
