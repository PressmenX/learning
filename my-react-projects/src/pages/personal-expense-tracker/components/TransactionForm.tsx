import React, { useState } from "react";
import {
  CATEGORY_OPTIONS,
  type Transaction,
} from "../interfaces/transaction.interface";

export default function TransactionForm() {
  const [formData, setFormData] = useState<Transaction>({
    name: "",
    amount: "",
    category: "",
    type: "expense",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (value.includes("0")) {
      return;
    }
    if (value !== "" && !/^\d+$/.test(value)) {
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className="grid bg-base-200 border-base-300 rounded-box w-xs border p-4 shadow-md">
      <fieldset className="fieldset my-2 gap-4">
        <legend className="fieldset-legend text-center font-bold text-sm">
          Add Transaction
        </legend>

        <div>
          <label htmlFor="tx-name" className="label">
            Name
          </label>
          <input
            id="tx-name"
            name="name"
            type="text"
            className="input validator"
            placeholder="e.g., Buy a Burger"
            value={formData.name}
            onChange={handleChange}
            required
            minLength={3}
          />
          <span className="validator-hint">Name is required and must be at least 3 characters</span>
        </div>

        <div>
          <label htmlFor="tx-amount" className="label">
            Amount
          </label>
          <input
            id="tx-amount"
            name="amount"
            type="text"
            className="input validator"
            placeholder="e.g., Rp 15.000"
            value={formData.amount}
            onChange={handleNumberChange}
            required
            min={1}
          />
          <span className="validator-hint">Amount is required and a minimum of 1</span>
        </div>

        <div>
          <label htmlFor="tx-category" className="label">
            Category
          </label>
          <select
            id="tx-category"
            name="category"
            className="select validator"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option disabled={true} value={""}>
              Pick a category
            </option>
            {CATEGORY_OPTIONS.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <span className="validator-hint">Category is required</span>
        </div>

        <div>
          <span className="label">Transaction Type</span>
          <div className="flex gap-2">
            <button
              type="button"
              className={`btn btn-sm flex-1 ${formData.type === "income" ? "bg-income text-income-subtle" : ""}`}
            >
              Income
            </button>
            <button
              type="button"
              className={`btn btn-sm flex-1 ${formData.type === "expense" ? "bg-expense text-expense-subtle" : ""}`}
            >
              Expense
            </button>
          </div>
        </div>
      </fieldset>

      <button type="submit" className="btn btn-neutral ">
        Add
      </button>
    </form>
  );
}
