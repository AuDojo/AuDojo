import { MainErrorFallback } from "@/components/errors";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Loading } from "@/components/ui/loading";
import { paths } from "@/constants";
import { Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
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

export const App = () => {
  return (
    <ErrorBoundary fallback={<MainErrorFallback />}>
      <Header />
      <Footer />
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
    </ErrorBoundary>
  );
};
