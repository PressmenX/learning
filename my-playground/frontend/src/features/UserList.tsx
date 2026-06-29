import useToggle from "../common/hooks/useToggle";
import { StickyNote } from "lucide-react";
import useEscapeKey from "../common/hooks/useEscapeKey";
import Modal from "../common/components/Modal";

export default function UserList() {
  const [isModalOpen, , setModalOpen, setModalClose] = useToggle();
  useEscapeKey(isModalOpen, setModalClose);

  return (
    <>
      <button className="btn btn-primary" onClick={setModalOpen}>
        Users
      </button>

      <Modal isModalOpen={isModalOpen} onCloseModal={setModalClose} title="Users">
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
      </Modal>
    </>
  );
}
