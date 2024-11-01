import { Request, Response } from "express";
import { SortSensei,SortType } from "./sortSensei";


const express = require("express");
const router = express.Router(); //this router has a sublink /sorting. To access, use ourlink/sorting/mergesort for example

function parse_array(req: Request): number[] {
  //empfängt JSON {startArray:[...]} und wandelt in Typ number[] um
  const startArray = req.body.startArray;

  if (startArray.length > 20) {
    return [];
  }
  return startArray;
}

function convertString_to_SortType(str:string): SortType {

  switch(str) {
    case "mergesort":
      return SortType.MergeSort;

    case "quicksort":
      return SortType.QuickSort;

    case "selectionsort":
      return SortType.SelectionSort;

    case "bubblesort":
      return SortType.BubbleSort;

    default:
      return SortType.UNDEFINED;  
  }
}


router.post("/:sortType",(req: Request, res: Response)=>{
  
  let sortType:SortType = convertString_to_SortType(req.params.sortType);
  let startArray: number[] = parse_array(req);
  let jsonObj = SortSensei.createSortProcessList(startArray,sortType);

  res.json(jsonObj);
});

module.exports = router;
