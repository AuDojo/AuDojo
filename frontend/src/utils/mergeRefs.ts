/**
 * Merge multiple React refs into a single callback ref.
 *
 * @param refs Multiple refs to be merged.
 * @returns A single callback ref that will call all the provided refs.
 *
 * @example
 * const MyComponent = React.forwardRef((props, ref) => {
 *   const domRef = React.useRef();
 *   const mergedRef = mergeRefs(ref, domRef);
 *
 *   return <div ref={mergedRef} />;
 * });
 */
export function mergeRefs<T>(...refs: React.ForwardedRef<T>[]): React.RefCallback<T> {
  return (node: T) => {
    for (const ref of refs) {
      if (ref) {
        if (typeof ref === "function") ref(node);
        if ("current" in ref) ref.current = node;
      }
    }
  };
}
