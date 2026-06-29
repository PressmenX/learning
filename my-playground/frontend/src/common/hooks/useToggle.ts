import { useCallback, useState } from "react";

export default function useToggle(initialValue: boolean = false) {
  const [status, setStatus] = useState(initialValue);

  const toggle = useCallback(() => setStatus((curr) => !curr), []);
  const toggleToTrue = useCallback(() => setStatus(true), []);
  const toggleToFalse = useCallback(() => setStatus(false), []);

  return [status, toggle, toggleToTrue, toggleToFalse] as const;
}
