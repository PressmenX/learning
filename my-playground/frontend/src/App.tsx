import DraftText from "./features/DraftText";
import PasswordInput from "./features/PasswordInput";
import UserList from "./features/users/UserList";

export default function App() {
  return (
    <>
      <UserList />
      <PasswordInput />
      <DraftText />
    </>
  );
}
