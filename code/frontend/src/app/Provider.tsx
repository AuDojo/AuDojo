import { Loading } from "@/components/ui/loading";
import { queryConfig } from "@/lib/reactQuery";
import { MainErrorFallback } from "@components/errors";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { compress, decompress } from "lz-string";
import { ReactNode, Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: queryConfig,
    })
  );

  const persister = createSyncStoragePersister({
    storage: window.localStorage,
    serialize: (data) => compress(JSON.stringify(data)),
    deserialize: (data) => JSON.parse(decompress(data)),
  });

  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
          {/* <QueryClientProvider client={queryClient}> */}
          {import.meta.env.DEV && <ReactQueryDevtools />}
          {children}
          {/* </QueryClientProvider> */}
        </PersistQueryClientProvider>
      </ErrorBoundary>
    </Suspense>
  );
};
