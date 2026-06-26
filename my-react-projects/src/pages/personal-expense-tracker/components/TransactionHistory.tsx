import Modal from "@/common/components/Modal";
import { useState } from "react";
import type { Transaction } from "../interfaces/transaction.interface";
import clsx from "clsx";

export default function TransactionHistory({ data }: { data: Transaction[] }) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <button className="block mx-auto my-4 btn btn-outline" onClick={() => setIsModalOpen(true)}>
        View History
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col gap-4">
          <div className="border-b border-base-300 pb-2">
            <h3 className="text-lg font-bold text-base-content">
              Transaction History
            </h3>
            <p className="text-xs text-base-content/60">
              Overview of your recent financial activities
            </p>
          </div>

          <div className="flex flex-col gap-3 max-h-96 overflow-y-auto p-2 pr-1">
            {data.map((d) => (
              <div className="flex items-center justify-between p-3 rounded-xl bg-base-100 border border-gray-200 shadow-md">
                <div className="flex items-center gap-3">
                  <div
                    className={clsx(
                      "w-10 h-10 rounded-lg flex items-center justify-center  font-bold",
                      {
                        "bg-income/10 text-income": d.type === "income",
                        "bg-expense/10 text-expense": d.type === "expense",
                      },
                    )}
                  >
                    {d.type === "income" ? "↑" : "↓"}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-base-content">
                      {d.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-base-content/50">
                        {d.date}
                      </span>
                      <span className="badge badge-xs badge-ghost text-base-content/70 py-1.5">
                        {d.category}
                      </span>
                    </div>
                  </div>
                </div>
                <span
                  className={clsx("font-bold text-sm", {
                    "text-income/70": d.type === "income",
                    "text-expense/70": d.type === "expense",
                  })}
                >
                  {(d.type === "income" ? "+" : "-") + d.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
}
