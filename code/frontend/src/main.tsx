import { createRoot } from "react-dom/client";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home.tsx";
import MergeSort from "./pages/MergeSort.tsx";
import QuickSort from "./pages/QuickSort.tsx";
import SelectionSort from "./pages/SelectionSort.tsx";
import BubbleSort from "./pages/BubbleSort.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="mergesort" element={<MergeSort />} />
      <Route path="quicksort" element={<QuickSort />} />
      <Route path="selectionsort" element={<SelectionSort />} />
      <Route path="bubblesort" element={<BubbleSort />} />
      {/* <Route path="sortsensei/mergesort" element={<Home />} /> */}
      {/* Nested route */}
    </>
  )
);
createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);
