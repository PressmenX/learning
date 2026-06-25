import { useState } from "react";
import TransactionForm from "./components/TransactionForm";
import { type Transaction } from "./interfaces/transaction.interface";

export default function PersonalExpenseTrackerPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleAddTransaction = (newTx: Transaction) => {
    setTransactions((prev) => [...prev, newTx]);
  };
  return (
    <>
      <TransactionForm onAddTransaction={handleAddTransaction} />
      <div>
        {transactions.map(tx => (
          <p>{tx.name}</p>
        ))}
      </div>
    </>
  );
}
