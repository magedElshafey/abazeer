import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { delayOptions } from "@/lib/tanstack-react-query/delayOptions";
import type { BlogType } from "../../types/blog.type";
const useGetBlogs = () => {
  return useQuery({
    queryKey: [apiRoutes?.blogs],
    queryFn: async () => {
      const { data } = await Axios.get(apiRoutes?.blogs);
      return data?.data as BlogType[];
    },
    ...delayOptions,
  });
};

export default useGetBlogs;
