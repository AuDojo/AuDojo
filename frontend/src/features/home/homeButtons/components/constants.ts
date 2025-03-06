/** -------------------- Sorting -------------------- */

// demo data to show bubble sort animation on homebutton
export const demoArray: number[] = [4, 3, 1, 2, 6, 5];

export const demoProcess = [
  [4, 3, 1, 2, 6, 5],
  [3, 4, 1, 2, 6, 5],
  [3, 1, 4, 2, 6, 5],
  [3, 1, 2, 4, 6, 5],
  [3, 1, 2, 4, 5, 6],
  [1, 3, 2, 4, 5, 6],
  [1, 2, 3, 4, 5, 6],
];

export const demoBubbleElements = [0, 1, 2, 4, 0, 1];

export const durationSorting = 600;

/** -------------------- AVLTree -------------------- */
// Override type TreeNode
export interface TreeNode {
  value: number | null;
  children?: [TreeNode, TreeNode];
}

export const durationTreeOperation = 300;
export const nodeSize = { width: 45, height: 50 };
export const circleRadius = 10;

export const initialData: TreeNode = {
  value: 10,
  children: [
    {
      value: 9,
      children: [{ value: 1 }, { value: null }],
    },
    {
      value: 15,
      children: [
        {
          value: 13,
          children: [{ value: 12 }, { value: null }],
        },
        { value: 18 },
      ],
    },
  ],
};

export const deleteNode: TreeNode = {
  value: 10,
  children: [
    {
      value: 1,
      children: [{ value: null }, { value: null }],
    },
    {
      value: 15,
      children: [
        {
          value: 13,
          children: [{ value: 12 }, { value: null }],
        },
        { value: 18 },
      ],
    },
  ],
};

export const restructureNode: TreeNode = {
  value: 13,
  children: [
    {
      value: 10,
      children: [{ value: 1 }, { value: 12 }],
    },
    {
      value: 15,
      children: [{ value: null }, { value: 18 }],
    },
  ],
};

export const insertFirstNode: TreeNode = {
  value: 13,
  children: [
    {
      value: 10,
      children: [
        { value: 1 },
        {
          value: 12,
          children: [{ value: 11 }, { value: null }],
        },
      ],
    },
    {
      value: 15,
      children: [{ value: null }, { value: 18 }],
    },
  ],
};

export const insertSecondNode: TreeNode = {
  value: 13,
  children: [
    {
      value: 10,
      children: [
        {
          value: 1,
        },
        { value: 12, children: [{ value: 11 }, { value: null }] },
      ],
    },
    {
      value: 15,
      children: [{ value: 14 }, { value: 18 }],
    },
  ],
};
