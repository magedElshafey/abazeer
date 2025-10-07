import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { Response } from "@/types/Response";
import type { Address } from "../../types/addresses.types";

const useGetUserAddresses = () => {
  return useQuery({
    queryKey: [apiRoutes?.addresses],
    queryFn: async () => {
      const { data } = await Axios.get<Response<Address[]>>(apiRoutes?.addresses);
      return data?.data;
    },
  });
};

export default useGetUserAddresses;
