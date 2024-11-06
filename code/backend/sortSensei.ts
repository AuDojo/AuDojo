import { SortProcessList } from "./sortProcessList";

export enum SortType {
  MergeSort,
  QuickSort,
  BubbleSort,
  SelectionSort,
  UNDEFINED
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

    console.log(this.#processList.processList);
    return this.#processList.createJson();
  }

  // ------------- MergeSort -------------
  //TODO: Find a way to return the splitting Index, so that it can be shown in the frontend

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
  //TODO: Find a way to use a certain method to determine the pivot-element
  //TODO: Find a way to return the pivot-element, so that it can be shown in the frontend

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

  static #bubbleSort(list:number[]) {
    for(let i=0;i<list.length;i++) {
      for(let j=0;j<list.length-i;j++) {
        if(list[j]>list[j+1]) {
          let temp = list[j+1]
          list[j+1] = list[j]
          list[j] = temp;

          this.#processList?.pushList(list);
        }
      }
    }
  }

  // ------------- SelectionSort -------------
  static #selectionSort(list:number[]) {

    for(let i=0;i<list.length-1;i++) {
      let min = list[i];
      let minIndex = i;
  
      //Finde Minimum in Teilarray
      for(let j= i+1;j<list.length;j++) {
        if(min > list[j]) {
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
  static test(list: number[],sortMode:SortType) {
    console.log(this.createSortProcessList(list, sortMode));
  }
}

// SortSensei.test([11, 13, 4, 9, 3, 5, 16, 2, 29, 21, 1],SortType.QuickSort);
SortSensei.test([7,1,8,2,3,5],SortType.BubbleSort);

// SortSensei.test([8, 7, 6, 5, 4, 3, 2, 1],SortType.QuickSort);
// SortSensei.test([1, 2, 3, 4, 5, 6, 7, 8],SortType.QuickSort);
// SortSensei.test([4, 2, 1, 3, 8, 6, 7, 5],SortType.QuickSort);
