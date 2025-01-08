//TODO: Not used yet

import { Loading } from "@/components/ui/loading";
import { paths } from "@/constants";
import { Suspense, useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const convert = (m: any) => {
  const { default: Component } = m;
  return {
    element: (
      <Suspense fallback={<Loading />}>
        <Component />
      </Suspense>
    ),
  };
};
export const createAppRouter = () =>
  createBrowserRouter([
    { path: paths.home, lazy: () => import("@pages/Home").then(convert) },
    {
      path: paths.sortSensei.mergeSort,
      lazy: () => import("@pages/MergeSort").then(convert),
    },
    {
      path: paths.sortSensei.quickSort,
      lazy: () => import("@pages/QuickSort").then(convert),
    },
    {
      path: paths.sortSensei.bubbleSort,
      lazy: () => import("@pages/BubbleSort").then(convert),
    },
    {
      path: paths.sortSensei.selectionSort,
      lazy: () => import("@pages/SelectionSort").then(convert),
    },

    { path: "*", lazy: () => import("@/pages/NotFound/NotFound").then(convert) },
  ]);

export const AppRouter = () => {
  const router = useMemo(() => createAppRouter(), []);

  return <RouterProvider router={router} />;
};
