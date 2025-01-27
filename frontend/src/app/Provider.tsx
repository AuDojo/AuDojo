import { Loading } from "@/components/ui/loading";
import { persistOptions, queryConfig } from "@/lib/reactQuery";
import { MainErrorFallback } from "@components/errors";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { ReactNode, Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface AppProviderProps {
  children: ReactNode;
}

/**
 * The root provider for the entire app.
 *
 * This component wraps the entire app and provides the following features:
 * 1. Suspense handling for the entire app. When a component suspends, the entire app shows a loading indicator.
 * 2. Error boundary handling for the entire app. When an uncaught error occurs, the entire app shows an error message.
 * 3. Query caching using React Query.
 * 4. Query persistence using React Query Persist Client.
 * 5. If the app is running in development mode, it also enables the React Query Devtools.
 *
 * @param children The children components of the app.
 * @returns The root provider for the entire app.
 */
export const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: queryConfig,
    })
  );

  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <PersistQueryClientProvider client={queryClient} persistOptions={persistOptions}>
          {/* <QueryClientProvider client={queryClient}> */}
          {import.meta.env.DEV && <ReactQueryDevtools />}
          {children}
          {/* </QueryClientProvider> */}
        </PersistQueryClientProvider>
      </ErrorBoundary>
    </Suspense>
  );
};
