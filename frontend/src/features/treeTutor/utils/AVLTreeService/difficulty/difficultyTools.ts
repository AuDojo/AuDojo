import { TreeNode } from "@/features/treeTutor/utils/treeUtils";

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

export function getFatherNode2(root: TreeNode | null, targetId: string): TreeNode | null {
  let fatherNode: TreeNode | null = root;
}

export function getFatherNode(root: TreeNode | null, targetId: string): TreeNode | null {
  let fatherNode: TreeNode | null = root;

  if (!root) return null;

  if (root.id === targetId) return root;

  if (root.children) {
    for (const child of root.children) {
      const found = child ? getFatherNode(child, targetId) : null;
      if (found) return found;
    }
  }
  return null;
}
