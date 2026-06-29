import { Eye, EyeOff } from "lucide-react";
import Modal from "../common/components/Modal";
import useToggle from "../common/hooks/useToggle";
import clsx from "clsx";
import useEscapeKey from "../common/hooks/useEscapeKey";

export default function PasswordInput() {
  const [isPasswordVisible, togglePassword] = useToggle();
  const [isModalOpen, , setModalOpen, setModalClose] = useToggle();
  useEscapeKey(isModalOpen, setModalClose)

  return (
    <>
      <button className="btn btn-accent" onClick={setModalOpen}>
        Password Input
      </button>

      <Modal
        isModalOpen={isModalOpen}
        onCloseModal={setModalClose}
        title="Password"
      >
        <form className="relative w-full max-w-xs">
          <input
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
            className="input input-bordered w-full pr-10"
          />
          <button
            type="button"
            onClick={togglePassword}
            className={clsx(
              "absolute inset-y-0 right-0 flex items-center pr-3 text-base-content/50 hover:text-base-content/80 transition-colors swap swap-rotate",
              { "swap-active": isPasswordVisible },
            )}
          >
            {isPasswordVisible ? (
              <Eye className="swap-on h-5 w-5" />
            ) : (
              <EyeOff className="swap-off h-5 w-5" />
            )}
          </button>
        </form>
      </Modal>
    </>
  );
}
