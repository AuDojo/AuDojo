import { TreeNode } from "@/features/treeTutor/utils/treeUtils";
import { getBalanceFactor } from "../getters";
import { createInsertionArray } from "./insertDifficulty";
import { createDeletionArray } from "./deleteDifficulty";

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function createDifficultyArray(
  node: TreeNode,
  difficulty_level: number,
  type: "deletion" | "insertion"
): number[] {
  if (difficulty_level == -1) {
    difficulty_level = getRandomInt(3);
  }
  let difficulty_array: number[] = [];

  switch (type) {
    case "deletion":
      difficulty_array = createDeletionArray(node, difficulty_level);
      break;
    case "insertion":
      difficulty_array = createInsertionArray(node, difficulty_level);
      break;

    default:
      difficulty_array = [];
      break;
  }

  return difficulty_array;
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
  if (!node) return 0; // NO
  if (!rootRef) return 0; // NO

  const balance = getBalanceFactor(node);

  if (balance >= -1 && balance <= 1) return 0; // NO

  if (balance > 1 && node.children[0] && getBalanceFactor(node.children[0]) >= 0) return 1; // LL
  if (balance < -1 && node.children[1] && getBalanceFactor(node.children[1]) <= 0) return 1; // RR

  if (balance > 1 && node.children[0] && getBalanceFactor(node.children[0]) < 0) return 2; // LR
  if (balance < -1 && node.children[1] && getBalanceFactor(node.children[1]) > 0) return 2; // RL

  return 0; // NO
}
