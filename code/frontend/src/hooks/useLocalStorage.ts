import { useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T, typeGuard: (value: unknown) => value is T) {
  // Try to get stored value from localStorage
  const storedValue = JSON.parse(localStorage.getItem(key) || "null");

  // Using Type guard to ensure the stored value is of type T
  const initial = storedValue && typeGuard(storedValue) ? storedValue : initialValue;

  // State to store our value
  const [storedData, setStoredData] = useState<T>(initial);

  const setData = (value: T) => {
    setStoredData(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedData, setData] as const;
}
