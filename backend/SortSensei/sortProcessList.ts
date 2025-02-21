import { SortingData } from "../types/SortSensei-Types";
import { SortType } from "./sortSensei";

/**
 * An object of this class can store all the steps of a sorting algorithm and can return those as a json-string.
 */
export class SortProcessList implements SortingData {
  columnsLength: number = 0;

  processList: number[][] = [];
  mergeRanges: [number, number][] = []; // Array of Tuples
  pivotElements: [number, number][] = [];
  bubbleElements: number[] = [];
  selectionElements: number[] = [];

  //: SortingData = new SortingData();

  /**
   * Creates an object in which the single steps of a sorting algorithm can be stored.
   * @param startList The starting list, which should be sorted.
   */
  constructor(startList: number[], sortType: SortType) {
    this.columnsLength = startList.length;
    this.processList[0] = startList.slice(0); // slice sorgt dafür dass pass by value anstatt von pass by reference verwendet wird.

    switch (sortType) {
      case SortType.MergeSort:
        this.mergeRanges[0] = [-1, -1];
        break;

      case SortType.QuickSort:
        this.pivotElements[0] = [-1, -1];
        break;

      default:
        break;
    }
  }

  /**
   * This method adds a list to the 2D-list with all the sorting steps
   * @param list List that should be added to the processList
   */
  pushList(list: number[]): void {
    let index = this.processList.length;
    this.processList[index] = list.slice(0); // slice sorgt dafür dass pass by value anstatt von pass by reference verwendet wird.
  }

  /**
   * This Method adds a the indeces of the start and end of the Merge-Range
   * @param start The Index of the Merge-Range start
   * @param end The Index of the Merge-Range end
   */
  pushMergeRange(start: number, end: number) {
    let index = this.processList.length;
    this.mergeRanges[index] = [start, end];

    console.log("start, end: ", this.mergeRanges[index]);
  }

  /**
   * Adds the index before the sorting step
   * @param pivot_index The Index of the pivot-Element
   */
  pushPivotElementBefore(pivot_index: number) {
    let index = this.processList.length;
    this.pivotElements[index] = [pivot_index, -1]; // The -1 is only a placeholder for pushPivotElementAfter

    console.log("pivot_index: ", this.pivotElements[index][0]);
  }

  /**
   * Adds the index after the sorting step
   * @param pivot_index The Index of the pivot-Element
   */
  pushPivotElementAfter(pivot_index: number) {
    let index = this.processList.length;
    this.pivotElements[index][1] = pivot_index;

    console.log("pivot_index: ", this.pivotElements[index][1]);
  }

  /**
   * Adds the Index of the selected element after each sorting step
   * @param selected_index Index of the selected element
   */
  pushSelectedElement(selected_index: number) {
    let index = this.selectionElements.length;
    this.selectionElements[index] = selected_index;

    console.log("selected_items: ", this.selectionElements[index]);
  }

  /**
   * Adds the Index of each swapped element
   * @param selected_index Index of the Bubbled Element
   */
  pushBubbleElement(selected_index: number) {
    let index = this.bubbleElements.length;
    this.bubbleElements[index] = selected_index;

    console.log("bubble_elements: ", this.bubbleElements[index]);
  }

  /**
   * Checks if the latest added List to this Object is already sorted
   * @returns
   * - true: is sorted
   * - false: is not sorted
   */
  checkIfSolved(): boolean {
    let lastList = this.processList[this.processList.length - 1];

    for (let index = 0; index < lastList.length - 1; index++) {
      const element = lastList[index];
      if (lastList[index] > lastList[index + 1]) {
        return false;
      }
    }

    return true;
  }

  /**
   * Returns the 2D-list with all the steps of a sorting algorithm so far recorded.
   * @returns processList
   */
  // public get processList(): number[][] {
  //   return this.processList;
  // }

  /**
   * Turns the saved lists into a json-string
   * @returns json-string in following Format: {"processList": [[startList], [sortStep1], [sortStep2], ...]}
   */
  createJson(): string {
    let obj: SortingData = {
      processList: this.processList,
      mergeRanges: this.mergeRanges,
      pivotElements: this.pivotElements,
      bubbleElements: this.bubbleElements,
      selectionElements: this.selectionElements,
    };

    console.log(obj);

    return JSON.stringify(obj);
  }

  /**
   * Für Testzwecke
   * @returns processList als 2D-String
   */
  toString(): string {
    let returnString: string = "";

    for (let i = 0; i < this.processList.length; i++) {
      for (let k = 0; k < this.columnsLength; k++) {
        returnString += this.processList[i] + " ";
      }
      returnString += "\n";
    }
    return returnString;
  }
}
