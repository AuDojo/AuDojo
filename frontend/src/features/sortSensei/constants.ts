import { SortType } from "./types";

export const MAX_ARRAY_SIZE = 15;
export const MIN_ARRAY_SIZE = 2;

export const MIN_INPUT_RANGE = 1;
export const MAX_INPUT_RANGE = 99;

export const SortTypes = {
  MergeSort: "mergesort",
  QuickSort: "quicksort",
  BubbleSort: "bubblesort",
  SelectionSort: "selectionsort",
} as const satisfies Record<string, SortType>;
