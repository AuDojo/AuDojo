import { json } from "express";

export class SortProcessList {
  #columnsLength: number = 0;
  #processList: number[][] = [];

  constructor(startList: number[]) {
    this.#columnsLength = startList.length;
    this.#processList[0] = startList.slice(0);
  }

  pushList(list: number[]): void {
    let index = this.#processList.length;

    this.#processList[index] = list.slice(0); // slice sorgt dafür dass pass by value anstatt von pass by reference verwendet wird.

    // console.log("New List: \n");
    // console.log(this.#processList);
  }

  public get processList(): number[][] {
    return this.#processList;
  }

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
