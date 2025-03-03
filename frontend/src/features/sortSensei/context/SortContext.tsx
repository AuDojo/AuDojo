import { localStorageKeys } from "@/config/localStorage";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { createContext, ReactNode, use, useRef, useState } from "react";
import { useSortData } from "../api/postArray";
import { MAX_ARRAY_SIZE, MAX_INPUT_RANGE, MIN_ARRAY_SIZE, MIN_INPUT_RANGE, SortTypes } from "../constants";
import { SortType } from "../types";

// Define the structure of your context
interface SortContextProps {
  /** Current row in the processList */
  //TODO: Split step and setStep into separate context
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;

  /** Shared Array used in SortSensei */
  sharedArray: number[];
  /** Setter for sharedArray, also invokes fetching new backend data */
  setSharedArray: (value: number[]) => void;

  /** Reference to the current sortType */
  sortTypeRef: React.RefObject<SortType>;

  /** The solution 2d array */
  processList: number[][];
  mergeRanges: [number, number][];
  pivotElements: [number, number][];
  selectionElements: number[];
  bubbleElements: number[];

  isPending: boolean;
  /** Indicates an error */
  error: Error | null;
}

// Create context
export const SortContext = createContext<SortContextProps | undefined>(undefined);

function isValidArray(value: unknown): value is number[] {
  return (
    Array.isArray(value) &&
    value.every((item) => typeof item === "number" && item >= MIN_INPUT_RANGE && item <= MAX_INPUT_RANGE) &&
    value.length <= MAX_ARRAY_SIZE &&
    value.length >= MIN_ARRAY_SIZE
  );
}

export const SortProvider = ({ children, sortType }: { children: ReactNode; sortType: SortType }) => {
  const [step, setStep] = useState<number>(1);
  const [sharedArray, setSharedArray] = useLocalStorage<number[]>(
    localStorageKeys.sharedArray,
    [7, 13, 5, 9, 10, 12, 1, 3, 2, 6, 25, 40],
    isValidArray
  );
  // Debounce setSharedArray to avoid too many requests to backend
  // const debouncedSetSharedArray = useDebounceCallback(setSharedArray, 50);

  const sortTypeRef = useRef<SortType>(sortType ?? SortTypes.MergeSort);

  const { derivedData, isPending, error } = useSortData(sharedArray, sortType);

  return (
    <SortContext
      value={{
        ...derivedData,
        isPending,
        error,
        sharedArray,
        setSharedArray,
        sortTypeRef,
        step,
        setStep,
      }}
    >
      {children}
    </SortContext>
  );
};

// Custom hook
export const useSortContext = () => {
  const context = use(SortContext);
  if (!context) {
    throw new Error("useSortContext must be used within a SortProvider");
  }
  return context;
};
