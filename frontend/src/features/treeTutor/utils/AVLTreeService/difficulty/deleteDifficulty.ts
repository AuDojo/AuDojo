import { TreeNode } from "@/features/treeTutor/utils/treeUtils";
import { getExistingNodes, createCopyOfTree, getNumberOfRotations } from "./difficultyTools";
import { updateAllHeightsRecursive } from "../updateTreeAttributes";

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

export function createDeletionArray(node: TreeNode, difficulty_level: number): number[] {
  const excistingNodes: number[] = [];
  getExistingNodes(node, excistingNodes);
  const matchingDeletions: number[] = [];

  for (const value of excistingNodes) {
    const node_copy = createCopyOfTree(node);
    if (node_copy !== null) {
      const inserted_node: TreeNode | null = binaryTreeDelition(node_copy, value);
      updateAllHeightsRecursive(node_copy);
      if (getNumberOfRotations(node_copy, inserted_node) === difficulty_level) {
        matchingDeletions.push(value);
      }
    }
  }

  return matchingDeletions;
}
