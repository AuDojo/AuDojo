import { createRoot } from "react-dom/client";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home.tsx";
import MergeSort from "./pages/MergeSort.tsx";
import SortSensei from "./pages/SortSensei.tsx";
import QuickSort from "./pages/QuickSort.tsx";
import BubbleSort from "./pages/BubbleSort.tsx";
import SelectionSort from "./pages/SelectionSort.tsx";
import Tutorial from "./pages/Tutorial.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="mergesort" element={<MergeSort />} />
      <Route path="quicksort" element={<QuickSort />} />
      <Route path="bubblesort" element={<BubbleSort />} />
      <Route path="selectionsort" element={<SelectionSort />} />
      <Route path="tutorial" element={<Tutorial />}/>
      {/* <Route path="sortsensei/mergesort" element={<Home />} /> */}
      {/* Nested route */}
    </>
  )
);
createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);
