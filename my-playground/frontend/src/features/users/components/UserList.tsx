import useToggle from "../../../common/hooks/useToggle";
import useEscapeKey from "../../../common/hooks/useEscapeKey";
import Modal from "../../../common/components/Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import { type IUser } from "../../../common/interfaces/user";
import UserListContent from "./UserListContent";
import { useFetch } from "../../../common/hooks/useFetch";

export default function UserList() {
  const [isModalOpen, , setModalOpen, setModalClose] = useToggle();
  useEscapeKey(isModalOpen, setModalClose);
  const [deletedMessage, setDeletedMessage] = useState("");
  const {
    data: users,
    setData: setUsers,
    isLoading,
    error,
  } = useFetch<IUser[]>("http://localhost:3000/users", {
    defaultValue: [],
    enabled: isModalOpen,
  });

  const handleUserDelete = (id: number) => {
    const deleteUser = async () => {
      try {
        const res = await axios.delete(`http://localhost:3000/users/${id}`);
        setUsers((prevUsers) => prevUsers.filter((u) => u.id !== id));
        setDeletedMessage(res.data.message);
      } catch (err) {
        console.log(err);
      }
    };

    deleteUser();
  };

  useEffect(() => {
    if (deletedMessage) {
      const timer = setTimeout(() => {
        setDeletedMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [deletedMessage]);

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
      {deletedMessage && (
        <div className="alert alert-success alert-soft fixed z-999 bottom-6 left-1/2 -translate-x-1/2">
          {deletedMessage}
        </div>
      )}
    </>
  );
}
