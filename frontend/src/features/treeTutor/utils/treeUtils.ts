export interface TreeNode {
  value: number | null;
  children?: [TreeNode | null, TreeNode | null];
}

/**
 * Find a node by its balue in the tree
 */

export function findNode(root: TreeNode | null, targetValue: number): TreeNode | null {
  if (!root) return null;

  if (root.value === targetValue) return root;

  if (root.children) {
    for (const child of root.children) {
      const found = findNode(child, targetValue);
      if (found) return found;
    }
  }
  return null;
}

/**
 *  Updates the value of a node in the tree
 * */

export function updateNode(root: TreeNode, targetValue: number, newValue: number | null): TreeNode {
  if (root.value === targetValue) {
    root.value = newValue;
  } else if (root.children) {
    root.children = root.children.map((child) => (child ? updateNode(child, targetValue, newValue) : null)) as [
      TreeNode | null,
      TreeNode | null,
    ];
  }
  return root;
}

/**
 * Deletes a node and its subtree
 */
export function deleteNode(root: TreeNode, targetValue: number): TreeNode | null {
  if (root.value === targetValue) {
    return null;
  }
  if (root.children) {
    root.children = root.children.map((child) => (child ? deleteNode(child, targetValue) : null)) as [
      TreeNode | null,
      TreeNode | null,
    ];
  }
  return root;
}

/**
 * Hinzufügen eines Knotens
 */
export const addNode = (root: TreeNode, parentValue: number, newValue: number): TreeNode => {
  if (root.value === parentValue) {
    if (!root.children) {
      root.children = [{ value: newValue }, null];
    } else if (root.children[0] === null) {
      root.children[0] = { value: newValue };
    } else if (root.children[1] === null) {
      root.children[1] = { value: newValue };
    }
  } else if (root.children) {
    root.children = root.children.map((child) => (child ? addNode(child, parentValue, newValue) : null)) as [
      TreeNode | null,
      TreeNode | null,
    ];
  }
  return root;
};

export function hasValidXY<T extends { x?: number; y?: number }>(node: T): node is T & { x: number; y: number } {
  return typeof node.x === "number" && typeof node.y === "number";
}
