import { SortProcessList } from "./sortProcessList";

export enum SortType {
  MergeSort,
  QuickSort,
  BubbleSort,
  SelectionSort,
  UNDEFINED,
}

export class SortSensei {
  static #processList: SortProcessList | null = null;

  //constructor() {}

  /**
   * This Method is managing the callingprocess of the different Sort-Methods
   * @param list Starting list, that should be sorted
   * @param sortType The name of the sorting algorithm that should be used
   * @returns All the sorting steps in a 2D-list as a json-string in the following format: `{"processList": [[startList], [sortStep1], [sortStep2], ...]}`
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
      case SortType.BubbleSort:
        this.#bubbleSort(list);
        break;
      case SortType.SelectionSort:
        this.#selectionSort(list);
        break;

      default: //SortType = UNDEFINED -> gibt ein leeres Array zurück
        this.#processList = new SortProcessList([]);
        break;
    }

    // console.log(this.#processList.processList);
    return this.#processList.createJson();
  }

  // ------------- MergeSort -------------
  //TODO: Find a way to return the splitting Index, so that it can be shown in the frontend

  static #mergeSort(list: number[], start: number, end: number) {
    if (start < end) {
      // if (this.#processList?.checkIfSolved()) {
      //   return;
      // }

      let middle: number = Math.floor((start + end) / 2);
      this.#mergeSort(list, start, middle);
      this.#mergeSort(list, middle + 1, end);
      list = this.#merge(list, start, middle, end);

      this.#processList?.pushMergeRange(start, end);
      this.#processList?.pushList(list);
    }
  }

  static #merge(list: number[], start: number, middle: number, end: number): number[] {
    let index1: number = middle - start + 1;
    let index2: number = end - middle;

    let listLeft: number[] = [];
    for (let i = 0; i < index1; i++) {
      listLeft[i] = list[start + i];
    }
    let listRight: number[] = [];
    for (let i = 0; i < index2; i++) {
      listRight[i] = list[middle + i + 1];
    }

    let counter1 = 0;
    let counter2 = 0;
    for (let k = start; k <= end; k++) {
      if ((listLeft[counter1] <= listRight[counter2] && counter1 != index1) || counter2 == index2) {
        list[k] = listLeft[counter1];
        counter1++;
      } else {
        list[k] = listRight[counter2];
        counter2++;
      }
    }
    return list;
  }

  // ------------- QuickSort -------------
  //TODO: Find a way to use a certain method to determine the pivot-element
  //TODO: Find a way to return the pivot-element, so that it can be shown in the frontend

  static #quickSort(list: number[], start: number, end: number) {
    if (start < end) {
      // if (this.#processList?.checkIfSolved()) {
      //   return;
      // }

      let pivot_index = this.#partition(list, start, end);

      this.#processList?.pushList(list);

      this.#quickSort(list, start, pivot_index - 1);
      this.#quickSort(list, pivot_index + 1, end);
    }
  }

  static #partition(list: number[], start: number, end: number): number {
    let pivot_element = list[end];
    let partition_index = start;

    for (let j = start; j < end; j++) {
      if (list[j] <= pivot_element) {
        let temp = list[partition_index];
        list[partition_index] = list[j];
        list[j] = temp;
        partition_index++;
      }
    }

    let temp = list[partition_index];
    list[partition_index] = list[end];
    list[end] = temp;
    return partition_index;
  }

  // ------------- BubbleSort -------------

  static #bubbleSort(list: number[]) {
    for (let i = 0; i < list.length; i++) {
      if (this.#processList?.checkIfSolved()) {
        return;
      }

      for (let j = 0; j < list.length - i; j++) {
        if (list[j] > list[j + 1]) {
          let temp = list[j + 1];
          list[j + 1] = list[j];
          list[j] = temp;
        }
      }

      this.#processList?.pushList(list);
    }
  }

  // ------------- SelectionSort -------------
  static #selectionSort(list: number[]) {
    for (let i = 0; i < list.length - 1; i++) {
      if (this.#processList?.checkIfSolved()) {
        return;
      }

      let min = list[i];
      let minIndex = i;

      //Finde Minimum in Teilarray
      for (let j = i + 1; j < list.length; j++) {
        if (min > list[j]) {
          min = list[j];
          minIndex = j;
        }
      }
      //mit min Element vertauschen
      let temp = list[i];
      list[i] = min;
      list[minIndex] = temp;

      //Zwischenarray in processList reinstecken
      this.#processList?.pushList(list);
    }
  }

  /**
   * Simple test method for the SortSensei class.
   * @param list list of numbers to sort
   * Logs the sorted list to the console.
   */
  static test(list: number[], sortMode: SortType) {
    console.log(this.createSortProcessList(list, sortMode));
  }
}

// SortSensei.test([11, 13, 4, 9, 3, 5, 16, 2, 29, 21, 1],SortType.QuickSort);
SortSensei.test([7, 1, 8, 2, 3, 5], SortType.BubbleSort);

// SortSensei.test([8, 7, 6, 5, 4, 3, 2, 1],SortType.QuickSort);
// SortSensei.test([1, 2, 3, 4, 5, 6, 7, 8],SortType.QuickSort);
// SortSensei.test([4, 2, 1, 3, 8, 6, 7, 5],SortType.QuickSort);
