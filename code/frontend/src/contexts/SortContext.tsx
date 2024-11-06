import React, { createContext, useEffect, useState } from "react";

// Define types for our context state
export interface SortContextProps {
  stepsList: number[][];
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setStepsList: React.Dispatch<React.SetStateAction<number[][]>>;
  fetchStepsList: (array: number[]) => Promise<void>;
}

// Create context with default values
export const SortContext = createContext<SortContextProps | undefined>(undefined);

export const SortProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stepsList, setStepsList] = useState<number[][]>([]);
  const [step, setStep] = useState<number>(1);

  async function fetchStepsList(array: number[] = [7, 13, 5, 9, 10, 12, 1, 3, 2, 6, 25, 30, 40, 38, 32]) {
    try {
      const sortType:string = location.pathname.split("/")[1] || "mergesort";
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
    } catch (error) {
      console.log("Error fetching sorting steps: ", error);
    }
  }
  useEffect(() => {
    fetchStepsList();
  }, []);

  return <SortContext.Provider value={{ stepsList, step, setStep, setStepsList, fetchStepsList }}>{children}</SortContext.Provider>;
};
