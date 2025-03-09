import { TreeNode } from "@/features/treeTutor/utils/treeUtils";
import { getExistingNodes, createCopyOfTree, getNumberOfRotations } from "./difficultyTools";
import { createNode } from "../changingTree/insertAndDelete";
import { updateAllHeightsRecursive } from "../updateTreeAttributes";
import { MAX_VALUE } from "@/features/treeTutor/constants";

function arrayWithoutExistingNodes(node: TreeNode): number[] {
  const allNumbers: number[] = Array.from({ length: MAX_VALUE }, (_, i) => i + 1); // TODO: Test if 1-99
  console.log("AllNumbers: ", allNumbers);
  const excistingNodes: number[] = [];
  getExistingNodes(node, excistingNodes);
  console.log("ExistingNodes: ", excistingNodes);

  // Calculates the difference (A\B) allNumbers without excistingNodes
  const diff = allNumbers.filter(function (x) {
    return !excistingNodes.includes(x);
  });

  return diff;
}

function binaryTreeInsertion(
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

export function createInsertionArray(node: TreeNode, difficulty_level: number): number[] {
  const availableInserts: number[] = arrayWithoutExistingNodes(node);
  const matchingInserts: number[] = [];

  for (const value of availableInserts) {
    const node_copy = createCopyOfTree(node);
    if (node_copy !== null) {
      const inserted_node: TreeNode = binaryTreeInsertion(node_copy, value, 0, "root");
      updateAllHeightsRecursive(node_copy);
      // let balance_factor = getBalanceFactor(node_copy);
      if (getNumberOfRotations(node_copy, inserted_node) === difficulty_level) {
        matchingInserts.push(value);
      }
    }
  }

  return matchingInserts;
}
