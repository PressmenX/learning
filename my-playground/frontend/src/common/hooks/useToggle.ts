import { useState } from "react";

export default function useToggle(initialValue: boolean = false) {
  const [status, setStatus] = useState(initialValue);

  const toggle = () => setStatus((curr) => !curr);

  return [status, toggle] as const
}
