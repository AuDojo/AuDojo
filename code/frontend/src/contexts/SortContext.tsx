import React, { createContext, useEffect, useRef, useState } from "react";
import { SortType } from "../constants";

// Define types for our context state
export interface SortContextProps {
  stepsList: number[][]; // solution list from the backend
  mergeRanges: [number, number][]; // For Mergesort
  step: number; // Current step we are on (1 to stepsList.length)
  inputCellValues: string[][]; // Holds the values in the input cells as strings
  cellValidation: (boolean | null)[][]; // True for correct, false for incorrect, null for neutral
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setStepsList: React.Dispatch<React.SetStateAction<number[][]>>;
  setInputCellValues: React.Dispatch<React.SetStateAction<string[][]>>;
  setCellValidation: React.Dispatch<React.SetStateAction<(boolean | null)[][]>>;
  fetchStepsList: (array: number[]) => Promise<void>; // Fetch the solution from the backend
  inputCellsRef: React.MutableRefObject<HTMLInputElement[][]>;
  sortTypeRef: React.MutableRefObject<SortType>;
}

// Create context with default values
export const SortContext = createContext<SortContextProps | undefined>(
  undefined
);

export const SortProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // State management
  const [stepsList, setStepsList] = useState<number[][]>([]);
  const [step, setStep] = useState<number>(1);
  const [mergeRanges, setMergeRanges] = useState<[number, number][]>([]);
  const [inputCellValues, setInputCellValues] = useState<string[][]>([]);
  const [cellValidation, setCellValidation] = useState<(boolean | null)[][]>(
    []
  );

  // References
  const inputCellsRef = useRef<HTMLInputElement[][]>([]);
  const sortTypeRef = useRef<SortType>(SortType.MergeSort);

  // Helper: Initialize state for fetched data
  const initializeStates = (
    steps: number[][],
    mergeRange: [number, number][] | null
  ) => {
    setStepsList(steps);
    setInputCellValues(steps.map((step) => new Array(step.length).fill("")));
    setCellValidation(steps.map((step) => new Array(step.length).fill(null)));
    inputCellsRef.current = steps.map((step) =>
      new Array(step.length).fill(null)
    );

    // Initialize merge ranges if applicable
    if (mergeRange) {
      mergeRange[0] = [-1, -1];
      setMergeRanges(mergeRange);
    }
  };

  // Helper: Set the sort type based on the route or default to MergeSort
  const determineSortType = (sortType: string) => {
    switch (sortType) {
      case "mergesort": {
        sortTypeRef.current = SortType.MergeSort;
        break;
      }
      case "quicksort": {
        sortTypeRef.current = SortType.QuickSort;
        break;
      }
      case "bubblesort": {
        sortTypeRef.current = SortType.BubbleSort;
        break;
      }
      case "selectionsort": {
        sortTypeRef.current = SortType.SelectionSort;
      }
    }
  };

  async function fetchStepsList(
    array: number[] = [7, 13, 5, 9, 10, 12, 1, 3, 2, 6, 25, 30, 40, 38, 32]
  ) {
    try {
      // POST Request to the backend to get the processList
      const sortType: string = location.pathname.split("/")[1] || "mergesort";
      const response = await fetch("/api/sorting/" + sortType, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startArray: array,
        }),
      });
      const data = await response.json();
      const { processList, mergeRange, pivotElement } = JSON.parse(data);
      const fetchedStepsList: number[][] = processList;

      determineSortType(sortType);
      initializeStates(fetchedStepsList, mergeRange);
    } catch (error) {
      console.log("Error fetching sorting steps: ", error);
    }
  }
  useEffect(() => {
    fetchStepsList();
  }, []);

  return (
    <SortContext.Provider
      value={{
        stepsList,
        mergeRanges,
        step,
        inputCellValues,
        cellValidation,
        setStep,
        setStepsList,
        setInputCellValues,
        setCellValidation,
        fetchStepsList,
        inputCellsRef,
        sortTypeRef,
      }}
    >
      {children}
    </SortContext.Provider>
  );
};
