import { CircleX, Trash } from "lucide-react";
import EmptyState from "../../../common/components/EmptyState";
import type { IUser } from "../../../common/interfaces/user";

interface UserListContentProps {
  users: IUser[];
  isLoading: boolean;
  error: string;
  onDeleteUser: (id: number) => void;
}

export default function UserListContent({
  users,
  isLoading,
  error,
  onDeleteUser,
}: UserListContentProps) {
  const handleUserDelete = (id: number) => {
    onDeleteUser(id);
  };

  if (isLoading)
    return (
      <div className="grid place-items-center gap-3 p-4">
        <span className="loading loading-spinner w-12 bg-base-content/60"></span>
        <p className="text-center text-sm text-base-content/60">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="grid place-items-center gap-3 p-4">
        <CircleX className="text-error" size={52} strokeWidth={1.5} />
        <p className="text-error text-sm text-center">{error}</p>
      </div>
    );

  if (users.length === 0) return <EmptyState text="User not found" />;

  return (
    <>
      <ul className="list bg-base-100 rounded-box shadow-md max-w-md max-h-100 border border-base-300 overflow-auto">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-row p-4 flex items-center justify-between gap-4 border-b border-base-200 last:border-b-0"
          >
            <div className="avatar avatar-placeholder">
              <div className="bg-neutral text-neutral-content w-10 rounded-full">
                <span className="text-sm font-semibold">
                  {user.name ? user.name.charAt(0).toUpperCase() : "-"}
                </span>
              </div>
            </div>

            <div className="flex flex-col flex-1 gap-0.5">
              <p className="font-semibold text-base-content text-sm">
                {user.name || "-"}
              </p>
              <p className="text-xs text-base-content/60">{user.email}</p>
            </div>

            <button
              className="btn btn-ghost btn-circle btn-sm text-error/70 hover:text-error hover:bg-error/10 transition-colors"
              onClick={() => handleUserDelete(user.id)}
            >
              <Trash size={18} />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
