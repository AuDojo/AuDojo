import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { SortContext } from ".";
import { SortType } from "../constants";

const defaultArray = [7, 13, 5, 9, 10, 12, 1, 3, 2, 6, 25, 40];

export const SortProvider = ({ children }: { children: ReactNode }) => {
  // State management
  const [stepsList, setStepsList] = useState<number[][]>([]);
  const [step, setStep] = useState<number>(1);
  const [mergeRanges, setMergeRanges] = useState<[number, number][]>([]);
  const [inputCellValues, setInputCellValues] = useState<string[][]>([]);
  const [cellValidation, setCellValidation] = useState<(boolean | null)[][]>([]);
  const [pivotElement, setPivotElement] = useState<[number, number][]>([]);
  const [selectionElement, setSelectionElement] = useState<number[]>([]);
  const [bubbleElement, setBubbleElement] = useState<number[]>([]);
  const [sharedArray, setSharedArray] = useState<number[]>(() => {
    const storedArray = localStorage.getItem("sharedArray");
    return storedArray != undefined ? JSON.parse(storedArray) : defaultArray;
  });

  // References
  const inputCellsRef = useRef<HTMLInputElement[][]>([]);
  const sortTypeRef = useRef<SortType>(SortType.MergeSort);

  useEffect(() => {
    localStorage.setItem("sharedArray", JSON.stringify(sharedArray));
  }, [sharedArray]);

  // Helper: Initialize state for fetched data
  const initializeStates = (
    steps: number[][],
    mergeRange: [number, number][] | null,
    pivotElement: [number, number][] | null,
    selectionElement: number[],
    bubbleElement: number[]
  ) => {
    setStepsList(steps);
    setInputCellValues(steps.map((step, index) => (index === 0 ? [...step] : new Array(step.length).fill(""))));
    setCellValidation(steps.map((step) => new Array(step.length).fill(null)));
    inputCellsRef.current = steps.map((step) => new Array(step.length).fill(null));

    // Initialize merge ranges if applicable
    if (mergeRange) {
      mergeRange[0] = [-1, -1];
      setMergeRanges(mergeRange);
    }
    if (pivotElement) {
      pivotElement[0] = [-1, -1];
      setPivotElement(pivotElement);
    }
    if (selectionElement) {
      // const newSelectionElement = [-1, ...selectionElement]
      setSelectionElement(selectionElement);
    }
    if (bubbleElement) {
      setBubbleElement(bubbleElement);
    }
  };

  // Helper: Set the sort type based on the route or default to MergeSort
  const determineSortType = () => {
    const sortType = location.pathname.split("/")[1];
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

  const fetchStepsList = useCallback(
    async (array: number[] = sharedArray) => {
      setSharedArray(array); // Update shared array
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
        const { processList, mergeRange, pivotElement, selectionElement, bubbleElement } = JSON.parse(data);
        const fetchedStepsList: number[][] = processList;

        determineSortType();
        initializeStates(fetchedStepsList, mergeRange, pivotElement, selectionElement, bubbleElement);
      } catch (error) {
        console.log("Error fetching sorting steps: ", error);
      }
    },
    [sharedArray]
  );

  // Fetch on mount or location change
  useEffect(() => {
    fetchStepsList();
  }, [sharedArray]);

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
        sharedArray,
        setSharedArray,
        pivotElement,
        setPivotElement,
        selectionElement,
        bubbleElement,
        setBubbleElement,
      }}
    >
      {children}
    </SortContext.Provider>
  );
};
