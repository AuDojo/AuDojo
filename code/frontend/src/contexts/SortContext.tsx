import React, { createContext, useEffect, useState } from "react";

// Define types for our context state
export interface SortContextProps {
  stepsList: number[][];
  mergeRanges: [number, number][];
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setStepsList: React.Dispatch<React.SetStateAction<number[][]>>;
  fetchStepsList: (array: number[]) => Promise<void>;
}

//TODO: Into Backend
const getMergeRanges = (
  mergeRanges: [number, number][],
  p: number,
  r: number
) => {
  if (p < r) {
    const q: number = Math.floor((p + r) / 2);
    getMergeRanges(mergeRanges, p, q);
    getMergeRanges(mergeRanges, q + 1, r);

    // After both halves are processed, record the current merge range
    mergeRanges.push([p, r]);
  }
};

// Create context with default values
export const SortContext = createContext<SortContextProps | undefined>(
  undefined
);

export const SortProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [stepsList, setStepsList] = useState<number[][]>([]);
  const [step, setStep] = useState<number>(1);
  const [mergeRanges, setMergeRanges] = useState<[number, number][]>([]);

  async function fetchStepsList(
    array: number[] = [7, 13, 5, 9, 10, 12, 1, 3, 2, 6, 25, 30, 40, 38, 32]
  ) {
    try {
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
      setStepsList(JSON.parse(data).processList);
      //TODO: Into Backend
      const ranges: [number, number][] = [];
      getMergeRanges(ranges, 0, array.length - 1);
      ranges.unshift([-1, -1]);
      setMergeRanges(ranges);
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
        setStep,
        setStepsList,
        fetchStepsList,
      }}
    >
      {children}
    </SortContext.Provider>
  );
};
