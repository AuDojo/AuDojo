import { RefKeys } from "../types";

export const HIGHLIGHT_CLASS = "highlight";
//TODO : this is tutorial for mergeort
export const tutorialSteps: { title: string; content: string; key?: RefKeys }[] = [
  { title: "start.title", content: "start.content" },
  {
    title: "create.title",
    content: "create.content",
    key: "generateButtons",
  },
  {
    title: "input.title",
    content: "input.content",
    key: "sortingTable",
  },
  {
    title: "split.title",
    content: "split.content",
    key: "listRow",
  },
  {
    title: "validate.title",
    content: "validate.content",
    key: "solveButtons",
  },
  { title: "end.title", content: "end.content" },
];

export type TutorialStep = (typeof tutorialSteps)[number];
