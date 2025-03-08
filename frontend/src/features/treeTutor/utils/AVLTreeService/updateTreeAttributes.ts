import { TreeNode } from "../treeUtils";
import { getHeight, getBalanceFactor } from "./getters";

/**
 * Helper function to update heights for all nodes in a subtree (especially important after Insertion)
 * @param node root node of subtree
 * @returns subtree with updated heights
 */

export function updateAllHeightsRecursive(node: TreeNode | null): void {
  if (!node) return;
  updateAllHeightsRecursive(node.children[0]);
  updateAllHeightsRecursive(node.children[1]);

  updateHeightAndBalanceFactor(node);
}
/**
 * Function that sets the height and BalanceFactor of a node based on childrens height
 * @param node node of which the height is to be updated
 */
export function updateHeightAndBalanceFactor(node: TreeNode): void {
  node.height = 1 + Math.max(getHeight(node.children[0]), getHeight(node.children[1]));
  node.balanceFactor = getBalanceFactor(node);
}
/**
 * Recursivley Update node.depth for every node in the tree starting at Root
 * @param node (sub-) tree for which the depth is to be recaluclated
 * @param depth parameter to track the depth throught the tree
 */
export function updateDepth(node: TreeNode | null, depth = 0): void {
  if (!node) return;

  node.depth = depth;
  updateDepth(node.children[0], depth + 1);
  updateDepth(node.children[1], depth + 1);
}
