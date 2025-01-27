import { Step } from "@features/tutorial/types";

function whitecolor(): string {
  return "#f4f4f9";
}

function redcolor(): string {
  return "rgb(248, 215, 218)";
}

export const selection_steps: Step[] = [
  {
    description: "look_04", //"Betracte Array Elemente 0...4"
    data: [{ array: [13, 10, 12, 1, 6], color: whitecolor() }],
  },

  {
    description: "look_04",
    data: [{ array: [13, 10, 12, 1, 6], color: redcolor() }],
  },

  {
    description: "find_smallest_04", //"Finde kleinstes Element in Array 0...4"
    data: [{ array: [13, 10, 12, 1, 6], color: whitecolor() }],
  },

  {
    description: "find_smallest_04",
    data: [
      { array: [13, 10, 12], color: whitecolor() },
      { array: [1], color: redcolor() },
      { array: [6], color: whitecolor() },
    ],
  },

  {
    description: "swap", //"Tausche mit erstem Element"
    data: [
      { array: [13, 10, 12], color: whitecolor() },
      { array: [1], color: redcolor() },
      { array: [6], color: whitecolor() },
    ],
  },

  {
    description: "swap",
    data: [
      { array: [13], color: redcolor() },
      { array: [10, 12], color: whitecolor() },
      { array: [1], color: redcolor() },
      { array: [6], color: whitecolor() },
    ],
  },

  {
    description: "look_14", //"Betrachte Teilarray Elemente 1...4"
    data: [{ array: [1, 10, 12, 13, 6], color: whitecolor() }],
  },

  {
    description: "look_14", //"Betrachte Teilarray Elemente 1...4"
    data: [
      { array: [1], color: whitecolor() },
      { array: [10, 12, 13, 6], color: redcolor() },
    ],
  },

  {
    description: "look_14",
    data: [
      { array: [1], color: whitecolor() },
      { array: [10, 12, 13, 6], color: whitecolor() },
    ],
  },

  {
    description: "find_smallest_14", //"Finde kleinstes Element in Teilarray 1...4"
    data: [
      { array: [1], color: whitecolor() },
      { array: [10, 12, 13], color: whitecolor() },
      { array: [6], color: redcolor() },
    ],
  },

  {
    description: "swap",
    data: [
      { array: [1], color: whitecolor() },
      { array: [10, 12, 13], color: whitecolor() },
      { array: [6], color: redcolor() },
    ],
  },

  {
    description: "swap",
    data: [
      { array: [1], color: whitecolor() },
      { array: [10], color: redcolor() },
      { array: [12, 13], color: whitecolor() },
      { array: [6], color: redcolor() },
    ],
  },

  {
    description: "look_24", //"Betracte Teilarray Elemente 2...4"
    data: [{ array: [1, 6, 12, 13, 10], color: whitecolor() }],
  },

  {
    description: "look_24",
    data: [
      { array: [1, 6], color: whitecolor() },
      { array: [12, 13, 10], color: redcolor() },
    ],
  },

  {
    description: "find_smallest_24", //"Finde kleinstes Element in Teilarray 2...4"
    data: [
      { array: [1, 6], color: whitecolor() },
      { array: [12, 13, 10], color: whitecolor() },
    ],
  },

  {
    description: "find_smallest_24",
    data: [
      { array: [1, 6], color: whitecolor() },
      { array: [12, 13], color: whitecolor() },
      { array: [10], color: redcolor() },
    ],
  },

  {
    description: "swap",
    data: [
      { array: [1, 6], color: whitecolor() },
      { array: [12, 13], color: whitecolor() },
      { array: [10], color: redcolor() },
    ],
  },

  {
    description: "swap",
    data: [
      { array: [1, 6], color: whitecolor() },
      { array: [12], color: redcolor() },
      { array: [13], color: whitecolor() },
      { array: [10], color: redcolor() },
    ],
  },

  {
    description: "look_34", //"Betrachte Teilarray Elemente 3...4"
    data: [{ array: [1, 6, 10, 13, 12], color: whitecolor() }],
  },

  {
    description: "look_34",
    data: [
      { array: [1, 6, 10], color: whitecolor() },
      { array: [13, 12], color: redcolor() },
    ],
  },

  {
    description: "find_smallest_34", //"Finde kleinstes Element in Teilarray 3...4"
    data: [
      { array: [1, 6, 10], color: whitecolor() },
      { array: [13, 12], color: whitecolor() },
    ],
  },

  {
    description: "find_smallest_34",
    data: [
      { array: [1, 6, 10], color: whitecolor() },
      { array: [13], color: whitecolor() },
      { array: [12], color: redcolor() },
    ],
  },

  {
    description: "swap",
    data: [
      { array: [1, 6, 10], color: whitecolor() },
      { array: [13], color: whitecolor() },
      { array: [12], color: redcolor() },
    ],
  },

  {
    description: "swap",
    data: [
      { array: [1, 6, 10], color: whitecolor() },
      { array: [13], color: redcolor() },
      { array: [12], color: redcolor() },
    ],
  },

  {
    description: "finish",
    data: [{ array: [1, 6, 10, 12, 13], color: whitecolor() }],
  },
];

export default selection_steps;
