export interface BarDataGeneral {
  value: number;
  index: number;
  previousIndex: number;
  isSorted: boolean;
}
export interface SortVisualizerProps {
  currentArray: number[];
  numSteps: number;
  i: number;
}
export interface MergeSortBarData extends BarDataGeneral {
  isMerged: boolean;
}
export interface MergeSortProps extends SortVisualizerProps {
  previousArray: number[];
  mergeRanges: [number, number][];
}
export interface BubbleSortBarData extends BarDataGeneral {
  isSwapped: boolean;
}
export interface BubbleSortProps extends SortVisualizerProps {
  bubbleElement: number[];
}
export interface QuickSortBarData extends BarDataGeneral {
  isPivot: boolean;
}

export interface QuickSortProps extends SortVisualizerProps {
  previousArray: number[];
  pivotElement: [number, number][];
}
export interface SelectionSortBarData extends BarDataGeneral {
  isSelected: boolean;
  isLeftUnsorted: boolean;
}
export interface SelectionSortProps extends SortVisualizerProps {
  selectionElement: number[];
}
