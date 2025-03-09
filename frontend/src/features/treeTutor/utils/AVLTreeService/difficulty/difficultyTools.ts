import { TreeNode } from "@/features/treeTutor/utils/treeUtils";
import { getBalanceFactor } from "../getters";
import { createInsertionArray } from "./insertDifficulty";
import { createDeletionArray } from "./deleteDifficulty";

let deletion_array: number[] = [];
let first_time_deletion = true;

let insertion_array: number[] = [];
let first_time_insertion = true;

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function getRandomValue(node: TreeNode, difficulty_level: number, type: "deletion" | "insertion"): number {
  switch (type) {
    case "deletion": {
      if (first_time_deletion) {
        deletion_array = createArray(node, difficulty_level, type);
        first_time_deletion = false;

        console.log("-------- Difficulty Level Array --------");
        console.log("Array: ", deletion_array);
      }

      const random_number = getRandomInt(deletion_array.length);
      console.log("-------- Random Number Generated --------");
      console.log("value", deletion_array[random_number]);

      return deletion_array[random_number];
      break;
    }
    case "insertion": {
      if (first_time_insertion) {
        insertion_array = createArray(node, difficulty_level, type);
        first_time_insertion = false;

        console.log("-------- Difficulty Level Array --------");
        console.log("Array: ", insertion_array);
      }

      const random_number = getRandomInt(insertion_array.length);
      console.log("-------- Random Number Generated --------");
      console.log("value", insertion_array[random_number]);

      return insertion_array[random_number];
      break;
    }

    default:
      return -1;
      break;
  }
}

export function resetArrays() {
  deletion_array = [];
  first_time_deletion = true;
  insertion_array = [];
  first_time_insertion = true;
}

export function createArray(node: TreeNode, difficulty_level: number, type: "deletion" | "insertion"): number[] {
  if (difficulty_level == -1) {
    difficulty_level = getRandomInt(3);
  }

  switch (type) {
    case "deletion":
      return createDeletionArray(node, difficulty_level);
      break;
    case "insertion":
      return createInsertionArray(node, difficulty_level);
      break;

    default:
      return [];
      break;
  }
}

export function createCopyOfTree(node: TreeNode | null) {
  if (node === null) {
    return null;
  }

  const new_node: TreeNode = {
    id: node.id,
    value: node.value,
    depth: node.depth,
    height: node.height,
    position: node.position,
    balanceFactor: node.balanceFactor,
    children: [createCopyOfTree(node.children[0]), createCopyOfTree(node.children[1])],
  };

  return new_node;
}

/**
 * Essentially Inorder
 * @param node
 * @param excistingNodes
 * @returns
 */
export function getExistingNodes(node: TreeNode | null, excistingNodes: number[]) {
  if (node == null) {
    return;
  }

  getExistingNodes(node.children[0], excistingNodes);
  excistingNodes.push(node.value);
  getExistingNodes(node.children[1], excistingNodes);
}

export function getNumberOfRotations(node: TreeNode, rootRef: TreeNode | null): number {
  if (!node) return 0;
  if (!rootRef) return 0;

  const balance = getBalanceFactor(node);

  if (balance >= -1 && balance <= 1) return 0;

  if (balance > 1 && node.children[0] && getBalanceFactor(node.children[0]) >= 0) return 1;
  if (balance < -1 && node.children[1] && getBalanceFactor(node.children[1]) <= 0) return 1;

  if (balance > 1 && node.children[0] && getBalanceFactor(node.children[0]) < 0) return 2;
  if (balance < -1 && node.children[1] && getBalanceFactor(node.children[1]) > 0) return 2;

  return 0;
}
