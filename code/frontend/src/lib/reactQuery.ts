import { DefaultOptions } from "@tanstack/react-query";

export const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10, // 10 minutes, refetch after reconnect or mount
    gcTime: 1000 * 60 * 15, // 15 minutes, garbage collection of unused/inactive cache data
  },
};
