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
  static createSortProcessList(list: number[], sortType: SortType): number[][] {
    this.#processList = new SortProcessList(list);

    switch (sortType) {
      case SortType.MergeSort:
        this.#mergeSort(list, 0, list.length - 1);
        break;

      //TODO: Kommentare in den Cases entfernen, sobald die dazugehörigen Methoden fertig sind
      case SortType.QuickSort:
        //this.#quickSort();
        break;
      case SortType.BubbleSort:
        //this.#bubbleSort();
        break;
      case SortType.SelectionSort:
        //this.#selectionSort();
        break;

      default:
        break;
    }

    return this.#processList.processList;
  }

  static #mergeSort(list: number[], p: number, r: number) {
    if (p < r) {
      let q: number = Math.floor((p + r) / 2);
      this.#mergeSort(list, p, q);
      this.#mergeSort(list, q + 1, r);
      list = this.#merge(list, p, q, r);
      this.#processList?.pushList(list);
      //console.log(this.#processList?.create2DList()); // Für Testzwecke
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

  static test(list: number[]) {
    console.log(this.createSortProcessList(list, SortType.MergeSort));
  }
}

//SortSensei.test([8, 4, 9, 6, 3, 11, 7, 12]);
SortSensei.test([11, 13, 4, 9, 3, 5, 16, 2, 29, 21, 1]);
