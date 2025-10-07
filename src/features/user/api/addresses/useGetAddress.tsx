import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { Response } from "@/types/Response";
import type { Address } from "../../types/addresses.types";

interface UseGetAddressParams {
  id?: string | number;
}

const useGetAddress = ({ id }: UseGetAddressParams) => {
  return useQuery({
    queryKey: [apiRoutes.addresses, id],
    queryFn: async () => {
      const { data } = await Axios.get<Response<Address>>(
        `${apiRoutes.addresses}/${id}`
      );
      return data.data;
    },
    enabled: !!id,
  });
};

export default useGetAddress;

