"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sortSensei_1 = require("./sortSensei");
const express = require("express");
const router = express.Router(); //this router has a sublink /sorting. To access, use ourlink/sorting/mergesort for example
function parse_array(req) {
    //empfängt JSON {startArray:[...]} und wandelt in Typ number[] um
    const startArray = req.body.startArray;
    if (startArray.length > 20) {
        return [];
    }
    return startArray;
}
function convertString_to_SortType(str) {
    switch (str) {
        case "mergesort":
            return sortSensei_1.SortType.MergeSort;
        case "quicksort":
            return sortSensei_1.SortType.QuickSort;
        case "selectionsort":
            return sortSensei_1.SortType.SelectionSort;
        case "bubblesort":
            return sortSensei_1.SortType.BubbleSort;
        default:
            return sortSensei_1.SortType.UNDEFINED;
    }
}
router.post("/:sortType", (req, res) => {
    let sortType = convertString_to_SortType(req.params.sortType);
    let startArray = parse_array(req);
    let jsonObj = sortSensei_1.SortSensei.createSortProcessList(startArray, sortType);
    res.json(jsonObj);
});
module.exports = router;
