import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Loading } from "@/components/ui/loading";
import { paths } from "@/config";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

// Lazy imports of pages to reduce bundle size
const Home = lazy(() => import("@pages/Home"));
const Kontakt = lazy(() => import("@pages/Kontakt"));
const MergeSort = lazy(() => import("@pages/MergeSort"));
const QuickSort = lazy(() => import("@pages/QuickSort"));
const BubbleSort = lazy(() => import("@pages/BubbleSort"));
const SelectionSort = lazy(() => import("@pages/SelectionSort"));
const Tutorial = lazy(() => import("@pages/Tutorial"));
const Datenschutz = lazy(() => import("@pages/Datenschutz"));
const Impressum = lazy(() => import("@pages/Impressum"));
const NotFound = lazy(() => import("@/pages/NotFound/NotFound"));
// const TreeTutor = lazy(() => import("@pages/TreeTutor"));

export const AppRouter = () => {
  return (
    <>
      <Header />
      <main>
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
            <Route path="*" element={<NotFound />} /> {/* Invalid route*/}
          </Routes>
        </Suspense>
      </main>
      <Footer />
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
