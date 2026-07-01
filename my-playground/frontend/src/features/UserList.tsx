import useToggle from "../common/hooks/useToggle";
import useEscapeKey from "../common/hooks/useEscapeKey";
import Modal from "../common/components/Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import { type IUser } from "../common/interfaces/user";
import EmptyState from "../common/components/EmptyState";

export default function UserList() {
  const [isModalOpen, , setModalOpen, setModalClose] = useToggle();
  const [users, setUsers] = useState<IUser[]>([]);
  useEscapeKey(isModalOpen, setModalClose);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/users");
        setUsers(res.data.result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <button className="btn btn-primary m-4" onClick={setModalOpen}>
        Users
      </button>

      <Modal
        isModalOpen={isModalOpen}
        onCloseModal={setModalClose}
        title="Users"
      >
        <EmptyState text="User not found" />

        <ul className="list bg-base-100 rounded-box shadow-md max-w-md border border-base-200">
          {users.map((user) => (
            <li
              key={user.id}
              className="list-row p-4 flex items-center gap-4 border-b border-base-200 last:border-b-0"
            >
              <div className="avatar avatar-placeholder">
                <div className="bg-neutral text-neutral-content w-10 rounded-full">
                  <span className="text-sm font-semibold">
                    {user.name ? user.name.charAt(0).toUpperCase() : "-"}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="font-semibold text-base-content text-sm">
                  {user.name ?? "-"}
                </p>
                <p className="text-xs text-base-content/60">{user.email}</p>
              </div>
            </li>
          ))}
        </ul>
      </Modal>
    </>
  );
}
