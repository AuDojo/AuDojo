import { TreeNode } from "@/features/treeTutor/utils/treeUtils";
import { getBalanceFactor } from "../getters";
import { createInsertionArray } from "./insertDifficulty";
import { createDeletionArray } from "./deleteDifficulty";

let difficulty_array: number[] = [];
let first_time = true;

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function getRandomValue(node: TreeNode, difficulty_level: number, type: "deletion" | "insertion") {
  if (first_time) {
    console.log("-------- Difficulty Level Array --------");
    console.log(difficulty_array);

    difficulty_array = createArray(node, difficulty_level, type);
    first_time = false;
  }
  const random_number = getRandomInt(difficulty_array.length);
  console.log("-------- Random Number Generated --------");

  console.log(difficulty_array[random_number]);
  return difficulty_array[random_number];
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
