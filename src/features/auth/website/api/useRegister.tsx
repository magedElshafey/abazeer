import { useMutation } from "@tanstack/react-query";
import { Axios } from "../../../../lib/axios/Axios";
import { apiRoutes } from "../../../../services/api-routes/apiRoutes";
const useRegister = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (formData: FormData) => {
      const { data } = await Axios.post(apiRoutes?.register, formData);
      return data;
    },
  });
};

export default useRegister;
