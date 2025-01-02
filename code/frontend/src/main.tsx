import React from "react";
import { createRoot } from "react-dom/client";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { SortProvider } from "./contexts";
import "./index.css";
import { BubbleSort, Datenschutz, Home, Impressum, MergeSort, QuickSort, SelectionSort, Tutorial, Kontakt } from "./pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="mergesort" element={<MergeSort />} />
      <Route path="quicksort" element={<QuickSort />} />
      <Route path="bubblesort" element={<BubbleSort />} />
      <Route path="selectionsort" element={<SelectionSort />} />
      <Route path="tutorial" element={<Tutorial />} />
      <Route path="datenschutz" element={<Datenschutz />} />
      <Route path="impressum" element={<Impressum />} />
      <Route path="Kontakt" element={<Kontakt />} />
      {/* <Route path="sortsensei/mergesort" element={<Home />} /> */}
      {/* Nested route */}
    </>
  )
);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SortProvider>
      <RouterProvider router={router} />
    </SortProvider>
  </React.StrictMode>
);
