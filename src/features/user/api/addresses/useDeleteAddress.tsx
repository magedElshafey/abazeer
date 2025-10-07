import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { Response } from "@/types/Response";

interface UseDeleteAddressParams {
  addressId: number;
}

const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteAddress"],
    mutationFn: async ({ addressId }: UseDeleteAddressParams) => {
      const { data } = await Axios.delete<Response>(
        `${apiRoutes.addresses}/${addressId}`
      );
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [apiRoutes.addresses] });
    },
  });
};

export default useDeleteAddress;

