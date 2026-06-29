import type React from "react";
import cn from "../utils/cn";

interface ModalProps {
  isModalOpen: boolean;
  onCloseModal: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export default function Modal({
  isModalOpen,
  onCloseModal,
  children,
  title,
  className,
  contentClassName,
}: ModalProps) {
  return (
    <div
      className={cn("modal", { "modal-open": isModalOpen }, className)}
      role="dialog"
    >
      <div className={cn("modal-box max-w-sm", contentClassName)}>
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onCloseModal}
        >
          ✕
        </button>
        <h3 className="font-bold text-lg text-center mb-6">{title}</h3>
        {children}
      </div>
      <div className="modal-backdrop" onClick={onCloseModal}></div>
    </div>
  );
}
