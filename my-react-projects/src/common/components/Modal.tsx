import type { HTMLAttributes } from "react";
import { cn } from "../utils/cn";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  className,
}: ModalProps & HTMLAttributes<HTMLDivElement>) {
  if (!isOpen) return null;

  return (
    <div className={cn("modal", { "modal-open": isOpen })}>
      <div className={cn("modal-box relative", className)}>
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        {children}
      </div>
      <div className="modal-backdrop" onClick={onClose} />
    </div>
  );
}
