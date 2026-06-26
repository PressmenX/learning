import { useState } from "react";
import TransactionForm from "./components/TransactionForm";
import { type Transaction } from "./interfaces/transaction.interface";
import TransactionHistory from "./components/TransactionHistory";

export default function PersonalExpenseTrackerPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleAddTransaction = (newTx: Transaction) => {
    setTransactions((prev) => [...prev, newTx]);
  };
  return (
    <>
      <TransactionForm onAddTransaction={handleAddTransaction} />
      <TransactionHistory data={transactions}/>
    </>
  );
}
