import { RefKeys } from "@/contexts";

export const HIGHLIGHT_CLASS = "highlight";

export const tutorialSteps: { title: string; content: string; key?: RefKeys }[] = [
  { title: "Welcome 👋", content: "Welcome to SortSensei! Let's get started." },
  {
    title: "1. 🚀 Create Your Array",
    content: "Create a custom array or generate a random one.",
    key: "generateButtons",
  },
  {
    title: "2. ✍️ Input Your Solution",
    content: "Enter your sorting solution in the table.",
    key: "sortingTable",
  },
  {
    title: "3. ✅ Validate Your Solution",
    content: "Use these buttons to validate your solution.",
    key: "solveButtons",
  },
  { title: "🎉  Ready to Sort!", content: "Now you can start sorting!" },
];
