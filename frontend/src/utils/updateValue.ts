import { RefObject } from "react";

/**
 * Sets the value of a React RefObject created with `useRef` or `createRef`.
 * @param ref - The ref object that you want to set the value of.
 * @param newValue - The new value of the ref.
 */
export function setRefValue<T>(ref: RefObject<T>, newValue: T) {
  ref.current = newValue;
}
