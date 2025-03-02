export const INVALID_ARRAY_INPUTS: string[] = [
  // more than 15 elements,
  "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16",
  // less than 1 element,
  "5",
  // value over 99 exists,
  "100 200",
] as const;

export const VALID_ARRAY_INPUT = "99 54 32 18";
export const EXPECTED_ARRAY = VALID_ARRAY_INPUT.split(" ");
