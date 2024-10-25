import { json } from "express";

export class SortProcessList {
  #columnsLength: number = 0;
  #processList: number[][] = [];

  constructor(startList: number[]) {
    this.#columnsLength = startList.length;
    this.#processList[0] = startList;
  }

  pushList(list: number[]): void {
    //this.#processList = this.#processList.concat(list);

    let index = this.#processList.length;

    this.#processList[index] = list.slice(0); // slice sorgt dafür dass pass by value anstatt von pass by reference verwendet wird.

    console.log("New List: \n");
    console.log(this.#processList);
  }

  public get processList(): number[][] {
    return this.#processList;
  }

  /*
  create2DList(): number[][] {
    let returnList: number[][] = [];
    let rowsLength: number = this.#processList.length / this.#columnsLength;
    for (let i = 0; i < rowsLength; i++) {
      returnList[i] = [];
      for (let k = 0; k < this.#columnsLength; k++) {
        returnList[i][k] = this.#processList[k + i * this.#columnsLength];
      }
    }
    return returnList;
  }
    */

  //TODO: Methode vervollständigen
  createJson(): string {
    let obj = {};

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
