import { Request, Response, Router } from "express";
import { SortSensei, SortType } from "./sortSensei";

const router = Router(); //this router has a sublink /sorting. To access, use ourlink/sorting/mergesort for example

/**
 * empfängt JSON {startArray:[...]} und wandelt in Typ number[] um
 * @param req The given Object of the frontend
 * @returns Only the array of the StartArray
 */
function parse_array(req: Request): number[] {
  const startArray = req.body.startArray;

  if (startArray.length > 20) {
    return [];
  }
  return startArray;
}

function convertString_to_SortType(str: string): SortType {
  switch (str) {
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

router.post("/:sortType", (req: Request, res: Response) => {
  let sortType: SortType = convertString_to_SortType(req.params.sortType);
  let startArray: number[] = parse_array(req);
  let jsonObj = SortSensei.createSortProcessList(startArray, sortType);

  res.json(jsonObj);
});

module.exports = router;
