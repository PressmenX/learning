import React, {
  useRef,
  useState,
  type ChangeEvent,
  type SubmitEvent,
} from "react";

function Form() {
  const [email, setEmail] = useState<string>("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handleFormSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Email : ${email}`);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="email" onChange={handleEmailChange} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default function App() {
  return (
    <>
      <Form />
    </>
  );
}
