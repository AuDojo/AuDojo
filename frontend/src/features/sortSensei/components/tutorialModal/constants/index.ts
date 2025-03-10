import { RefKeys } from "../types";

export interface TutorialStep {
  title: string;
  content: string;
  key?: RefKeys;
}

export const HIGHLIGHT_CLASS = "highlight";
//TODO : this is tutorial for mergesort
export const tutorialSteps: TutorialStep[] = [
  { title: "start.title", content: "start.content" },
  {
    title: "create.title",
    content: "create.content",
    key: "generateButtons",
  },
  {
    title: "split.title",
    content: "split.content",
    key: "listRow",
  },
  {
    title: "input.title",
    content: "input.content",
    key: "sortingTable",
  },
  {
    title: "validate.title",
    content: "validate.content",
    key: "solveButtons",
  },
  { title: "end.title", content: "end.content" },
] as const;
