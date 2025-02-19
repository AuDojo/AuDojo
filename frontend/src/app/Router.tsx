import { Layout } from "@/components/layouts/Layout";
import { Loading } from "@/components/ui/loading";
import { paths } from "@/config";
import { BASE_URL } from "@/config/env";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Lazy imports of pages to reduce bundle size
const Home = lazy(() => import("@/pages/Home/Home"));
const Kontakt = lazy(() => import("@/pages/Kontakt/Kontakt"));
const MergeSort = lazy(() => import("@/pages/SortSensei/MergeSort"));
const QuickSort = lazy(() => import("@/pages/SortSensei/QuickSort"));
const BubbleSort = lazy(() => import("@/pages/SortSensei/BubbleSort"));
const SelectionSort = lazy(() => import("@/pages/SortSensei/SelectionSort"));
const Tutorial = lazy(() => import("@/pages/Tutorial"));
const Datenschutz = lazy(() => import("@/pages/Legal/Datenschutz"));
const Impressum = lazy(() => import("@/pages/Legal/Impressum"));
const NotFound = lazy(() => import("@/pages/NotFound/NotFound"));
const TreeTutor = lazy(() => import("@/pages/TreeTutor/TreeTutor"));

export const AppRouter = () => {
  return (
    <>
      <BrowserRouter basename={BASE_URL}>
        <Layout>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path={paths.home} element={<Home />} />
              <Route path={paths.kontakt} element={<Kontakt />} />
              <Route path={paths.mergeSort} element={<MergeSort />} />
              <Route path={paths.quickSort} element={<QuickSort />} />
              <Route path={paths.bubbleSort} element={<BubbleSort />} />
              <Route path={paths.selectionSort} element={<SelectionSort />} />
              <Route path={paths.tutorial} element={<Tutorial />} />
              <Route path={paths.kontakt} element={<Kontakt />} />
              <Route path={paths.datenschutz} element={<Datenschutz />} />
              <Route path={paths.impressum} element={<Impressum />} />
              <Route path={paths.treeTutor} element={<TreeTutor />} />
              <Route path="*" element={<NotFound />} /> {/* Invalid route*/}
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </>
  );
};

// import { paths } from "@/config";
// import { QueryClient } from "@tanstack/react-query";
// import { useMemo } from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";

// const convert = (queryClient: QueryClient) => (module: any) => {
//   const { clientLoader, default: Component } = module;
//   return {
//     loader: clientLoader?.(queryClient), // React Query loader integration
//     Component,
//   };
// };
// export const createAppRouter = (queryClient: QueryClient) =>
//   createBrowserRouter([
//     { path: paths.home, lazy: () => import("@/pages/Home").then(convert) },
//     {
//       path: paths.mergeSort,
//       lazy: () => import("@/pages/MergeSort").then(convert),
//     },
//     {
//       path: paths.quickSort,
//       lazy: () => import("@/pages/QuickSort").then(convert),
//     },
//     {
//       path: paths.bubbleSort,
//       lazy: () => import("@/pages/BubbleSort").then(convert),
//     },
//     {
//       path: paths.selectionSort,
//       lazy: () => import("@/pages/SelectionSort").then(convert),
//     },

//     { path: "*", lazy: () => import("@/pages/NotFound/NotFound").then(convert) },
//   ]);

// export const AppRouter = () => {
//   const router = useMemo(() => createAppRouter(), []);

//   return <RouterProvider router={router} />;
// };
