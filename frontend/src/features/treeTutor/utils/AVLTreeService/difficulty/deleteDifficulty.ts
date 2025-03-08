import { TreeNode } from "@/features/treeTutor/utils/treeUtils";
import {
  DifficultyTypes,
  Difficulty,
  getRandomInt,
  numToDifficultyTypes,
  getExistingNodes,
  createCopyOfTree,
  getNumberOfRotates,
} from "./difficultyTools";
import { updateAllHeightsRecursive } from "../updateTreeAttributes";

export function createDeleteArray(node: TreeNode, difficulty_level: DifficultyTypes): number[] {
  if (Difficulty.random) {
    const random_number = getRandomInt(3);
    difficulty_level = numToDifficultyTypes(random_number);
  }

  switch (difficulty_level) {
    case Difficulty.easy:
      return createDifficultyArray(node, 0);
      break;
    case Difficulty.medium:
      return createDifficultyArray(node, 1);
      break;
    case Difficulty.hard:
      return createDifficultyArray(node, 2);
      break;

    default:
      return [];
      break;
  }
}

function getSuccessor(node: TreeNode | null) {
  if (node === null) {
    return null;
  }

  node = node.children[1];
  if (node !== null) {
    while (node.children[0] !== null) {
      node = node.children[0];
    }
  }
  return node;
}

function binaryTreeDelition(node: TreeNode | null, value: number): TreeNode | null {
  if (node === null) {
    return null;
  }
  if (node.value > value) {
    node.children[0] = binaryTreeDelition(node.children[0], value);
  } else if (node.value < value) {
    node.children[1] = binaryTreeDelition(node.children[1], value);
  } else {
    // If root matches with the given key

    // Cases when root has 0 children or
    // only right child
    if (node.children[0] === null) return node.children[1];

    // When root has only left child
    if (node.children[1] === null) return node.children[0];

    // When both children are present
    const succ = getSuccessor(node);
    if (succ !== null) {
      node.value = succ.value;
      node.children[1] = binaryTreeDelition(node.children[1], succ.value);
    }
  }
  return node;
}

function createDifficultyArray(node: TreeNode, difficulty: number): number[] {
  const excistingNodes: number[] = [];
  getExistingNodes(node, excistingNodes);
  const matchingInserts: number[] = [];

  // let random_num: number = getRandomInt(availableInserts.length);
  // let new_node: TreeNode = createNode(availableInserts[random_num], 0, "root");

  excistingNodes.forEach((value) => {
    const node_copy = createCopyOfTree(node);
    if (node_copy !== null) {
      const inserted_node: TreeNode | null = binaryTreeDelition(node_copy, value);
      updateAllHeightsRecursive(node_copy);
      // let balance_factor = getBalanceFactor(node_copy);
      if (getNumberOfRotates(node_copy, inserted_node) === difficulty) {
        matchingInserts.push(value);
      }
    }
  });

  return matchingInserts;
}
