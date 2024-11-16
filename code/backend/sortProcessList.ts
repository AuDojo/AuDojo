import { json } from "express";

/**
 * An object of this class can store all the steps of a sorting algorithm and can return those as a json-string.
 */
export class SortProcessList {
  #columnsLength: number = 0;
  #processList: number[][] = [];
  #mergeRange: [number, number][] = []; // Array of Tuples
  #pivotElement: number[] = [];

  /**
   * Creates an object in which the single steps of a sorting algorithm can be stored.
   * @param startList The starting list, which should be sorted.
   */
  constructor(startList: number[]) {
    this.#columnsLength = startList.length;
    this.#processList[0] = startList.slice(0); // slice sorgt dafür dass pass by value anstatt von pass by reference verwendet wird.
  }

  /**
   * This method adds a list to the 2D-list with all the sorting steps
   * @param list List that should be added to the processList
   */
  pushList(list: number[]): void {
    let index = this.#processList.length;
    this.#processList[index] = list.slice(0); // slice sorgt dafür dass pass by value anstatt von pass by reference verwendet wird.
  }

  pushMergeRange(start: number, end: number) {
    let index = this.#processList.length;
    this.#mergeRange[index] = [start, end];

    console.log("start, end: ", this.#mergeRange[index]);
  }

  pushPivotElement(pivot: number) {
    let index = this.#processList.length;
    this.#pivotElement[index] = pivot;

    console.log("pivot: ", this.#pivotElement[index]);
  }

  checkIfSolved(): boolean {
    let lastList = this.#processList[this.#processList.length - 1];

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
  public get processList(): number[][] {
    return this.#processList;
  }

  /**
   * Turns the saved lists into a json-string
   * @returns json-string in following Format: {"processList": [[startList], [sortStep1], [sortStep2], ...]}
   */
  createJson(): string {
    let mergeRange = this.#mergeRange.length == 0 ? null : this.#mergeRange;
    let pivotElement = this.#pivotElement.length == 0 ? null : this.#pivotElement;

    let obj = {
      processList: this.#processList,
      mergeRange: mergeRange,
      pivotElement: pivotElement,
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

    for (let i = 0; i < this.#processList.length; i++) {
      for (let k = 0; k < this.#columnsLength; k++) {
        returnString += this.#processList[i] + " ";
      }
      returnString += "\n";
    }
    return returnString;
  }
}
