export interface SortingData {
  processList: number[][];
  mergeRanges: [number, number][]; // Array of Tuples
  pivotElements: [number, number][];
  bubbleElements: number[];
  selectionElements: number[];
}
