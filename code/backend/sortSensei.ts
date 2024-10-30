import { SortProcessList } from "./sortProcessList";

enum SortType {
  MergeSort,
  QuickSort,
  BubbleSort,
  SelectionSort,
}

export class SortSensei {
  static #processList: SortProcessList | null = null;

  //constructor() {}

  /**
   * This Method is managing the callingprocess of the different Sort-Methods
   * @param list
   * @param sortType
   * @returns
   */
  static createSortProcessList(list: number[], sortType: SortType): string {
    this.#processList = new SortProcessList(list);

    console.log("---------- Start with sorting ----------");
    switch (sortType) {
      case SortType.MergeSort:
        this.#mergeSort(list, 0, list.length - 1);
        break;
      case SortType.QuickSort:
        this.#quickSort(list, 0, list.length - 1);
        break;

      //TODO: Kommentare in den Cases entfernen, sobald die dazugehörigen Methoden fertig sind
      case SortType.BubbleSort:
        //this.#bubbleSort();
        break;
      case SortType.SelectionSort:
        //this.#selectionSort();
        break;

      default:
        break;
    }

    console.log(this.#processList.processList);
    return this.#processList.createJson();
  }

  // ------------- MergeSort -------------

  static #mergeSort(list: number[], p: number, r: number) {
    if (p < r) {
      let q: number = Math.floor((p + r) / 2);
      this.#mergeSort(list, p, q);
      this.#mergeSort(list, q + 1, r);
      list = this.#merge(list, p, q, r);
      this.#processList?.pushList(list);
    }
  }

  static #merge(list: number[], p: number, q: number, r: number): number[] {
    let n1: number = q - p + 1;
    let n2: number = r - q;

    let listLeft: number[] = [];
    for (let i = 0; i < n1; i++) {
      listLeft[i] = list[p + i];
    }
    let listRight: number[] = [];
    for (let i = 0; i < n2; i++) {
      listRight[i] = list[q + i + 1];
    }

    let i = 0;
    let j = 0;
    for (let k = p; k <= r; k++) {
      if ((listLeft[i] <= listRight[j] && i != n1) || j == n2) {
        list[k] = listLeft[i];
        i++;
      } else {
        list[k] = listRight[j];
        j++;
      }
    }
    return list;
  }

  // ------------- QuickSort -------------

  static #quickSort(list: number[], p: number, r: number) {
    if (p < r) {
      let q = this.#partition(list, p, r);
      this.#processList?.pushList(list);
      this.#quickSort(list, p, q - 1);
      this.#quickSort(list, q + 1, r);
    }
  }

  static #partition(list: number[], p: number, r: number): number {
    let x = list[r];
    let i = p - 1;
    for (let j = p; j < r; j++) {
      if (list[j] <= x) {
        i++;
        let temp = list[i];
        list[i] = list[j];
        list[j] = temp;
      }
    }

    i++;
    let temp = list[i];
    list[i] = list[r];
    list[r] = temp;
    return i;
  }

  // ------------- BubbleSort -------------

  // ------------- SelectionSort -------------

  /**
   * Simple test method for the SortSensei class.
   * @param list list of numbers to sort
   * Logs the sorted list to the console.
   */
  static test(list: number[]) {
    console.log(this.createSortProcessList(list, SortType.QuickSort));
  }
}

// SortSensei.test([11, 13, 4, 9, 3, 5, 16, 2, 29, 21, 1]);
SortSensei.test([2, 8, 7, 1, 3, 5, 6, 4]);

// SortSensei.test([8, 7, 6, 5, 4, 3, 2, 1]);
// SortSensei.test([1, 2, 3, 4, 5, 6, 7, 8]);
// SortSensei.test([4, 2, 1, 3, 8, 6, 7, 5]);
