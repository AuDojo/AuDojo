import React, { createContext, useContext, useEffect, useState } from "react";

// Define types for our context state
interface SortContextProps {
  stepsList: number[][];
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setStepsList: React.Dispatch<React.SetStateAction<number[][]>>;
}

// Create context with default values
const SortContext = createContext<SortContextProps | undefined>(undefined);

// Custom hook for using the context
export const useSortContext = (): SortContextProps => {
  const context = useContext(SortContext);
  if (!context) {
    throw new Error("useSortContext must be used within a SortProvider");
  }
  return context;
};

export const SortProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [stepsList, setStepsList] = useState<number[][]>([]);
  const [step, setStep] = useState<number>(1);

  useEffect(() => {
    async function fetchStepsList() {
      const response = await fetch("/api/sorting/mergesort", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startArray: [7, 13, 5, 9, 10, 12, 1, 3, 2, 6, 25, 30, 40, 38, 32],
        }),
      });
      const data = await response.json();
      setStepsList(JSON.parse(data).processList);
    }

    fetchStepsList();
  }, []);

  return (
    <SortContext.Provider value={{ stepsList, step, setStep, setStepsList }}>
      {children}
    </SortContext.Provider>
  );
};
