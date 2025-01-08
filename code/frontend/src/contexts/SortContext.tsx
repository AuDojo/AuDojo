import React, { createContext } from "react";
import { SortType } from "../constants";

// Define types for our context state
export interface SortContextProps {
  stepsList: number[][]; // solution list from the backend
  mergeRanges: [number, number][]; // For Mergesort
  step: number; // Current step we are on (1 to stepsList.length)
  inputCellValues: string[][]; // Holds the values in the input cells as strings
  cellValidation: (boolean | null)[][]; // True for correct, false for incorrect, null for neutral
  sharedArray: number[];
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setStepsList: React.Dispatch<React.SetStateAction<number[][]>>;
  setInputCellValues: React.Dispatch<React.SetStateAction<string[][]>>;
  setCellValidation: React.Dispatch<React.SetStateAction<(boolean | null)[][]>>;
  setSharedArray: React.Dispatch<React.SetStateAction<number[]>>;
  fetchStepsList: (array: number[]) => Promise<void>; // Fetch the solution from the backend
  inputCellsRef: React.RefObject<HTMLInputElement[][]>;
  sortTypeRef: React.RefObject<SortType>;
  pivotElement: [number, number][];
  setPivotElement: React.Dispatch<React.SetStateAction<[number, number][]>>;
  selectionElement: number[];
  bubbleElement: number[];
  setBubbleElement: React.Dispatch<React.SetStateAction<number[]>>;
}

// Create context with default values
export const SortContext = createContext<SortContextProps | undefined>(undefined);
