import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { Response } from "@/types/Response";
import type { Country } from "@/types/country.types";

const useGetCountries = () => {
  return useQuery({
    queryKey: [apiRoutes.countries],
    queryFn: async () => {
      const { data } = await Axios.get<Response<Country[]>>(apiRoutes.countries);
      return data.data;
    },
  });
};

export default useGetCountries;

