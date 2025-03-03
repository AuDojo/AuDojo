import { TreeNode } from "@/features/treeTutor/utils/treeUtils";

/**
 * Interface for each step to be recorded in the steps array for solution display
 * @tree root Node of the Tree after Operation has been carried out
 * @operation Name of the Operation, recorded to display it within the template per solution step
 */
export interface TreeStep {
  tree: TreeNode | null;
  operation: string;
}

/**
 * Create a random AVL Tree with 3 - 12 nodes with values between 1 and 99
 * Tree is constructed by using consecutive insertAVL calls
 * @returns root node of randomly generated AVL Tree
 */
export function generateRandomAVL(): TreeNode | null {
  let root: TreeNode | null = null;
  const nodeCount = Math.floor(Math.random() * 10) + 3;

  const values = new Set<number>();
  while (values.size < nodeCount) {
    const value = Math.floor(Math.random() * 99) + 1;
    values.add(value);
  }
  for (const value of values) {
    root = insertAVLTracker(root, value, null);
    console.log(`After inserting ${value}, tree structure:`);
    // printTree(root);
  }

  console.log("Tree After Construction:");
  printTree(root);

  return root;
}

/**
 * @param node
 * @returns height property of the TreeNode
 */
function getHeight(node: TreeNode | null): number {
  return node ? node.height : -1;
}

/**
 * @param node
 * @returns balance Factor property of the TreeNode
 */
function getBalanceFactor(node: TreeNode | null): number {
  if (!node) return 0;
  return getHeight(node.children[0]) - getHeight(node.children[1]);
}

/**
 * Function that sets the height and BalanceFactor of a node based on childrens height
 * @param node node of which the height is to be updated
 */
function updateHeightAndBalanceFactor(node: TreeNode): void {
  node.height = 1 + Math.max(getHeight(node.children[0]), getHeight(node.children[1]));
  node.balanceFactor = getBalanceFactor(node);
}

/**
 * Recursivley Update node.depth for every node in the tree starting at Root
 * @param node (sub-) tree for which the depth is to be recaluclated
 * @param depth parameter to track the depth throught the tree
 */
function updateDepth(node: TreeNode | null, depth = 0): void {
  if (!node) return;

  node.depth = depth;
  updateDepth(node.children[0], depth + 1);
  updateDepth(node.children[1], depth + 1);
}

/**
 * Helper function that facilitates node creation required in insertAVL
 * Initialized the node with default values that will be altered dynamically during insertAVL operation
 * @param value
 * @param depth
 * @param position
 * @returns new Node with default values
 */
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
  if (!y.children[0]) return y;
  console.log("Sub-Tree Before right rotation");
  printTree(y);
  console.log(`Performing right rotation at node ${y.value}`);

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

  console.log("subtree after rotation");
  printTree(x);

  return x;
}

/**
 * AVL Left Rotation (RR-Case):

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

  console.log("subtree before left rotation");
  printTree(x);

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
  updateDepth(y);

  console.log("subtree after left rotation");
  printTree(y);

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
export function balanceNode(node: TreeNode, rootRef: { current: TreeNode | null }, steps: TreeStep[] | null): TreeNode {
  if (!node) return node;
  if (!rootRef.current) return node;

  // Update height balance factor
  updateHeightAndBalanceFactor(node);
  updateHeightAndBalanceFactor(rootRef.current);

  const balance = getBalanceFactor(node);

  //no tracking needed
  if (balance >= -1 && balance <= 1) {
    return node;
  }

  // Left-Left Case
  if (balance > 1 && node.children[0] && getBalanceFactor(node.children[0]) >= 0) {
    const rotated = rightRotate(node);

    if (rootRef.current === node) {
      rootRef.current = rotated;
    }

    if (steps) {
      steps.push({
        tree: structuredClone(rootRef.current),
        operation: `After Right Rotation (LL case at ${node.value})`,
      });
    }
    return rotated;
  }

  // Right-Right Case
  if (balance > 1 && node.children[0] && getBalanceFactor(node.children[0]) < 0) {
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
export function insertAVLTracker(currentRoot: TreeNode | null, value: number, steps: TreeStep[] | null): TreeNode {
  const rootRef: { current: TreeNode | null } = { current: currentRoot };

  function takeSnapshot(operation: string): void {
    if (!steps) return;
    steps.push({
      tree: structuredClone(currentRoot),
      operation: operation,
    });
  }

  // take initial snapshot, if tracking
  if (currentRoot && steps) {
    takeSnapshot("Initial Tree");
  }

  function insertAVL(node: TreeNode | null, value: number): TreeNode {
    // Base case: create new node if tree is empty
    if (!node) {
      const newNode = createNode(value, 0, "root");
      rootRef.current = newNode;

      if (steps) {
        steps.push({ tree: structuredClone(newNode), operation: "INSERT" });
      }
      return newNode;
    }

    // Perform standard BST insertion
    if (value < node.value) {
      if (!node.children[0]) {
        node.children[0] = createNode(value, node.depth + 1, "left");

        if (steps) {
          steps.push({
            tree: structuredClone(rootRef.current),
            operation: `INSERT ${value} as left child of ${node.value}`,
          });
        }
      } else {
        node.children[0] = insertAVL(node.children[0], value);
      }
    } else if (value > node.value) {
      if (!node.children[1]) {
        node.children[1] = createNode(value, node.depth + 1, "right");
        if (steps) {
          steps.push({
            tree: structuredClone(rootRef.current),
            operation: `INSERT ${value} as right child of ${node.value}`,
          });
        }
      } else {
        node.children[1] = insertAVL(node.children[1], value);
      }
    } else {
      // Duplicate value, do nothing
      return node;
    }
    // Balance the tree
    const balanced = balanceNode(node, rootRef, steps);

    // Ensure all depths are updated
    updateDepth(balanced);

    return balanced;
  }
  return insertAVL(currentRoot, value);
}

// Delete a value from the AVL tree
export function deleteAVLTracker(root: TreeNode | null, value: number, steps: TreeStep[]): TreeNode | null {
  const rootRef: { current: TreeNode | null } = { current: root };
  let changeOccured = false;

  //push initial tree
  if (steps && root) {
    steps.push({ tree: structuredClone(root), operation: "Intial Tree" });
  }

  function deleteAVL(node: TreeNode | null, val: number): TreeNode | null {
    if (!node) return null;

    // Perform standard BST deletion
    if (val < node.value) {
      const oldLeft = node.children[0];
      node.children[0] = deleteAVL(node.children[0], val);

      if (oldLeft !== node.children[0]) {
        if (changeOccured && steps) {
          steps.push({
            tree: structuredClone(rootRef.current),
            operation: `After removing ${val}`,
          });
          changeOccured = false;
        }
      }
    } else if (val > node.value) {
      const oldRight = node.children[1];
      node.children[1] = deleteAVL(node.children[1], val);
      if (oldRight !== node.children[1]) {
        if (changeOccured && steps) {
          steps.push({
            tree: structuredClone(rootRef.current),
            operation: `After removing ${val}`,
          });
          changeOccured = false;
        }
      }
    } else {
      // Node to be deleted found

      // Case 1: Leaf node
      if (!node.children[0] && !node.children[1]) {
        if (rootRef.current === node) {
          rootRef.current = null;
        }
        changeOccured = true;
        return null;
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
        return temp;
      } else if (!node.children[1]) {
        const temp = node.children[0];
        if (temp) temp.position = node.position;
        if (rootRef.current === node) {
          rootRef.current = temp;
        }
        changeOccured = true;
        return temp;
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
        });
      }

      changeOccured = true;
      // Delete the successor
      node.children[1] = deleteAVL(node.children[1], successor.value);
      if (oldRight !== node.children[1] && changeOccured && steps) {
        steps.push({
          tree: structuredClone(rootRef.current),
          operation: `After removing successor ${successor.value}`,
        });
        changeOccured = false; // Reset flag
      }
    }

    // If tree had only one node, return
    if (!node) return null;

    // Balance the tree
    const balanced = balanceNode(node, rootRef, steps);

    // Update depths
    updateDepth(balanced);

    return balanced;
  }
  return deleteAVL(root, value);
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
export function generateInsertSolution(root: TreeNode, value: number): TreeStep[] {
  const steps: TreeStep[] = [];
  const clonedRoot = structuredClone(root);
  insertAVLTracker(clonedRoot, value, steps);
  return steps;
}
export function generateDeleteSolution(root: TreeNode, value: number): TreeStep[] {
  const steps: TreeStep[] = [];
  const clonedRoot = structuredClone(root);
  deleteAVLTracker(clonedRoot, value, steps);
  return steps;
}
