import useToggle from "../../common/hooks/useToggle";
import useEscapeKey from "../../common/hooks/useEscapeKey";
import Modal from "../../common/components/Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import { type IUser } from "../../common/interfaces/user";
import UserListContent from "./components/UserListContent";

export default function UserList() {
  const [isModalOpen, , setModalOpen, setModalClose] = useToggle();
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEscapeKey(isModalOpen, setModalClose);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const res = await axios.get("http://localhost:3000/users");
        setUsers(res.data.result ?? []);
      } catch (err) {
        setError("Error: User data failed to retrieve");
        console.log(err);
      } finally {
        setLoading(false);
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
        <UserListContent users={users} isLoading={isLoading} error={error} />
      </Modal>
    </>
  );
}
