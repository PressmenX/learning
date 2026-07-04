import useToggle from "../../../common/hooks/useToggle";
import useEscapeKey from "../../../common/hooks/useEscapeKey";
import Modal from "../../../common/components/Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import { type IUser } from "../../../common/interfaces/user";
import UserListContent from "./UserListContent";
import { ImageUp } from "lucide-react";

export default function UserList() {
  const [isModalOpen, , setModalOpen, setModalClose] = useToggle();
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEscapeKey(isModalOpen, setModalClose);

  const handleUserDelete = (id: number) => {
    const deleteUser = async () => {
      try {
        const res = await axios.delete(`http://localhost:3000/users/${id}`);

        setUsers(users.filter((u) => u.id !== id));
      } catch (err) {
        console.log(err);
      }
    };

    deleteUser();
  };

  useEffect(() => {
    if (!isModalOpen) return;
    const controller = new AbortController();

    const fetchUsers = async () => {
      try {
        setLoading(true);

        const res = await axios.get("http://localhost:3000/users", {
          signal: controller.signal,
        });

        setUsers(res.data.result ?? []);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request aborted:", err);
        } else {
          console.error("API ERROR : ", err);
          setError(
            "Failed to load data. Please check your connection and try again.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchUsers();

    return () => controller.abort();
  }, [isModalOpen]);

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
        <UserListContent
          users={users}
          isLoading={isLoading}
          error={error}
          onDeleteUser={handleUserDelete}
        />
      </Modal>
    </>
  );
}
