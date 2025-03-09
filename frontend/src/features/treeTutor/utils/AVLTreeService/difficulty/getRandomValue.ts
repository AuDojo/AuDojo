// TODO: Find better name for file. Maybe move code to excerciseUtils.ts
import { TreeNode } from "../../treeUtils";
import { createDifficultyArray, getRandomInt } from "./difficultyTools";

export let deletion_array: number[] = [];
export let first_time_deletion = true;

export let insertion_array: number[] = [];
export let first_time_insertion = true;

/**
 * Gets a random value out of an array with all possible values for the wanted difficulty_level and type.
 *
 * ---
 * First creates that array when it is not already existing
 * @param node root-node of the tree
 * @param difficulty_level Level of the difficulty
 * - -1: random,
 * - 0: no restructure,
 * - 1: one restructure,
 * - 2: two restructures
 * @param type "deletion" or "insertion"
 * @returns Random value with wanted characteristics
 */
export function getRandomValue(node: TreeNode, difficulty_level: number, type: "deletion" | "insertion"): number {
  switch (type) {
    case "deletion": {
      console.log("======== Start Deletion ========");

      // Created the deletion_array when it's not already existing
      if (first_time_deletion) {
        deletion_array = createDifficultyArray(node, difficulty_level, type);
        first_time_deletion = false;

        console.log("======== Difficulty Level Array ========");
        console.log("Array: ", deletion_array);
      }

      const random_number = getRandomInt(deletion_array.length);

      console.log("======== Random Number Generated ========");
      console.log("value", deletion_array[random_number]);
      console.log("================================");

      return deletion_array[random_number];
      break;
    }

    case "insertion": {
      console.log("======== Start Insertion ========");

      // Created the insertion_array when it's not already existing
      if (first_time_insertion) {
        insertion_array = createDifficultyArray(node, difficulty_level, type);
        first_time_insertion = false;

        console.log("======== Difficulty Level Array ========");
        console.log("Array: ", insertion_array);
      }

      const random_number = getRandomInt(insertion_array.length);

      console.log("======== Random Number Generated ========");
      console.log("Value", insertion_array[random_number]);
      console.log("=================================");

      return insertion_array[random_number];
      break;
    }

    default:
      return -1;
      break;
  }
}

/**
 * Resets the created arrays for deletion and insertion
 *
 * ---
 * Needs to be called,
 * - when a new random tree gets created
 * - when the difficulty level gets changed
 */
export function resetArrays() {
  deletion_array = [];
  first_time_deletion = true;
  insertion_array = [];
  first_time_insertion = true;
}
