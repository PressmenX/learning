import { useState } from "react";

export default function useLocalStorage(key: string, initialValue: string) {
  const [storedValue, setStoredValue] = useState<string>(() => {
    try {
      return localStorage.getItem(key) ?? initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (newValue: string) => {
    setStoredValue(newValue);
    try {
      localStorage.setItem(key, newValue);
    } catch {
      console.error("Error while saving");
    }
  };

  const clearStoredValue = () => {
    setStoredValue(initialValue)
    try {
      localStorage.removeItem(key);
    } catch {
      console.error("Error while deleting");
    }
  };

  return [storedValue, setValue, clearStoredValue] as const;
}
