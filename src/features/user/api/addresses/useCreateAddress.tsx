import { useMutation } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { Response } from "@/types/Response";
import type { AddressSchemaType } from "../../schemas/addresses";

const useCreateAddress = () => {
  return useMutation({
    mutationKey: ["createAddress"],
    mutationFn: async (formData: AddressSchemaType) => {
      const { data } = await Axios.post<Response>(apiRoutes.addresses, formData);
      return data;
    },
  });
};

export default useCreateAddress;
