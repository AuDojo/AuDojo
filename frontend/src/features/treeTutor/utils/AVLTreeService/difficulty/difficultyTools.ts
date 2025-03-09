import { TreeNode } from "@/features/treeTutor/utils/treeUtils";
import { getBalanceFactor } from "../getters";
import { createInsertionArray } from "./insertDifficulty";
import { createDeletionArray } from "./deleteDifficulty";
import { DifficultyLevel, OperationType } from "@/features/treeTutor/types";

/**
 * Creates a random number between 1 and max
 * @param max Maximum possible value
 * @returns random number
 */
export function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

export function turnNumberIntoDifficulty(num: number): DifficultyLevel {
  let difficulty_level: DifficultyLevel = null;
  switch (num) {
    // case -1:
    //   difficulty_level = turnNumberIntoDifficulty(getRandomInt(3));
    //   break;
    case 0:
      difficulty_level = 0;
      break;
    case 1:
      difficulty_level = 1;
      break;
    case 2:
      difficulty_level = 2;
      break;

    default:
      difficulty_level = null;
      break;
  }
  return difficulty_level;
}

export function turnDifficultyIntoNumber(difficulty_level: DifficultyLevel): number {
  let num: number;
  switch (difficulty_level) {
    case 0:
      num = 0;
      break;
    case 1:
      num = 1;
      break;
    case 2:
      num = 2;
      break;

    default:
      num = -1;
      break;
  }
  return num;
}

/**
 * Creates an array with all the possible values for the wanted parameters
 * @param node root-node of tree
 * @param difficulty_level Level of the difficulty
 * - -1: random,
 * - 0: no restructure,
 * - 1: one restructure,
 * - 2: two restructures
 * @param type "DELETE" or "INSERT"
 * @returns Array with all values for the wanted difficulty and type
 */
export function createDifficultyArray(
  node: TreeNode,
  difficulty_level: DifficultyLevel,
  type: OperationType
): number[] {
  // Choose a randome difficulty
  if (difficulty_level == -1) {
    difficulty_level = turnNumberIntoDifficulty(getRandomInt(3));
  }

  let difficulty_array: number[] = [];

  switch (type) {
    case "DELETE":
      difficulty_array = createDeletionArray(node, difficulty_level);
      break;
    case "INSERT":
      difficulty_array = createInsertionArray(node, difficulty_level);
      break;

    default:
      difficulty_array = [];
      break;
  }

  return difficulty_array;
}

/**
 * Creates a copy of the given tree
 * @param node root-node of tree
 * @returns root-node of the copy
 */
export function createCopyOfTree(node: TreeNode | null): TreeNode | null {
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
 * Puts the node values of the given tree into the given excistingNodes array.
 * The excistingNodes array turns into an inOrder array of the given tree
 * @param node root-node of the tree
 * @param excistingNodes Empty array into which the algorithm can push the inOrder values
 */
export function getExistingNodes(node: TreeNode | null, excistingNodes: number[]) {
  if (node == null) {
    return;
  }

  getExistingNodes(node.children[0], excistingNodes);
  excistingNodes.push(node.value);
  getExistingNodes(node.children[1], excistingNodes);
}

function findUnbalancedNode(node: TreeNode | null, unbalanced_nodes: TreeNode[]) {
  if (node == null) {
    return;
  }

  findUnbalancedNode(node.children[0], unbalanced_nodes);
  const balance_factor = getBalanceFactor(node);
  if (balance_factor <= -2 || balance_factor >= 2) {
    unbalanced_nodes.push(node);
  }
  findUnbalancedNode(node.children[1], unbalanced_nodes);
}

/**
 * Gets the number of rotations needed for the tree to be balanced.
 * @param node root-node of the tree
 * @param rootRef inserted or deleted node  TODO: probably unnessecary -> Testing
 * @returns number of rotations needed
 */
export function getNumberOfRotations(node: TreeNode, rootRef: TreeNode | null): number {
  const unbalanced_nodes: TreeNode[] = [];
  findUnbalancedNode(node, unbalanced_nodes);
  console.log("Unbalanced Nodes: ", unbalanced_nodes);

  let unbalanced_node: TreeNode | null = null;

  let lowest_hight = 99;

  for (const element of unbalanced_nodes) {
    if (element.height < lowest_hight) {
      lowest_hight = element.height;
      unbalanced_node = element;
    }
  }
  console.log("Unbalanced Node: ", unbalanced_node);

  if (!unbalanced_node) return 0; // NO
  if (!rootRef) return 0; // NO

  const balance = getBalanceFactor(unbalanced_node);

  if (balance >= -1 && balance <= 1) return 0; // NO

  if (balance > 1 && unbalanced_node.children[0] && getBalanceFactor(unbalanced_node.children[0]) >= 0) return 1; // LL
  if (balance > 1 && unbalanced_node.children[0] && getBalanceFactor(unbalanced_node.children[0]) < 0) return 2; // LR
  if (balance < -1 && unbalanced_node.children[1] && getBalanceFactor(unbalanced_node.children[1]) <= 0) return 1; // RR
  if (balance < -1 && unbalanced_node.children[1] && getBalanceFactor(unbalanced_node.children[1]) > 0) return 2; // RL

  return 0; // NO
}
