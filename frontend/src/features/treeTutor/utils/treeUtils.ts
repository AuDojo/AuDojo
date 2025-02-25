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
      const found = child ? findNode(child, targetValue) : null;
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
export const addNode = (tree: TreeNode, targetValue: number, newValue: number, position: number): TreeNode => {
  if (!tree) return tree;

  // Knoten suchen
  const node = findNode(tree, targetValue);
  if (!node) return tree; // Falls der Knoten nicht existiert

  // Falls `children` nicht existiert, initialisiere es mit zwei Nullwerten
  if (!node.children) {
    node.children = [null, null];
  }

  // Falls an der gewünschten Position bereits ein Kind existiert, breche ab
  if (node.children[position]) return tree;

  // Erstelle den neuen Knoten und setze ihn
  node.children[position] = { value: newValue, children: [null, null] };

  return structuredClone(tree); // React-Update erzwingen
};

export function hasValidXY<T extends { x?: number; y?: number }>(node: T): node is T & { x: number; y: number } {
  return typeof node.x === "number" && typeof node.y === "number";
}
