import type { Transaction } from "./transaction.interface";

export interface TransactionFormProps {
  onAddTransaction: (transaction: Transaction) => void;
}
