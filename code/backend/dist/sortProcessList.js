"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortProcessList = void 0;
/**
 * An object of this class can store all the steps of a sorting algorithm and can return those as a json-string.
 */
class SortProcessList {
    #columnsLength = 0;
    #processList = [];
    /**
     * Creates an object in which the single steps of a sorting algorithm can be stored.
     * @param startList The starting list, which should be sorted.
     */
    constructor(startList) {
        this.#columnsLength = startList.length;
        this.#processList[0] = startList.slice(0); // slice sorgt dafür dass pass by value anstatt von pass by reference verwendet wird.
    }
    /**
     * This method adds a list to the 2D-list with all the sorting steps
     * @param list List that should be added to the processList
     */
    pushList(list) {
        let index = this.#processList.length;
        this.#processList[index] = list.slice(0); // slice sorgt dafür dass pass by value anstatt von pass by reference verwendet wird.
    }
    /**
     * Returns the 2D-list with all the steps of a sorting algorithm so far recorded.
     * @returns processList
     */
    get processList() {
        return this.#processList;
    }
    /**
     * Turns the saved lists into a json-string
     * @returns json-string in following Format: {"processList": [[startList], [sortStep1], [sortStep2], ...]}
     */
    createJson() {
        let obj = { processList: this.#processList };
        return JSON.stringify(obj);
    }
    /**
     * Für Testzwecke
     * @returns processList als 2D-String
     */
    toString() {
        let returnString = "";
        for (let i = 0; i < this.#processList.length; i++) {
            for (let k = 0; k < this.#columnsLength; k++) {
                returnString += this.#processList[i] + " ";
            }
            returnString += "\n";
        }
        return returnString;
    }
}
exports.SortProcessList = SortProcessList;
