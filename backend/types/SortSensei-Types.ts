export interface SortingData {
  processList: number[][];
  mergeRanges: [number, number][]; // Array of Tuples
  pivotElements: [number, number | null][];
  bubbleElements: number[];
  selectionElements: number[];
}
