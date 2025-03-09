import { BalanceIndicator } from "../../../types";
import { TreeNode } from "../../treeUtils";
import { getBalanceFactor } from "../getters";
import { printTree } from "../tools";
import { updateAllHeightsRecursive, updateDepth, updateHeightAndBalanceFactor } from "../updateTreeAttributes";

/**
 * Before Rotation                After Rotation

         y (+2)                          x
        /  \                            / \
       x    C            →            T2   y
      / \                                 / \
     T2  X                               X   C

 * @param y root node of subtree for which the Rotation will be performed
 * @returns  rotated subtree
 */
function rightRotate(y: TreeNode): TreeNode {
  // console.log("======= Right rotation at", y.value, "=========");
  if (!y.children[0]) return y;

  const x = y.children[0];
  const T2 = x.children[1];

  const originalPosition = y.position;

  x.children[1] = y;
  y.children[0] = T2;

  x.position = originalPosition;
  y.position = "right";
  if (T2) T2.position = "left";

  // Update heights and depths
  updateHeightAndBalanceFactor(y);
  updateHeightAndBalanceFactor(x);
  updateDepth(x);

  return x;
}
/**
 * AVL Left Rotation:

   Before Rotation                After Rotation

         x (-2)                          y
        /  \                            / \
       X    y (-1)         →          x   C
           / \                       / \
          T2  C                     X  T2
 * @param x root node of the subtree for which the Rotation will be performed
 * @returns rotated subtree
 */
function leftRotate(x: TreeNode): TreeNode {
  if (!x.children[1]) return x; // Safety check

  const y = x.children[1];
  const T2 = y.children[0];

  // Save the original position of x
  const originalPosition = x.position;

  // Perform rotation
  y.children[0] = x;
  x.children[1] = T2;

  // Update positions
  y.position = originalPosition;
  x.position = "left";
  if (T2) T2.position = "right";

  // Update heights and depths
  updateHeightAndBalanceFactor(x);
  updateHeightAndBalanceFactor(y);
  updateAllHeightsRecursive(y);
  updateDepth(y);

  return y;
}
/**
 * AVL Tree Left-Right Rotation (LR-Case, RL-Case mirrored):

   before rotation                  after rotation

         z (+2)                          y
        /  \                            / \
       x    D           →             x     z
      / \                            / \   / \
     A   y                          A   B C   D
        / \
       B   C

Step 1: LeftRotation bei x      Step 2: RightRotation at z
      z (+2)                           z (+2)
     /  \                             /  \
    y    D           →              y    D
   / \                             / \
  x   C                           A   B
  / \
  A  B

  for a more comprehensive explanation consult https://en.wikipedia.org/wiki/AVL_tree
 * @param node subtree to balance
 * @returns balanced subtree
 */
export function balanceNode(node: TreeNode, rootRef: { current: TreeNode | null }): BalanceIndicator {
  if (!node) return node;
  if (!rootRef.current) return { tree: node, operation: "NO", copy: null };

  // Update height balance factor
  updateAllHeightsRecursive(node);
  updateAllHeightsRecursive(rootRef.current);

  const balance = getBalanceFactor(node);

  //no tracking needed
  if (balance >= -1 && balance <= 1) {
    return { tree: node, operation: "NO", copy: null };
  }

  // Left-Left Case
  if (balance > 1 && node.children[0] && getBalanceFactor(node.children[0]) >= 0) {
    const rotated = rightRotate(node);

    if (rootRef.current === node) {
      rootRef.current = rotated;
    }

    updateHeightAndBalanceFactor(rotated);
    return { tree: rotated, operation: "LL", copy: null };
  }

  //Left-Right Case
  if (balance > 1 && node.children[0] && getBalanceFactor(node.children[0]) < 0) {
    node.children[0] = leftRotate(node.children[0]);
    const treeCopy = structuredClone(rootRef.current);

    const rotated = rightRotate(node);
    updateAllHeightsRecursive(node);

    if (rootRef.current === node) {
      printTree(node);
      rootRef.current = rotated;
    }

    return { tree: rotated, operation: "LR", copy: treeCopy };
  }

  // Right-Right Case
  if (balance < -1 && node.children[1] && getBalanceFactor(node.children[1]) <= 0) {
    const rotated = leftRotate(node);

    if (rootRef.current === node) {
      rootRef.current = rotated;
    }
    return { tree: rotated, operation: "RR", copy: null };
  }

  // Right-Left Case
  if (balance < -1 && node.children[1] && getBalanceFactor(node.children[1]) > 0) {
    node.children[1] = rightRotate(node.children[1]);
    const treeCopy = structuredClone(rootRef.current);

    const rotated = leftRotate(node);
    updateAllHeightsRecursive(node);

    if (rootRef.current === node) {
      rootRef.current = rotated;
    }
    return { tree: rotated, operation: "RL", copy: treeCopy };
  }

  return { tree: node, operation: "NO", copy: null };
}
