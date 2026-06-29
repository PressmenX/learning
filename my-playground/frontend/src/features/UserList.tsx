import clsx from "clsx";
import useToggle from "../common/hooks/useToggle";
import { StickyNote } from "lucide-react";
import useEscapeKey from "../common/hooks/useEscapeKey";

export default function UserList() {
  const [isModalOpen, , setModalOpen, setModalClose] = useToggle();
  useEscapeKey(isModalOpen, setModalClose)

 
  return (
    <>
      <button className="btn btn-primary" onClick={setModalOpen}>
        Users
      </button>

      <div
        className={clsx("modal", { "modal-open": isModalOpen })}
        role="dialog"
      >
        <div className="modal-box max-w-sm">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={setModalClose}
          >
            ✕
          </button>
          <h3 className="font-bold text-lg text-center mb-6">Users</h3>
          <div className="flex flex-col items-center justify-center gap-3 p-4">
            <StickyNote
              className="text-base-content/30"
              size={52}
              strokeWidth={1.5}
            />
            <p className="text-center text-sm text-base-content/60">
              User data not found
            </p>
          </div>
        </div>
        <div className="modal-backdrop" onClick={setModalClose}></div>
      </div>
    </>
  );
}
