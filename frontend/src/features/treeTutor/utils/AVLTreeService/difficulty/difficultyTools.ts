import { TreeNode } from "@/features/treeTutor/utils/treeUtils";
import { getBalanceFactor } from "../getters";

export type DifficultyTypes = "easy" | "middle" | "hard" | "random" | "undefined";

export const Difficulty = {
  easy: "easy",
  medium: "middle",
  hard: "hard",
  random: "random",
  undefined: "undefined",
} as const satisfies Record<string, DifficultyTypes>;

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function numToDifficultyTypes(num: number): DifficultyTypes {
  switch (num) {
    case 0:
      return Difficulty.easy;
      break;
    case 1:
      return Difficulty.medium;
      break;
    case 2:
      return Difficulty.hard;
      break;
    case -1:
      return Difficulty.random;
      break;

    default:
      return Difficulty.undefined;
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

export function getNumberOfRotates(node: TreeNode, rootRef: TreeNode | null): number {
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

// export function getFatherNode2(root: TreeNode | null, targetId: string): TreeNode | null {
//   let fatherNode: TreeNode | null = root;
// }

// export function getFatherNode(root: TreeNode | null, targetId: string): TreeNode | null {
//   let fatherNode: TreeNode | null = root;

//   if (!root) return null;

//   if (root.id === targetId) return root;

//   if (root.children) {
//     for (const child of root.children) {
//       const found = child ? getFatherNode(child, targetId) : null;
//       if (found) return found;
//     }
//   }
//   return null;
// }
