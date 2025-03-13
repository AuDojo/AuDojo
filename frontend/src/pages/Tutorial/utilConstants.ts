import { paths } from "@/config/paths";

interface TutorialPath {
  title: string;
  path: string;
}

export const TUT_SORTSENSEI_PATHS = [
  { title: "MergeSort", path: paths.tutorial.mergesort },
  { title: "QuickSort", path: paths.tutorial.quicksort },
  { title: "BubbleSort", path: paths.tutorial.bubblesort },
  { title: "SelectionSort", path: paths.tutorial.selectionsort },
] as const satisfies TutorialPath[];

export const TUT_SORTSENSEI_DEFAULTPATH = paths.tutorial.mergesort;

export const TUT_TREETUTOR_PATHS = [
  { title: "Left Rotation", path: paths.tutorial.l_rotate },
  { title: "Left-Right Rotation", path: paths.tutorial.lr_rotate },
  { title: "Right-Left Rotation", path: paths.tutorial.rl_rotate },
  { title: "Right Rotation", path: paths.tutorial.r_rotate },
  { title: "Delete", path: paths.tutorial.delete },
] as const satisfies TutorialPath[];

export const TUT_TREETUTOR_DEFAULTPATH = paths.tutorial.l_rotate;
