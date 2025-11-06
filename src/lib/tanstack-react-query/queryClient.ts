import { QueryClient } from "@tanstack/react-query";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 4,
      retryDelay: 1000,
      refetchOnReconnect: true,
    },
  },
});

export default queryClient;
