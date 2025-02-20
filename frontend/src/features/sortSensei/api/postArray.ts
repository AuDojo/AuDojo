import { API_URL } from "@/config/env";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { useSortContext } from "../context";
import { SortType } from "../types";
import { SortingData } from "@backend/types/SortSensei-Types"; // TODO: Check if import works correctly

// TODO: Remove Comment if working
// interface SortingData {
//   processList: number[][];
//   mergeRanges: [number, number][];
//   pivotElements: [number, number][];
//   selectionElements: number[];
//   bubbleElements: number[];
// }

/**
 * Fetches the sorting steps from the server.
 *
 * @param {number[]} array The array to be sorted.
 * @param {SortType} sortType The sort type to use.
 * @returns The sorting steps as a JSON string.
 */
export async function fetchSortingSteps(array: number[], sortType: SortType) {
  const response = await fetch(`${API_URL}/sorting/` + sortType, {
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

// Helper function
const getQueryKey = (array: number[], sortType: SortType) => ["sortingSteps", array, sortType];

/**
 * A hook that fetches sorting data from the server.
 * The hook will return the fetched data, a boolean indicating if the data is being fetched,
 * and an error if the fetch fails.
 *
 * The hook memoizes the fetched data so that it is not re-computed unless the array or sort type changes.
 * The hook also uses react-query to cache the data.
 *
 * @param {number[]} array The array to be sorted.
 * @param {SortType} sortType The sort type to use.
 * @returns An object containing the derived data, a boolean indicating if the data is being fetched,
 * and an error if the fetch fails.
 */
export const useSortData = (array: number[], sortType: SortType) => {
  // Fetch initially and whenever the queryKey changes
  const { data, isPending, error } = useQuery<SortingData>({
    // Use the query key to cache the data
    queryKey: getQueryKey(array, sortType),
    // Call the function to fetch the data
    queryFn: () => fetchSortingSteps(array, sortType),

    // Only fetches when array has elements
    enabled: !!array.length,
  });

  const derivedData: SortingData = useMemo(() => {
    if (!data) {
      // Return an empty object if the data is not yet fetched
      return {
        processList: [],
        mergeRanges: [],
        pivotElements: [],
        selectionElements: [],
        bubbleElements: [],
      };
    }

    // Return the derived data
    return {
      processList: data.processList,
      mergeRanges: data.mergeRanges,
      pivotElements: data.pivotElements,
      selectionElements: data.selectionElements,
      bubbleElements: data.bubbleElements,
    };
  }, [data]);

  return { derivedData, isPending, error };
};

/**
 * A hook that returns a function to get cached sorting data.
 * The returned function takes an array of numbers as an argument and returns the cached sorting data.
 * If no data is cached, the function will return undefined.
 */
export const useGetCachedData = () => {
  const { sortTypeRef } = useSortContext();
  const queryClient = useQueryClient();

  /**
   * The function to get the cached sorting data.
   * @param newArray The array of numbers to get the cached sorting data for.
   * @returns The cached sorting data or undefined if no data is cached.
   */
  const getCachedData = useCallback(
    (newArray: number[]) => {
      // The query client is used to either return cached data or fetch new data.
      return queryClient.getQueryData<SortingData>(getQueryKey(newArray, sortTypeRef.current));
    },
    [queryClient, sortTypeRef]
  );

  return { getCachedData };
};
