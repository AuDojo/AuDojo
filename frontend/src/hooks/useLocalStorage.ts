import { useEffect, useState } from "react";

/**
 * A React hook that provides a way to read and write to the browser's localStorage.
 * The hook uses the `key` parameter to read and write to the correct localStorage key.
 * The `initialValue` parameter is used to initialize the value for the key if it doesn't exist.
 * The `typeGuard` parameter is an optional function that can be used to verify the type of the stored value.
 * If the type guard is provided and the stored value does not match the type, the initialValue is used instead.
 * When the value is updated, the hook will save the new value to localStorage.
 * The hook also listens for changes to the localStorage key and updates the component if the key changes.
 * @param key The key to store the value in localStorage
 * @param initialValue The initial value for the key if it doesn't exist
 * @param typeGuard An optional function that verifies the type of the stored value
 * @returns An array of two values: the stored value and a function to update the stored value
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  typeGuard?: (value: unknown) => value is T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const storedValue = window.localStorage.getItem(key);
      if (storedValue) {
        const parsedValue = JSON.parse(storedValue);
        if (typeGuard) {
          // If the type guard is provided and the type is correct, use the stored value
          if (typeGuard(parsedValue)) {
            return parsedValue;
          }
          // If the type guard is provided and the type is incorrect, use the initialValue
          return initialValue;
        }
        // If the type guard is not provided, use the stored value
        return parsedValue;
      }

      // If the key doesn't exist, use the initialValue
      return initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key ${key}`, error);
      return initialValue;
    }
  });

  /**
   * Updates the stored value and saves it to localStorage.
   * If the value is a function, it is called with the current stored value as an argument and the result is stored.
   * If the value is not a function, it is stored as-is.
   * If there is an error storing the value, an error is logged to the console.
   * @param value The value to store in localStorage. Can be a value or a function that takes the current stored value as an argument.
   */
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key ${key}`, error);
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const storedValue = window.localStorage.getItem(key);
      if (storedValue) {
        const parsedValue = JSON.parse(storedValue);
        if (typeGuard?.(parsedValue)) {
          // If the type is correct, update the component with the new value
          setStoredValue(parsedValue);
        } else {
          // If the type is incorrect, reset the component to the initialValue
          setStoredValue(initialValue);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, initialValue, typeGuard]);

  return [storedValue, setValue] as const;
}
