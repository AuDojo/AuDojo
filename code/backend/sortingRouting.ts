import { Request, Response } from "express";
import path from "path";

import bubbleSort from "./sortAlgorithms/bubbleSort";
import selectionSort from "./sortAlgorithms/selectionSort";
import quickSort from "./sortAlgorithms/quickSort";
import mergeSort from "./sortAlgorithms/mergeSort";

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

function convert_to_indexMap(resultArray: number[][]): { [key: string]: number[] } {
  /*nimmt den sortierten Array und wandelt den in 
  {
   "0":[...],
   "1":[...],
   ...
   "n":[...],
  }
   format { [key: string]: number[] } um, um leicht in JSON Datei umwandeln zu können
  */
  const indexMap: { [key: string]: number[] } = {};

  for (let i = 0; i < resultArray.length; i++) {
    indexMap[i.toString()] = resultArray[i];
  }

  return indexMap;
}

router.get("/mergesort", (req: Request, res: Response) => {
  //?.html ist die geladene HTML File für die MergeSort Seite
  res.sendFile(path.join(__dirname, "..", "frontend", "?.html"));
});

router.get("/quicksort", (req: Request, res: Response) => {

  res.sendFile(path.join(__dirname, "..", "frontend", "?.html"));
});

router.get("/bubblesort", (req: Request, res: Response) => {

  res.sendFile(path.join(__dirname, "..", "frontend", "?.html"));
});

router.get("/selectionsort", (req: Request, res: Response) => {

  res.sendFile(path.join(__dirname, "..", "frontend", "?.html"));
});



router.post("/mergesort", (req: Request, res: Response) => {
  /*Empfängt JSON von Frontend(mit POST-Methode) mit startArray
  dieser wird dann geparsed, sortiert und wieder in JSON umgewandelt und an Frontend gesendet
  
  ***Zum Testen führe:
     curl -H "Content-Type: application/json" -d '{"startArray":[2,3,1,4,5]}' http://localhost:5001/sorting/mergesort
     in Konsole aus
  */
  let startArray: number[] = parse_array(req);
  let sortedArray: number[][] = mergeSort(startArray);
  let mappedArray: { [key: string]: number[] } = convert_to_indexMap(sortedArray);

  res.json(JSON.stringify(mappedArray));
});

router.post("/quicksort", (req: Request, res: Response) => {

  let startArray: number[] = parse_array(req);
  let sortedArray: number[][] = quickSort(startArray);
  let mappedArray: { [key: string]: number[] } = convert_to_indexMap(sortedArray);

  res.json(JSON.stringify(mappedArray));
});

router.post("/bubblesort", (req: Request, res: Response) => {

  let startArray: number[] = parse_array(req);
  let sortedArray: number[][] = bubbleSort(startArray);
  let mappedArray: { [key: string]: number[] } = convert_to_indexMap(sortedArray);

  res.json(JSON.stringify(mappedArray));
});

router.post("/selectionsort", (req: Request, res: Response) => {
  //Test Case: [7,1,8,2,3,5], Lösung in AuD1 Skript Seite 83

  let startArray: number[] = parse_array(req);
  let sortedArray: number[][] = selectionSort(startArray);
  let mappedArray: { [key: string]: number[] } = convert_to_indexMap(sortedArray);

  res.json(JSON.stringify(mappedArray));
});

module.exports = router;
