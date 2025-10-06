export const delayOptions = {
  staleTime: 1000 * 60 * 10,
  gcTime: 1000 * 60 * 30,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchInterval: false,
} as const;
