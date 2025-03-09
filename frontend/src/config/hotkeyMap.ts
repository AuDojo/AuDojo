export const HOTKEYS = {
  Enter: "Enter",
  BackButton: "J",
  NextButton: "K",
  PlayButton: "Space",
  CheckAll: "A",
  Reset: "S",
  RandomButton: "R",
  RandomInput: "Enter",
  Custom: "C",
  Close: ["C", "Escape"],
  tutorial: {
    next: ["enter", "right"],
    prev: ["shift+enter", "left"],
    close: "esc",
  },
  table: {
    moveUp: ["up", "shift+enter"],
    moveDown: ["down", "enter"],
    moveLeft: "left",
    moveRight: "right",
    unfocus: "esc",
  },
  treeTutor: {
    nextTemplate: ["right"],
    prevTemplate: ["left"],
    submit: ["enter"],
  },
} as const;
