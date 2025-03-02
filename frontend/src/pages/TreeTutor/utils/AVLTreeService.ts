import { TreeNode } from "@/features/treeTutor/utils/treeUtils";

export interface TreeStep {
  tree: TreeNode | null;
  operation: string;
}

export function generateRandomAVL(): TreeStep {
  // Instead of random values, use a fixed array that should produce a well-balanced tree
  let root: TreeNode | null = null; // Generate a random number of nodes between 3 and 12
  const nodeCount = Math.floor(Math.random() * 10) + 3; // 3 to 12

  // Generate unique random values
  const values = new Set<number>();
  while (values.size < nodeCount) {
    const value = Math.floor(Math.random() * 99) + 1; // 1 to 99
    values.add(value);
  }
  // Insert values one by one
  for (const value of values) {
    root = insertAVL(root, value);
    console.log(`After inserting ${value}, tree structure:`);
    printTree(root);
  }
  printTree(root);

  return { tree: root, operation: "Delete" };
}

// Helper function to get height of a node (handles null nodes)
function getHeight(node: TreeNode | null): number {
  return node ? node.height : -1;
}

// Calculate balance factor directly
function getBalanceFactor(node: TreeNode | null): number {
  if (!node) return 0;
  return getHeight(node.children[0]) - getHeight(node.children[1]);
}

// Update height based on children's heights
function updateHeight(node: TreeNode): void {
  node.height = 1 + Math.max(getHeight(node.children[0]), getHeight(node.children[1]));
  node.balanceFactor = getBalanceFactor(node);
}

// Update depth of node and all its children
function updateDepth(node: TreeNode | null, depth = 0): void {
  if (!node) return;

  node.depth = depth;
  updateDepth(node.children[0], depth + 1);
  updateDepth(node.children[1], depth + 1);
}

// Create a new node
function createNode(value: number, depth: number, position: "root" | "left" | "right"): TreeNode {
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

// Right rotation (LL case)
function rightRotate(y: TreeNode): TreeNode {
  if (!y.children[0]) return y; // Safety check

  console.log(`Performing right rotation at node ${y.value}`);

  const x = y.children[0];
  const T2 = x.children[1];

  // Save the original position of y
  const originalPosition = y.position;

  // Perform rotation
  x.children[1] = y;
  y.children[0] = T2;

  // Update positions
  x.position = originalPosition;
  y.position = "right";
  if (T2) T2.position = "left";

  // Update heights and depths
  updateHeight(y);
  updateHeight(x);
  updateDepth(x);

  return x;
}

// Left rotation (RR case)
function leftRotate(x: TreeNode): TreeNode {
  if (!x.children[1]) return x; // Safety check

  console.log(`Performing left rotation at node ${x.value}`);

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
  updateHeight(x);
  updateHeight(y);
  updateDepth(y);

  return y;
}

// Balance the tree if needed
export function balanceNode(node: TreeNode): TreeNode {
  if (!node) return node;

  // Update height and get balance factor
  updateHeight(node);
  const balance = getBalanceFactor(node);

  console.log(`Balancing node ${node.value}, balance factor: ${balance}`);

  // Left-Left Case
  if (balance > 1 && node.children[0] && getBalanceFactor(node.children[0]) >= 0) {
    console.log(`Left-Left case at ${node.value}`);
    return rightRotate(node);
  }

  // Left-Right Case
  if (balance > 1 && node.children[0] && getBalanceFactor(node.children[0]) < 0) {
    console.log(`Left-Right case at ${node.value}`);
    node.children[0] = leftRotate(node.children[0]);
    return rightRotate(node);
  }

  // Right-Right Case
  if (balance < -1 && node.children[1] && getBalanceFactor(node.children[1]) <= 0) {
    console.log(`Right-Right case at ${node.value}`);
    return leftRotate(node);
  }

  // Right-Left Case
  if (balance < -1 && node.children[1] && getBalanceFactor(node.children[1]) > 0) {
    console.log(`Right-Left case at ${node.value}`);
    node.children[1] = rightRotate(node.children[1]);
    return leftRotate(node);
  }

  return node;
}

// Insert a value into the AVL tree
export function insertAVL(root: TreeNode | null, value: number): TreeNode {
  // Base case: create new node if tree is empty
  if (!root) {
    return createNode(value, 0, "root");
  }

  console.log(`Inserting ${value} at node ${root.value}`);

  // Perform standard BST insertion
  if (value < root.value) {
    if (!root.children[0]) {
      root.children[0] = createNode(value, root.depth + 1, "left");
    } else {
      root.children[0] = insertAVL(root.children[0], value);
    }
  } else if (value > root.value) {
    if (!root.children[1]) {
      root.children[1] = createNode(value, root.depth + 1, "right");
    } else {
      root.children[1] = insertAVL(root.children[1], value);
    }
  } else {
    // Duplicate value, do nothing
    return root;
  }

  // Balance the tree
  const balanced = balanceNode(root);

  // Ensure all depths are updated
  updateDepth(balanced);

  return balanced;
}

// Delete a value from the AVL tree
export function deleteAVL(root: TreeNode | null, value: number): TreeNode | null {
  if (!root) return null;

  // Perform standard BST deletion
  if (value < root.value) {
    root.children[0] = deleteAVL(root.children[0], value);
  } else if (value > root.value) {
    root.children[1] = deleteAVL(root.children[1], value);
  } else {
    // Node to be deleted found

    // Case 1: Leaf node
    if (!root.children[0] && !root.children[1]) {
      return null;
    }

    // Case 2: Node with only one child
    if (!root.children[0]) {
      const temp = root.children[1];
      if (temp) temp.position = root.position;
      return temp;
    } else if (!root.children[1]) {
      const temp = root.children[0];
      if (temp) temp.position = root.position;
      return temp;
    }

    // Case 3: Node with two children
    // Find the inorder successor (smallest in right subtree)
    let successor = root.children[1];
    while (successor.children[0]) {
      successor = successor.children[0];
    }

    // Copy successor value to this node
    root.value = successor.value;

    // Delete the successor
    root.children[1] = deleteAVL(root.children[1], successor.value);
  }

  // If tree had only one node, return
  if (!root) return null;

  // Balance the tree
  const balanced = balanceNode(root);

  // Update depths
  updateDepth(balanced);

  return balanced;
}

// Validate if tree is a valid AVL tree
export function isValidAVL(node: TreeNode | null): boolean {
  if (!node) return true;

  // Check balance factor
  const balance = getBalanceFactor(node);
  if (balance < -1 || balance > 1) {
    console.error(`Invalid balance factor ${balance} at node ${node.value}`);
    return false;
  }

  // Check BST property
  if (node.children[0] && node.children[0].value >= node.value) {
    console.error(`BST property violated: left child ${node.children[0].value} >= parent ${node.value}`);
    return false;
  }

  if (node.children[1] && node.children[1].value <= node.value) {
    console.error(`BST property violated: right child ${node.children[1].value} <= parent ${node.value}`);
    return false;
  }

  // Recursively check children
  return isValidAVL(node.children[0]) && isValidAVL(node.children[1]);
}

// Pretty print the tree for debugging
export function printTree(node: TreeNode | null, prefix = "", isLeft = true): void {
  if (!node) return;

  console.log(`${prefix}${isLeft ? "├── " : "└── "}${node.value} (h:${node.height}, bf:${node.balanceFactor})`);

  printTree(node.children[0], `${prefix}${isLeft ? "│   " : "    "}`, true);
  printTree(node.children[1], `${prefix}${isLeft ? "│   " : "    "}`, false);
}

// Generate tree after insertion for solution
export function generateInsertSolution(root: TreeNode, value: number): TreeNode {
  const clonedRoot = structuredClone(root);
  return insertAVL(clonedRoot, value);
}

// Generate tree after deletion for solution
export function generateDeleteSolution(root: TreeNode, value: number): TreeNode | null {
  const clonedRoot = structuredClone(root);
  return deleteAVL(clonedRoot, value);
}
