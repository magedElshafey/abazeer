import { useMutation } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { Response } from "@/types/Response";
import type { ChangePasswordSchemaType } from "@/features/auth/schema/passwordSchema";

const useChangePassword = () => {
  return useMutation({
    mutationKey: ["changePassword"],
    mutationFn: async (data: ChangePasswordSchemaType) => {
      const { data: response } = await Axios.post<Response>(
        apiRoutes.changePassword,
        data
      );
      return response;
    },
  });
};

export default useChangePassword;
