import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { Response } from "@/types/Response";
import type { ProductDetails } from "../types/product.types";

interface UseGetProductDetailsParams {
  productId: string | number;
  enabled?: boolean;
}

const useGetProductDetails = ({ productId, enabled = true }: UseGetProductDetailsParams) => {
  return useQuery({
    queryKey: [apiRoutes.products, productId],
    queryFn: async () => {
      const { data } = await Axios.get<Response<ProductDetails>>(
        `${apiRoutes.products}/${productId}`
      );
      return data.data;
    },
    enabled: enabled && !!productId,
  });
};

export default useGetProductDetails;

