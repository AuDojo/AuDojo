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
interface BalanceIndicator {
  tree: TreeNode | null;
  copy: TreeNode | null;
  operation: "RR" | "LL" | "RL" | "LR" | "NO";
}
/**
 * Create a random AVL Tree with 3 - 12 nodes with values between 1 and 99
 * Tree is constructed by using consecutive insertAVL calls
 * @returns root node of randomly generated AVL Tree
 */
export function generateAVL(random: boolean, input: number[] | null): TreeNode | null {
  let root: TreeNode | null = null;
  const values = new Set<number>();

  if (random) {
    const nodeCount = Math.floor(Math.random() * 10) + 3;

    while (values.size < nodeCount) {
      const value = Math.floor(Math.random() * 99) + 1;
      values.add(value);
    }
  } else {
    if (!input) {
      return root;
    }
    for (const num of input) {
      values.add(num);
    }
  }
  for (const value of values) {
    root = insertAVLTracker(root, value, null);
    // printTree(root);
  }
  updateAllHeightsRecursive(root);

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
 * Helper function to update heights for all nodes in a subtree (especially important after Insertion)
 * @param node root node of subtree
 * @returns subtree with updated heights
 */
function updateAllHeightsRecursive(node: TreeNode | null): void {
  if (!node) return;
  updateAllHeightsRecursive(node.children[0]);
  updateAllHeightsRecursive(node.children[1]);

  updateHeightAndBalanceFactor(node);
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
  console.log("======= Right rotation at", y.value, "=========");
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

function addSteps(steps: TreeStep[] | null, subTree: BalanceIndicator, rootRef: { current: TreeNode | null }) {
  if (steps) {
    console.log("==== Hello from steps ====");
    switch (subTree.operation) {
      case "LL":
        steps.push({
          tree: structuredClone(rootRef.current),
          operation: "LL Case: Performed right rotation",
        });
        break;
      case "LR":
        steps.push({
          tree: subTree.copy,
          operation: "LR Case: Performed first left rotation",
        });
        steps.push({
          tree: structuredClone(rootRef.current),
          operation: "LR Case: Performed second right rotation",
        });
        break;
      case "RR":
        steps.push({
          tree: structuredClone(rootRef.current),
          operation: "RR Case: Performed left rotation",
        });
        break;
      case "RL":
        steps.push({
          tree: subTree.copy,
          operation: "RL Case: Performed first right rotation",
        });
        steps.push({
          tree: structuredClone(rootRef.current),
          operation: "RL Case: Performed second left rotation",
        });
        break;
      default:
        console.log("default triggered");
    }
  }
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
        steps.push({ tree: structuredClone(newNode), operation: "INSERT" });
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

  //push initial tree
  if (steps && root) {
    steps.push({ tree: structuredClone(root), operation: "Intial Tree" });
  }

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
          });
          changeOccured = false;
        }
      }
      console.log("subtree operation", subTree.operation);
    } else if (val > node.value) {
      const oldRight = node.children[1];
      const subTree = deleteAVL(node.children[1], val);
      node.children[1] = subTree.tree;
      if (oldRight !== node.children[1]) {
        if (changeOccured && steps) {
          steps.push({
            tree: structuredClone(rootRef.current),
            operation: `After removing ${val}`,
          });
          changeOccured = false;
        }
      }
      console.log("subtree operation", subTree.operation);
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

  console.log("==== Starting Deletion Practive for value", value, "====");
  deleteAVLTracker(clonedRoot, value, steps);
  /*
  console.log(`===== PRINTING ${steps.length} SOLUTION STEPS =====`);
  steps.forEach((step, index) => {
    console.log(`Step ${index + 1}: ${step.operation}`);
    if (step.tree) {
      console.log(`Tree structure at step ${index + 1}:`);
      printTree(step.tree);
    } else {
      console.log(`No tree data available for step ${index + 1}`);
    }
    console.log("-----------------------------------");
  });
  */
  console.log("==== Ending Deletion Practive for value", value, "====");
  return steps;
}
