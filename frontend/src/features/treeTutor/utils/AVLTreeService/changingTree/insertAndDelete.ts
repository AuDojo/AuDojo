import { TreeNode } from "@/features/treeTutor/utils/treeUtils";
import { BalanceIndicator, TreeStep } from "../../../types";
import { addSteps } from "../excerciseUtils";
import { updateAllHeightsRecursive, updateDepth, updateHeightAndBalanceFactor } from "../updateTreeAttributes";
import { balanceNode } from "./rotateAndBalanceNode";

/**
 * Helper function that facilitates node creation required in insertAVL
 * Initialized the node with default values that will be altered dynamically during insertAVL operation
 * @param value
 * @param depth
 * @param position
 * @returns new Node with default values
 */
export function createNode(value: number, depth: number, position: "root" | "left" | "right"): TreeNode {
  return {
    id: crypto.randomUUID(),
    value,
    height: 0,
    depth,
    position,
    balanceFactor: 0,
    children: [null, null],
  };
}

// Insert a value into the AVL tree
export function insertAVLTracker(
  currentRoot: TreeNode | null,
  value: number,
  steps: TreeStep[] | null
): TreeNode | null {
  const rootRef: { current: TreeNode | null } = { current: currentRoot };

  function insertAVL(node: TreeNode | null, val: number): BalanceIndicator {
    // Base case: create new node if tree is empty
    if (!node) {
      const newNode = createNode(val, 0, "root");
      rootRef.current = newNode;

      if (steps) {
        steps.push({ tree: structuredClone(newNode), operation: "INSERT", successorDelete: false });
      }
      return { tree: newNode, copy: null, operation: "NO" };
    }

    // Perform standard BST insertion
    if (value < node.value) {
      if (!node.children[0]) {
        node.children[0] = createNode(val, node.depth + 1, "left");

        updateAllHeightsRecursive(rootRef.current);
        if (steps) {
          steps.push({
            tree: structuredClone(rootRef.current),
            operation: `INSERT ${val} as left child of ${node.value}`,
            successorDelete: false,
          });
        }
      } else {
        const subTree = insertAVL(node.children[0], val);
        node.children[0] = subTree.tree;

        if (!rootRef.current) {
          return { tree: node, copy: null, operation: "NO" };
        }

        addSteps(steps, subTree, rootRef);

        updateAllHeightsRecursive(rootRef.current);
      }
    } else if (val > node.value) {
      if (!node.children[1]) {
        node.children[1] = createNode(val, node.depth + 1, "right");

        if (!rootRef.current) {
          return { tree: node, copy: null, operation: "NO" };
        }
        updateHeightAndBalanceFactor(rootRef.current);
        if (steps) {
          steps.push({
            tree: structuredClone(rootRef.current),
            operation: `INSERT ${val} as right child of ${node.value}`,
            successorDelete: false,
          });
          updateAllHeightsRecursive(rootRef.current);
        }
      } else {
        const subTree = insertAVL(node.children[1], val);
        node.children[1] = subTree.tree;

        addSteps(steps, subTree, rootRef);

        if (!rootRef.current) {
          return { tree: node, copy: null, operation: "NO" };
        }
        updateHeightAndBalanceFactor(rootRef.current);
      }
    } else {
      // Duplicate value, do nothing
      return { tree: node, copy: null, operation: "NO" };
    }

    if (!rootRef.current) {
      return { tree: node, copy: null, operation: "NO" };
    }

    updateHeightAndBalanceFactor(node);
    updateHeightAndBalanceFactor(rootRef.current);

    const balanced = balanceNode(node, rootRef);

    // Ensure all depths are updated
    updateDepth(balanced.tree);

    return balanced;
  }
  return insertAVL(currentRoot, value).tree;
}
// Delete a value from the AVL tree

export function deleteAVLTracker(root: TreeNode | null, value: number, steps: TreeStep[]): TreeNode | null {
  const rootRef: { current: TreeNode | null } = { current: root };

  let changeOccured = false;

  function deleteAVL(node: TreeNode | null, val: number): BalanceIndicator {
    if (!node) return { tree: null, copy: null, operation: "NO" };

    // Perform standard BST deletion
    if (val < node.value) {
      const oldLeft = node.children[0];
      const subTree = deleteAVL(node.children[0], val);
      node.children[0] = subTree.tree;

      if (oldLeft !== node.children[0]) {
        if (changeOccured && steps) {
          steps.push({
            tree: structuredClone(rootRef.current),
            operation: `After removing ${val}`,
            successorDelete: false,
          });
          changeOccured = false;
        }
      }
      // console.log("subtree operation", subTree.operation);
    } else if (val > node.value) {
      const oldRight = node.children[1];
      const subTree = deleteAVL(node.children[1], val);
      node.children[1] = subTree.tree;
      if (oldRight !== node.children[1]) {
        if (changeOccured && steps) {
          steps.push({
            tree: structuredClone(rootRef.current),
            operation: `After removing ${val}`,
            successorDelete: false,
          });
          changeOccured = false;
        }
      }
      // console.log("subtree operation", subTree.operation);
    } else {
      // Node to be deleted found
      // Case 1: Leaf node
      if (!node.children[0] && !node.children[1]) {
        if (rootRef.current === node) {
          rootRef.current = null;
        }
        changeOccured = true;
        return { tree: null, copy: null, operation: "NO" };
      }

      // Case 2: Node with only one child
      /* TODO Fix change Occured is false when child is replaced */
      if (!node.children[0]) {
        const temp = node.children[1];
        if (temp) temp.position = node.position;
        if (rootRef.current === node) {
          rootRef.current = temp;
        }
        changeOccured = true;
        return { tree: temp, copy: null, operation: "NO" };
      } else if (!node.children[1]) {
        const temp = node.children[0];
        if (temp) temp.position = node.position;
        if (rootRef.current === node) {
          rootRef.current = temp;
        }
        changeOccured = true;
        return { tree: temp, copy: null, operation: "NO" };
      }

      // Case 3: Node with two children
      // Find the inorder successor (smallest in right subtree)
      let successor = node.children[1];
      while (successor.children[0]) {
        successor = successor.children[0];
      }

      const oldRight = node.children[1];
      const oldValue = node.value;
      // Copy successor value to this node
      node.value = successor.value;

      if (steps) {
        steps.push({
          tree: structuredClone(rootRef.current),
          operation: `Replace value ${oldValue} with successor ${successor.value}`,
          successorDelete: true,
        });
      }

      changeOccured = true;
      // Delete the successor
      const subTree = deleteAVL(node.children[1], successor.value);
      node.children[1] = subTree.tree;
      if (oldRight !== node.children[1] && changeOccured && steps) {
        steps.push({
          tree: structuredClone(rootRef.current),
          operation: `After removing successor ${successor.value}`,
          successorDelete: true,
        });
        changeOccured = false; // Reset flag
      }
    }

    // If tree had only one node, return
    if (!node) return { tree: null, copy: null, operation: "NO" };

    // Balance the tree
    const balanced = balanceNode(node, rootRef);
    addSteps(steps, balanced, rootRef);

    // Update depths
    updateDepth(balanced.tree);

    return balanced;
  }
  return deleteAVL(root, value).tree;
}
