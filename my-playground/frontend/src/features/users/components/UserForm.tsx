import { useForm } from "react-hook-form";
import Modal from "../../../common/components/Modal";
import useToggle from "../../../common/hooks/useToggle";
import type { IUser } from "../types";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { CheckCircle, CircleX } from "lucide-react";

export function UserForm() {
  const [isModalOpen, , setModalOpen, setModalClose] = useToggle();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<IUser>();
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (data: IUser) => {
    try {
      setLoading(true);
      await axios.post("http://localhost:3000/users", data);

      reset()
    } catch (err) {
      if (err instanceof AxiosError) {
        const errorMessage =
          err.response?.data.message ?? "Terjadi kesalahan pada server.";

        if (err.response?.data.exceptionName === "EmailAlreadyExistError") {
          setError("email", { message: errorMessage });
        } else {
          setError("root", { message: errorMessage });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button className="btn bg-blue-500 m-4" onClick={setModalOpen}>
        Add User
      </button>

      <Modal
        isModalOpen={isModalOpen}
        title="Add User"
        onCloseModal={setModalClose}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text font-semibold">Name</span>
            </label>
            <input
              type="text"
              className={`input input-bordered ${errors.name ? "input-error" : ""}`}
              {...register("name", {
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
            />
            {errors.name && (
              <div className="text-error text-sm mt-1">
                {errors.name.message as string}
              </div>
            )}
          </div>

          <div className="form-control w-full mb-6">
            <label className="label">
              <span className="label-text font-semibold">Email</span>
            </label>
            <input
              type="email"
              className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`}
              placeholder="mail@site.com"
              {...register("email", {
                required: "email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter valid email address",
                },
              })}
            />
            {errors.email && (
              <div className="text-error text-sm mt-1">
                {errors.email.message as string}
              </div>
            )}
          </div>

          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-dots loading-md"></span>
              ) : (
                "Add"
              )}
            </button>
          </div>
        </form>

        {errors.root && (
          <div className="badge badge-error badge-soft gap-2 p-2 text-sm mt-4 w-full flex justify-start">
            <CircleX size={16} />
            <span>Error! {errors.root.message}</span>
          </div>
        )}
        {isSubmitSuccessful && (
          <div className="badge badge-success badge-soft gap-2 p-2 text-sm mt-4 w-full flex justify-start">
            <CheckCircle size={16} />
            <span>Succeed! User added successfully</span>
          </div>
        )}
      </Modal>
    </>
  );
}
