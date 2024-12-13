import { RefKeys } from "@src/contexts";

export const HIGHLIGHT_CLASS = "highlight";

export const tutorialSteps: { title: string; content: string; key?: RefKeys }[] = [
  { title: "Welcome", content: "Welcome to SortSensei! Let's get started." },
  { title: "Step 0", content: "Use these buttons to generate Arrays.", key: "generateButtons" },
  { title: "Step 1", content: "This is the sorting table. You can input values here." },
  { title: "Step 2", content: "Use these buttons to validate your solution." },
  { title: "Finish", content: "Congratulations! You're ready to sort." },
];
