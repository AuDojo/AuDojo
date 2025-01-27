import { SortType } from "./types";

export const MAX_ARRAY_SIZE = 15;
export const MIN_ARRAY_SIZE = 2;

export const MIN_INPUT_RANGE = 1;
export const MAX_INPUT_RANGE = 40;

export const SortTypes: Record<string, SortType> = {
  MergeSort: "mergesort",
  QuickSort: "quicksort",
  BubbleSort: "bubblesort",
  SelectionSort: "selectionsort",
};
