import DraftText from "./features/DraftText";
import PasswordInput from "./features/PasswordInput";
import { UserForm } from "./features/users/components/UserForm";
import UserList from "./features/users/components/UserList";

export default function App() {
  return (
    <>
      <UserList />
      <PasswordInput />
      <UserForm />
      <DraftText />
    </>
  );
}
