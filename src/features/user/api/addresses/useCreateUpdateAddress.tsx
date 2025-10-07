import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { Response } from "@/types/Response";
import type { AddressSchemaType } from "../../schemas/addresses";

interface UseCreateUpdateAddressParams {
  id?: string;
}

const useCreateUpdateAddress = ({ id }: UseCreateUpdateAddressParams = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: id ? ["updateAddress", id] : ["createAddress"],
    mutationFn: async (formData: AddressSchemaType) => {
      if (id) {
        // Update existing address
        const { data } = await Axios.post<Response>(
          `${apiRoutes.addresses}/${id}`,
          {
            ...formData,
            _method: "PUT",
          }
        );
        return data;
      } else {
        // Create new address
        const { data } = await Axios.post<Response>(apiRoutes.addresses, formData);
        return data;
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [apiRoutes.addresses] });
    }
  });
};

export default useCreateUpdateAddress;

