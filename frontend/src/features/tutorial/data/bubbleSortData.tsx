import { Step } from "@/features/tutorial/types";

function whitecolor(): string {
  return "#f4f4f9";
}

function redcolor(): string {
  return "rgb(248, 215, 218)";
}

const bubble_steps: Step[] = [
  {
    description: "first_iteration", //Tausche ein Element mit nächstem, falls A[i] > A[i+1] für i=0...3
    data: [{ array: [13, 10, 12, 14, 6], color: whitecolor() }],
  },
  {
    description: "first_iteration",
    data: [
      { array: [13, 10], color: whitecolor() },
      { array: [12, 14, 6], color: whitecolor() },
    ],
  },
  {
    description: "first_iteration",
    data: [
      { array: [13, 10], color: redcolor() },
      { array: [12, 14, 6], color: whitecolor() },
    ],
  },
  {
    description: "first_iteration",
    data: [
      { array: [10, 13], color: whitecolor() },
      { array: [12, 14, 6], color: whitecolor() },
    ],
  },
  {
    description: "first_iteration",
    data: [
      { array: [10], color: whitecolor() },
      { array: [13, 12], color: whitecolor() },
      { array: [14, 6], color: whitecolor() },
    ],
  },
  {
    description: "first_iteration",
    data: [
      { array: [10], color: whitecolor() },
      { array: [13, 12], color: redcolor() },
      { array: [14, 6], color: whitecolor() },
    ],
  },
  {
    description: "first_iteration",
    data: [
      { array: [10], color: whitecolor() },
      { array: [12, 13], color: whitecolor() },
      { array: [14, 6], color: whitecolor() },
    ],
  },
  {
    description: "first_iteration",
    data: [
      { array: [10, 12], color: whitecolor() },
      { array: [13, 14], color: whitecolor() },
      { array: [6], color: whitecolor() },
    ],
  },
  {
    description: "first_iteration",
    data: [
      { array: [10, 12], color: whitecolor() },
      { array: [13, 14], color: redcolor() },
      { array: [6], color: whitecolor() },
    ],
  },
  {
    description: "first_iteration",
    data: [
      { array: [10, 12], color: whitecolor() },
      { array: [13, 14], color: whitecolor() },
      { array: [6], color: whitecolor() },
    ],
  },
  {
    description: "first_iteration",
    data: [
      { array: [10, 12, 13], color: whitecolor() },
      { array: [14, 6], color: whitecolor() },
    ],
  },
  {
    description: "first_iteration",
    data: [
      { array: [10, 12, 13], color: whitecolor() },
      { array: [14, 6], color: redcolor() },
    ],
  },
  {
    description: "first_iteration",
    data: [
      { array: [10, 12, 13], color: whitecolor() },
      { array: [6, 14], color: whitecolor() },
    ],
  },
  {
    description: "second_iteration", //"Tausche ein Element mit nächstem, falls A[i] > A[i+1] für i=0...2"
    data: [{ array: [10, 12, 13, 6, 14], color: whitecolor() }],
  },
  {
    description: "second_iteration",
    data: [
      { array: [10, 12], color: whitecolor() },
      { array: [13, 6, 14], color: whitecolor() },
    ],
  },
  {
    description: "second_iteration",
    data: [
      { array: [10, 12], color: redcolor() },
      { array: [13, 6, 14], color: whitecolor() },
    ],
  },
  {
    description: "second_iteration",
    data: [
      { array: [10, 12], color: whitecolor() },
      { array: [13, 6, 14], color: whitecolor() },
    ],
  },
  {
    description: "second_iteration",
    data: [
      { array: [10], color: whitecolor() },
      { array: [12, 13], color: whitecolor() },
      { array: [6, 14], color: whitecolor() },
    ],
  },
  {
    description: "second_iteration",
    data: [
      { array: [10], color: whitecolor() },
      { array: [12, 13], color: redcolor() },
      { array: [6, 14], color: whitecolor() },
    ],
  },
  {
    description: "second_iteration",
    data: [
      { array: [10], color: whitecolor() },
      { array: [12, 13], color: whitecolor() },
      { array: [6, 14], color: whitecolor() },
    ],
  },
  {
    description: "second_iteration",
    data: [
      { array: [10, 12], color: whitecolor() },
      { array: [13, 6], color: whitecolor() },
      { array: [14], color: whitecolor() },
    ],
  },
  {
    description: "second_iteration",
    data: [
      { array: [10, 12], color: whitecolor() },
      { array: [13, 6], color: redcolor() },
      { array: [14], color: whitecolor() },
    ],
  },
  {
    description: "second_iteration",
    data: [
      { array: [10, 12], color: whitecolor() },
      { array: [6, 13], color: whitecolor() },
      { array: [14], color: whitecolor() },
    ],
  },
  {
    description: "third_iteration", //"Tausche ein Element mit nächstem, falls A[i] > A[i+1] für i=0...1"
    data: [{ array: [10, 12, 6, 13, 14], color: whitecolor() }],
  },
  {
    description: "third_iteration",
    data: [
      { array: [10, 12], color: whitecolor() },
      { array: [6, 13, 14], color: whitecolor() },
    ],
  },
  {
    description: "third_iteration",
    data: [
      { array: [10, 12], color: redcolor() },
      { array: [6, 13, 14], color: whitecolor() },
    ],
  },
  {
    description: "third_iteration",
    data: [
      { array: [10, 12], color: whitecolor() },
      { array: [6, 13, 14], color: whitecolor() },
    ],
  },
  {
    description: "third_iteration",
    data: [
      { array: [10], color: whitecolor() },
      { array: [12, 6], color: whitecolor() },
      { array: [13, 14], color: whitecolor() },
    ],
  },
  {
    description: "third_iteration",
    data: [
      { array: [10], color: whitecolor() },
      { array: [12, 6], color: redcolor() },
      { array: [13, 14], color: whitecolor() },
    ],
  },
  {
    description: "third_iteration",
    data: [
      { array: [10], color: whitecolor() },
      { array: [6, 12], color: whitecolor() },
      { array: [13, 14], color: whitecolor() },
    ],
  },
  {
    description: "fourth_iteration", //"Tausche ein Element mit nächstem, falls A[i] > A[i+1] für i=0...0"
    data: [{ array: [10, 6, 12, 13, 14], color: whitecolor() }],
  },
  {
    description: "fourth_iteration",
    data: [
      { array: [10, 6], color: whitecolor() },
      { array: [12, 13, 14], color: whitecolor() },
    ],
  },
  {
    description: "fourth_iteration",
    data: [
      { array: [10, 6], color: redcolor() },
      { array: [12, 13, 14], color: whitecolor() },
    ],
  },
  {
    description: "fourth_iteration",
    data: [
      { array: [6, 10], color: whitecolor() },
      { array: [12, 13, 14], color: whitecolor() },
    ],
  },
  { description: "finish", data: [{ array: [6, 10, 12, 13, 14], color: whitecolor() }] },
];

export default bubble_steps;
