import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { DefaultOptions, OmitKeyof } from "@tanstack/react-query";
import { PersistQueryClientOptions } from "@tanstack/react-query-persist-client";
import { compress, decompress } from "lz-string";

export const queryConfig = {
  queries: {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10, // 10 minutes, refetch after reconnect or mount
    gcTime: 1000 * 60 * 15, // 15 minutes, garbage collection of unused/inactive cache data. Same or higher than staleTime
  },
} as const satisfies DefaultOptions;

export const persistOptions = {
  persister: createSyncStoragePersister({
    storage: window.localStorage,
    serialize: (data) => compress(JSON.stringify(data)),
    deserialize: (data) => JSON.parse(decompress(data)),
  }),
  maxAge: 1000 * 60 * 60 * 24, // 15 minutes, max-allowed age of the cache in local Storage. Same or lower than gcTime
} as const satisfies OmitKeyof<PersistQueryClientOptions, "queryClient">;
