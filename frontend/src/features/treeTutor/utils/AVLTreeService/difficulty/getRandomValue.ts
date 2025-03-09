// TODO: Find better name for file. Maybe move code to excerciseUtils.ts
import { DifficultyLevel, OperationType } from "@/features/treeTutor/types";
import { TreeNode } from "../../treeUtils";
import {
  createDifficultyArray,
  getRandomInt,
  turnDifficultyIntoNumber,
  turnNumberIntoDifficulty,
} from "./difficultyTools";

let deletion_arrays: number[][] = [];
let insertion_arrays: number[][] = [];
let first_time = true;

// let current_difficulty_level: DifficultyLevel = null;

// let deletion_array: number[] = [];
// let first_time_deletion = true;

// let insertion_array: number[] = [];
// let first_time_insertion = true;

export function createAllDifficultyArrays(node: TreeNode) {
  for (let index = 0; index < 3; index++) {
    const difficulty_level: DifficultyLevel = turnNumberIntoDifficulty(index);
    deletion_arrays[index] = createDifficultyArray(node, difficulty_level, "DELETE");
  }
  for (let index = 0; index < 3; index++) {
    const difficulty_level: DifficultyLevel = turnNumberIntoDifficulty(index);
    insertion_arrays[index] = createDifficultyArray(node, difficulty_level, "INSERT");
  }
}

export function getDifficultyArray(node: TreeNode, difficulty_level: DifficultyLevel, type: OperationType): number[] {
  if (difficulty_level === null) {
    return [];
  }
  if (first_time) {
    createAllDifficultyArrays(node);
    first_time = false;
  }
  return type === "DELETE" ? deletion_arrays[difficulty_level] : insertion_arrays[difficulty_level];
}

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
export function getRandomValue(node: TreeNode, difficulty_level: DifficultyLevel, type: OperationType): number {
  if (first_time) {
    createAllDifficultyArrays(node);
    console.log("All Deletion Arrays: ", deletion_arrays);
    console.log("All Insertion Arrays: ", insertion_arrays);

    first_time = false;
  }

  switch (type) {
    case "DELETE": {
      console.log("======== Start Deletion ========");

      // // Created the deletion_array when it's not already existing
      // if (first_time_deletion || current_difficulty_level !== difficulty_level) {
      //   deletion_array = createDifficultyArray(node, difficulty_level, type);
      //   first_time_deletion = false;
      //   current_difficulty_level = difficulty_level;

      //   console.log("======== Difficulty Level Array ========");
      //   console.log("Array: ", deletion_array);
      // }

      const index: number = turnDifficultyIntoNumber(difficulty_level);
      const random_number = getRandomInt(deletion_arrays[index].length);

      console.log("======== Random Number Generated ========");
      console.log("value", deletion_arrays[index][random_number]);
      console.log("================================");

      return deletion_arrays[index][random_number];
      break;
    }

    case "INSERT": {
      console.log("======== Start Insertion ========");

      // // Created the insertion_array when it's not already existing
      // if (first_time_insertion) {
      //   insertion_array = createDifficultyArray(node, difficulty_level, type);
      //   first_time_insertion = false;

      //   console.log("======== Difficulty Level Array ========");
      //   console.log("Array: ", insertion_array);
      // }

      const index: number = turnDifficultyIntoNumber(difficulty_level);
      const random_number = getRandomInt(insertion_arrays[index].length);

      console.log("======== Random Number Generated ========");
      console.log("value", insertion_arrays[index][random_number]);
      console.log("================================");

      return insertion_arrays[index][random_number];
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
  // deletion_array = [];
  // first_time_deletion = true;
  // insertion_array = [];
  // first_time_insertion = true;

  deletion_arrays = [];
  insertion_arrays = [];
  first_time = false;
}
