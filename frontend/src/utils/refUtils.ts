import React from "react";

/**
 * Merge multiple React refs into a single callback ref.
 *
 * @param refs Multiple refs to be merged.
 * @returns A single callback ref that will call all the provided refs.
 *
 * @example
 * const MyComponent = (props, ref1) => {
 *   const ref2 = React.useRef();
 *   const mergedRef = mergeRefs(ref1, ref2);
 *
 *   return <div ref={mergedRef} />;
 * };
 */
export function mergeRefs<T>(...refs: React.Ref<T>[]): React.RefCallback<T> {
  return (node: T) => {
    for (const ref of refs) {
      if (ref) {
        if (typeof ref === "function") ref(node);
        if ("current" in ref) ref.current = node;
      }
    }
  };
}

/**
 * Sets the value of a React RefObject created with `useRef` or `createRef`.
 * @param ref - The ref object that you want to set the value of.
 * @param newValue - The new value of the ref.
 */
export function setRefValue<T>(ref: React.RefObject<T> | unknown, newValue: T) {
  if (typeof ref === "object") {
    if ("current" in ref) ref.current = newValue;
  }
}
