/**
 * Tree Struct
 */

export interface TreeNode {
  id: string;
  value: number;
  depth: number;
  height: number;
  position: string;
  children: [TreeNode | null, TreeNode | null];
  balanceFactor: number;
}

/**
 * Find a node by its value in the tree
 */

export function findNode(root: TreeNode | null, targetId: string): TreeNode | null {
  if (!root) return null;

  if (root.id === targetId) return root;

  if (root.children) {
    for (const child of root.children) {
      const found = child ? findNode(child, targetId) : null;
      if (found) return found;
    }
  }
  return null;
}

/**
 *  Updates the value of a node in the tree
 * */

export function updateNode(root: TreeNode, targetId: string, newValue: number): TreeNode {
  const newRoot = structuredClone(root);

  const targetNode = findNode(newRoot, targetId);

  if (targetNode) {
    targetNode.value = newValue;
  }

  return newRoot;
}

/**
 * Deletes a node and its subtree
 */

export function deleteNode(root: TreeNode, targetId: string): TreeNode {
  // Special case for root node
  if (root.id === targetId) {
    return {
      id: crypto.randomUUID(),
      value: 0,
      depth: 0,
      height: 0,
      children: [null, null],
      position: "root",
      balanceFactor: 0,
    };
  }

  // Create a clone to ensure immutability
  const newRoot = structuredClone(root);

  // Helper function to recursively search and delete a node
  const removeNodeRecursive = (node: TreeNode): boolean => {
    if (!node.children) return false;

    // Check each child
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];

      // If this child is the target, delete it
      if (child && child.id === targetId) {
        node.children[i] = null;
        return true; // Node found and deleted
      }

      // Otherwise, search deeper in this child
      if (child && removeNodeRecursive(child)) {
        return true; // Node was found and deleted in deeper level
      }
    }

    return false; // Node not found in this branch
  };

  // Start the recursive search from the root
  removeNodeRecursive(newRoot);

  return newRoot;
}

/**
 * Hinzufügen eines Knotens
 */

export function addNode(tree: TreeNode, targetId: string, newValue: number, position: string): TreeNode {
  // Create a clone to ensure immutability
  const newRoot = structuredClone(tree);

  // Find the target node in the cloned tree
  const targetNode = findNode(newRoot, targetId);
  if (!targetNode) return newRoot;

  // Initialize children if they don't exist
  if (!targetNode.children) {
    targetNode.children = [null, null];
  }

  // Check if position is already occupied
  if (targetNode.children[position === "left" ? 0 : 1]) return newRoot;

  const depth = (targetNode.depth ?? 0) + 1;
  // Create new node
  const newNode: TreeNode = {
    id: crypto.randomUUID(),
    value: newValue,
    height: 0,
    depth,
    children: [null, null],
    position,
    balanceFactor: 0,
  };

  // Add the node to the tree
  targetNode.children[position === "left" ? 0 : 1] = newNode;

  return newRoot;
}
/**
 *
 * @param root übergebener Tree
 * @param targetValue Knoten, für den die höhe gefunden werden soll
 * @param depth rekursive Zählvaribale, beginnend mit der Höhe des Wurzelknotens
 * @returns
 */

/*
const findHeight = (root: TreeNode, targetId: string, height: number = 0): number | null => {
  if (!root) return null;
  if (root.id === targetId) return height;

  if (root.children) {
    for (const child of root.children) {
      if (child) {
        const foundDepth = findHeight(child, targetId, height + 1);
        if (foundDepth !== null) return foundDepth;
      }
    }
  }
  return null;
};
*/

export function hasValidXY<T extends { x?: number; y?: number }>(node: T): node is T & { x: number; y: number } {
  return typeof node.x === "number" && typeof node.y === "number";
}
