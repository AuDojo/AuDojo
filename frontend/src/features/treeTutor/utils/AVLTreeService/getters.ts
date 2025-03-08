import { TreeNode } from "@/features/treeTutor/utils/treeUtils";

/**
 * @param node
 * @returns height property of the TreeNode
 */
export function getHeight(node: TreeNode | null): number {
  return node ? node.height : -1;
}

/**
 * @param node
 * @returns balance Factor property of the TreeNode
 */
export function getBalanceFactor(node: TreeNode | null): number {
  if (!node) return 0;
  return getHeight(node.children[0]) - getHeight(node.children[1]);
}
