import { DifficultyLevel } from "@/features/treeTutor/types";
import { TreeNode } from "@/features/treeTutor/utils/treeUtils";
import { updateAllHeightsRecursive } from "../updateTreeAttributes";
import { createCopyOfTree, getExistingNodes, getNumberOfRotations } from "./difficultyTools";

/**
 * Gets the next bigger (successor) node of the given node
 * @param node node from which the successor is wanted
 * @returns successor node of the given node
 */
function getSuccessor(node: TreeNode | null): TreeNode | null {
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

/**
 * Executes basic sorted bnary tree deletion on the given tree for the given node-value
 * @param node root-node of the tree
 * @param value value of the node that should get deleted
 * @returns deleted node
 */
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

/**
 * Creates an array with all the possible deletion values for the wanted difficulty_level
 * @param node root-node of the tree
 * @param difficulty_level Level of the difficulty
 * - 0: no restructure,
 * - 1: one restructure,
 * - 2: two restructures
 * @returns Array with all possible deletion values for the wanted difficulty
 */
export function createDeletionArray(node: TreeNode, difficulty_level: DifficultyLevel): number[] {
  const excistingNodes: number[] = [];
  getExistingNodes(node, excistingNodes);
  // // console.log("ExistingNodes: ", excistingNodes);
  const matchingDeletions: number[] = [];

  for (const value of excistingNodes) {
    // console.log("Value to Delete: ", value);
    const node_copy = createCopyOfTree(node);
    if (node_copy !== null) {
      const deleted_node: TreeNode | null = binaryTreeDelition(node_copy, value);
      const number_rotations = getNumberOfRotations(node_copy, deleted_node);

      // console.log("Number Rotations: ", number_rotations);

      updateAllHeightsRecursive(node_copy);
      if (number_rotations === difficulty_level) {
        matchingDeletions.push(value);
      }
    }
  }

  return matchingDeletions;
}
