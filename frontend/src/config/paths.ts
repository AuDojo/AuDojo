export const paths = {
  home: "/",
  kontakt: "/kontakt",

  // Legal
  datenschutz: "https://www.tu-braunschweig.de/datenschutzerklaerung",
  impressum: "https://www.tu-braunschweig.de/impressum",

  // SortSensei
  mergeSort: "/mergesort",
  quickSort: "/quicksort",
  bubbleSort: "/bubblesort",
  selectionSort: "/selectionsort",

  //TreeTutor
  treeTutor: "/treetutor",

  // Tutorial
  tutorial: {
    mergesort: "/tutorial/mergesort",
    quicksort: "/tutorial/quicksort",
    bubblesort: "/tutorial/bubblesort",
    selectionsort: "/tutorial/selectionsort",
    l_rotate: "/tutorial/L",
    lr_rotate: "/tutorial/LR",
    rl_rotate: "/tutorial/RL",
    r_rotate: "/tutorial/R",
    delete: "/tutorial/delete",
  },
} as const;

//TODO Path type for key
// export type Path = typeof paths key;
