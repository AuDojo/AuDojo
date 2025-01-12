import { DefaultOptions } from "@tanstack/react-query";

export const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes, refetch after reconnect or mount
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  },
};
