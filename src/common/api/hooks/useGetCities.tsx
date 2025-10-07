import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { Response } from "@/types/Response";
import type { City } from "@/types/country.types";

interface UseGetCitiesProps {
  countryId: number | null | undefined;
}

const useGetCities = ({ countryId }: UseGetCitiesProps) => {
  return useQuery({
    queryKey: [apiRoutes.cities, countryId],
    queryFn: async () => {
      const { data } = await Axios.get<Response<City[]>>(
        `${apiRoutes.cities}/${countryId}`
      );
      return data.data;
    },
    enabled: !!countryId,
  });
};

export default useGetCities;

