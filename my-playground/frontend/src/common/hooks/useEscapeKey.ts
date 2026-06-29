import { useEffect, useRef } from "react";

export default function useEscapeKey(isOpen: boolean, setClose: () => void) {
  const savedCallback = useRef(setClose);

  useEffect(() => (savedCallback.current = setClose), [setClose]);
  useEffect(() => {
    if (!isOpen) return;
    const handleGlobalEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        savedCallback.current();
      }
    };

    window.addEventListener("keydown", handleGlobalEscapeKey);

    return () => window.removeEventListener("keydown", handleGlobalEscapeKey);
  }, [isOpen]);
}
