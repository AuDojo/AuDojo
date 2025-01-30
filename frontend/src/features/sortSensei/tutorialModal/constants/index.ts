import { RefKeys } from "../types";

export const HIGHLIGHT_CLASS = "highlight";
//TODO : this is tutorial for mergeort
export const tutorialSteps: { title: string; content: string; key?: RefKeys }[] = [
  { title: "Welcome 👋", content: "Welcome to SortSensei! Let's get started." },
  {
    title: "1. 🚀 Create Your Array",
    content: "Create a custom array or generate a random one.",
    key: "generateButtons",
  },
  {
    title: "2. ✍️ Input Your Solution",
    content: `Enter your sorting solution in the table. (Not all elements need to be entered)" `,
    key: "sortingTable",
  },
  {
    title: "3. 🖍️ Split the array",
    content: "Click on the <strong>Line</strong> between numbers to split the array.",
    key: "listRow",
  },
  {
    title: "4. ✅ Validate Your Solution",
    content: "Use these buttons to validate your solution.",
    key: "solveButtons",
  },
  { title: "🎉  Ready to Sort!", content: "Now you can start sorting!" },
];

export type TutorialStep = (typeof tutorialSteps)[number];
