import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import type { BlogType } from "../../types/blog.type";
import { delayOptions } from "@/lib/tanstack-react-query/delayOptions";
const useGetSingleBlog = (id: number | string) => {
  return useQuery({
    queryKey: [apiRoutes.blogs, id.toString()],
    queryFn: async () => {
      const { data } = await Axios.get(`${apiRoutes?.blogs}/${id}`);
      return data?.data as BlogType;
    },
    enabled: !!id,
    ...delayOptions,
  });
};

export default useGetSingleBlog;
