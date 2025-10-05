import { useMutation } from "@tanstack/react-query";
import { Axios } from "../../../lib/axios/Axios";
import { apiRoutes } from "../../../services/api-routes/apiRoutes";
import { RegisterSchemaType } from "../schema/registerSchema";
import { Response } from "../../../types/Response";

const useRegister = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (formData: RegisterSchemaType) => {
      const { data } = await Axios.post<Response>(apiRoutes?.register, formData);
      return data;
    },
  });
};

export default useRegister;
