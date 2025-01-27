import { Step } from "@features/tutorial/types";

function whitecolor(): string {
  return "#f4f4f9";
}

function redcolor(): string {
  return "rgb(248, 215, 218)";
}

// Example data representing steps
const merge_steps: Step[] = [
  {
    description: "divide", //"Teile das Array in Hälften auf"
    data: [{ array: [13, 10, 12, 1, 6, 2, 25], color: whitecolor() }],
  },
  {
    description: "divide_red", //"Teile das rot makierte (Teil)Array"
    data: [{ array: [13, 10, 12, 1, 6, 2, 25], color: redcolor() }],
  },
  {
    description: "divide",
    data: [
      { array: [13, 10, 12, 1], color: whitecolor() },
      { array: [6, 2, 25], color: whitecolor() },
    ],
  },
  {
    description: "divide_red",
    data: [
      { array: [13, 10, 12, 1], color: redcolor() },
      { array: [6, 2, 25], color: whitecolor() },
    ],
  },
  {
    description: "divide",
    data: [
      { array: [13, 10], color: whitecolor() },
      { array: [12, 1], color: whitecolor() },
      { array: [6, 2, 25], color: whitecolor() },
    ],
  },
  {
    description: "divide_red",
    data: [
      { array: [13, 10], color: redcolor() },
      { array: [12, 1], color: whitecolor() },
      { array: [6, 2, 25], color: whitecolor() },
    ],
  },
  {
    description: "sortmerge_title", //"Sort & Merge"
    data: [
      { array: [13], color: whitecolor() },
      { array: [10], color: whitecolor() },
      { array: [12, 1], color: whitecolor() },
      { array: [6, 2, 25], color: whitecolor() },
    ],
  },
  {
    description: "sort_and_merge", //"Sotieren und füge das rot markierte Teilarray zusammen"
    data: [
      { array: [13], color: redcolor() },
      { array: [10], color: redcolor() },
      { array: [12, 1], color: whitecolor() },
      { array: [6, 2, 25], color: whitecolor() },
    ],
  },
  {
    description: "divide",
    data: [
      { array: [10, 13], color: whitecolor() },
      { array: [12, 1], color: whitecolor() },
      { array: [6, 2, 25], color: whitecolor() },
    ],
  },
  {
    description: "divide",
    data: [
      { array: [10, 13], color: whitecolor() },
      { array: [12, 1], color: redcolor() },
      { array: [6, 2, 25], color: whitecolor() },
    ],
  },
  {
    description: "sortmerge_title",
    data: [
      { array: [10, 13], color: whitecolor() },
      { array: [12], color: whitecolor() },
      { array: [1], color: whitecolor() },
      { array: [6, 2, 25], color: whitecolor() },
    ],
  },
  {
    description: "sort_and_merge",
    data: [
      { array: [10, 13], color: whitecolor() },
      { array: [12], color: redcolor() },
      { array: [1], color: redcolor() },
      { array: [6, 2, 25], color: whitecolor() },
    ],
  },
  {
    description: "sortmerge_title",
    data: [
      { array: [10, 13], color: whitecolor() },
      { array: [1, 12], color: whitecolor() },
      { array: [6, 2, 25], color: whitecolor() },
    ],
  },
  {
    description: "sort_and_merge",
    data: [
      { array: [10, 13], color: redcolor() },
      { array: [1, 12], color: redcolor() },
      { array: [6, 2, 25], color: whitecolor() },
    ],
  },
  {
    description: "divide",
    data: [
      { array: [1, 10, 12, 13], color: whitecolor() },
      { array: [6, 2, 25], color: whitecolor() },
    ],
  },
  {
    description: "divide_red",
    data: [
      { array: [1, 10, 12, 13], color: whitecolor() },
      { array: [6, 2, 25], color: redcolor() },
    ],
  },
  {
    description: "divide",
    data: [
      { array: [1, 10, 12, 13], color: whitecolor() },
      { array: [6, 2], color: whitecolor() },
      { array: [25], color: whitecolor() },
    ],
  },
  {
    description: "divide_red",
    data: [
      { array: [1, 10, 12, 13], color: whitecolor() },
      { array: [6, 2], color: redcolor() },
      { array: [25], color: whitecolor() },
    ],
  },
  {
    description: "sortmerge_title",
    data: [
      { array: [1, 10, 12, 13], color: whitecolor() },
      { array: [6], color: whitecolor() },
      { array: [2], color: whitecolor() },
      { array: [25], color: whitecolor() },
    ],
  },
  {
    description: "sort_and_merge",
    data: [
      { array: [1, 10, 12, 13], color: whitecolor() },
      { array: [6], color: redcolor() },
      { array: [2], color: redcolor() },
      { array: [25], color: whitecolor() },
    ],
  },
  {
    description: "sortmerge_title",
    data: [
      { array: [1, 10, 12, 13], color: whitecolor() },
      { array: [2, 6], color: whitecolor() },
      { array: [25], color: whitecolor() },
    ],
  },
  {
    description: "sort_and_merge",
    data: [
      { array: [1, 10, 12, 13], color: whitecolor() },
      { array: [2, 6], color: redcolor() },
      { array: [25], color: redcolor() },
    ],
  },
  {
    description: "sortmerge_title",
    data: [
      { array: [1, 10, 12, 13], color: whitecolor() },
      { array: [2, 6, 25], color: whitecolor() },
    ],
  },
  {
    description: "sort_and_merge",
    data: [
      { array: [1, 10, 12, 13], color: redcolor() },
      { array: [2, 6, 25], color: redcolor() },
    ],
  },
  { description: "finish", data: [{ array: [1, 2, 6, 10, 12, 13, 25], color: whitecolor() }] },
];

export default merge_steps;
