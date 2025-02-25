import { useEffect, useMemo, useState } from "react";

/**
 * A React hook that provides a way to read and write to the browser's localStorage.
 * When the value is updated, the hook will save the new value to localStorage.
 * The hook also listens for changes to the localStorage key and updates the component if the key changes.
 * @param key The key to store the value in localStorage
 * @param initialValue The initial value for the key if it doesn't exist
 * @param typeguard An optional function that verifies the type of the stored value
 * @returns An array of two values: the stored value and a function to update the stored value
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  typeguard?: (value: unknown) => value is T
): [T, (value: T | ((val: T) => T)) => void] {
  const safeTypeGuard = useMemo(
    () => typeguard ?? ((value: unknown): value is T => typeof value === typeof initialValue),
    [initialValue, typeguard]
  );

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const storedValue = window.localStorage.getItem(key);
      if (storedValue) {
        const parsedValue = JSON.parse(storedValue);
        // If the type is correct, use the stored value
        if (safeTypeGuard(parsedValue)) {
          return parsedValue;
        }
      }
      // If the key doesn't exist or type is incorrect, use the initialValue
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
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key !== key) return;

      try {
        const newValue = event.newValue ? JSON.parse(event.newValue) : initialValue;
        if (safeTypeGuard(newValue)) {
          // If the type is correct, update the component with the new value
          setStoredValue(newValue);
        } else {
          // If the type is incorrect, reset the component to the initialValue
          setStoredValue(initialValue);
        }
      } catch (error) {
        console.error(`Error reading localStorage key ${key}`, error);
        setStoredValue(initialValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, initialValue, safeTypeGuard]);

  return [storedValue, setValue] as const;
}
