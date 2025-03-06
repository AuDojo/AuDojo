import { MAX_ARRAY_SIZE, MAX_INPUT_RANGE, MIN_ARRAY_SIZE, MIN_INPUT_RANGE } from "./constants";

/**
 * Checks if the provided value is a valid array of numbers within specified constraints.
 *
 * @param value - The value to be checked.
 */
export function isValidArray(value: unknown): value is number[] {
  return (
    Array.isArray(value) &&
    value.every((item) => typeof item === "number" && item >= MIN_INPUT_RANGE && item <= MAX_INPUT_RANGE) &&
    value.length <= MAX_ARRAY_SIZE &&
    value.length >= MIN_ARRAY_SIZE
  );
}
