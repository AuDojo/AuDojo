import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { SortType } from "../types";

interface SortingData {
  processList: number[][];
  mergeRanges: [number, number][];
  pivotElements: [number, number][];
  selectionElements: number[];
  bubbleElements: number[];
}

async function fetchSortingSteps(array: number[], sortType: SortType) {
  const response = await fetch("/api/sorting/" + sortType, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      startArray: array,
    }),
  });
  const result = await response.json();
  return JSON.parse(result);
}

export const useSortData = (array: number[], sortType: SortType) => {
  // Fetch initially and whenever the queryKey changes
  const { data, isLoading, error } = useQuery<SortingData>({
    queryKey: ["sortingSteps", array, sortType],
    queryFn: () => fetchSortingSteps(array, sortType),

    enabled: !!array.length, // Only fetches when array has elements
  });

  // UseMemo to derive elements from the fetched DAta
  const derivedData: SortingData = useMemo(() => {
    if (!data)
      return {
        processList: [],
        mergeRanges: [],
        pivotElements: [],
        selectionElements: [],
        bubbleElements: [],
      };

    return {
      processList: data.processList,
      mergeRanges: data.mergeRanges,
      pivotElements: data.pivotElements,
      selectionElements: data.selectionElements,
      bubbleElements: data.bubbleElements,
    };
  }, [data]);

  return { derivedData, isLoading, error };
};
