import clsx from "clsx";
import type { HTMLAttributes } from "react";
import type React from "react";
import cn from "../utils/cn";

interface ModalProps {
  isModalOpen: boolean;
  onCloseModal: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({
  isModalOpen,
  onCloseModal,
  children,
  title,
  className,
}: ModalProps & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx("modal", { "modal-open": isModalOpen })} role="dialog">
      <div className={cn("modal-box max-w-sm", className)}>
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
