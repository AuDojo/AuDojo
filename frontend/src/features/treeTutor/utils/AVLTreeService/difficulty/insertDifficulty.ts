import { MAX_VALUE } from "@/features/treeTutor/constants";
import { DifficultyLevel } from "@/features/treeTutor/types";
import { TreeNode } from "@/features/treeTutor/utils/treeUtils";
import { createNode } from "../changingTree/insertAndDelete";
import { updateAllHeightsRecursive } from "../updateTreeAttributes";
import { createCopyOfTree, getExistingNodes, getNumberOfRotations } from "./difficultyTools";
// import { printTree } from "../tools";

/**
 * Executes basic sorted binary tree insertion on the given tree for the given value
 * @param node root-node of the tree
 * @param value value to be inserted
 * @param depth depth of the current node (for root-node = 0)
 * @param position positioning of the current node (for root-node = "root")
 * @returns the inserted node
 */
function binaryTreeInsertion( // TODO: add default values for depth and position
  node: TreeNode | null,
  value: number,
  depth: number,
  position: "root" | "left" | "right"
): TreeNode {
  if (node === null) {
    return createNode(value, depth, position);
  }
  if (node.value === value) {
    return node;
  }
  if (value < node.value) {
    node.children[0] = binaryTreeInsertion(node.children[0], value, ++depth, "left");
  } else if (value > node.value) {
    node.children[1] = binaryTreeInsertion(node.children[1], value, ++depth, "right");
  }
  return node;
}

/**
 * Creates an array without the nodes already present in the tree by using the set operator difference
 * @param node root-node of the tree
 * @returns array without the nodes already present in the tree
 */
function arrayWithoutExistingNodes(node: TreeNode): number[] {
  const allNumbers: number[] = Array.from({ length: MAX_VALUE }, (_, i) => i + 1);
  // // console.log("AllNumbers: ", allNumbers);
  const excistingNodes: number[] = [];
  getExistingNodes(node, excistingNodes);
  // // console.log("ExistingNodes: ", excistingNodes);

  // Calculates the difference (A\B) allNumbers without excistingNodes
  const diff = allNumbers.filter(function (x) {
    return !excistingNodes.includes(x);
  });

  return diff;
}

/**
 * Creates an array with all the possible insertion values for the wanted difficulty_level
 * @param node root-node of the tree
 * @param difficulty_level Level of the difficulty
 * - 0: no restructure,
 * - 1: one restructure,
 * - 2: two restructures
 * @returns Array with all possible insertion values for the wanted difficulty
 */
export function createInsertionArray(node: TreeNode, difficulty_level: DifficultyLevel): number[] {
  const availableInserts: number[] = arrayWithoutExistingNodes(node);
  const matchingInserts: number[] = [];

  for (const value of availableInserts) {
    const node_copy: TreeNode | null = createCopyOfTree(node);
    if (node_copy !== null) {
      // // console.log("Value to Insert: ", value);
      const inserted_node: TreeNode = binaryTreeInsertion(node_copy, value, 0, "root");
      // // console.log(printTree(node_copy));

      updateAllHeightsRecursive(node_copy);
      // let balance_factor = getBalanceFactor(node_copy);

      const number_rotations = getNumberOfRotations(node_copy, inserted_node);
      // // console.log("Number Rotations: ", number_rotations);
      if (number_rotations === difficulty_level) {
        matchingInserts.push(value);
      }
    }
  }

  return matchingInserts;
}
