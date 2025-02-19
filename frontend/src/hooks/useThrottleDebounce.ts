import { useCallback, useRef } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
type GenericFunction = (...args: any[]) => any;

/**
 * Throttle function: Ensures execution happens at most once in a specified time interval.
 */
export const throttle = (func: GenericFunction, delay = 200): GenericFunction => {
  let isThrottled = false;

  return function (...args: any[]) {
    if (!isThrottled) {
      func(...args);
      isThrottled = true;
      setTimeout(() => {
        isThrottled = false;
      }, delay);
    }
  };
};

/**
 * Custom React hook for throttling a function.
 */
export const useThrottle = (callback: GenericFunction, delay = 200): GenericFunction => {
  const throttleRef = useRef(false);

  return useCallback(
    (...args: any[]) => {
      if (!throttleRef.current) {
        callback(...args);
        throttleRef.current = true;
        setTimeout(() => {
          throttleRef.current = false;
        }, delay);
      }
    },
    [callback, delay]
  );
};

/**
 * Debounce function: Delays execution until the user stops triggering it for a certain delay time.
 */
export const debounce = (func: GenericFunction, delay = 200): GenericFunction => {
  let timeoutId: NodeJS.Timeout;

  return function (...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};
