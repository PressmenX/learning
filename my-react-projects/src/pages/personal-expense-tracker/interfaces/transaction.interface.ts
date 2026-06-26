export type TransactionCategory =
  | "Salary"
  | "Food"
  | "Transport"
  | "Shopping"
  | "Entertainment"
  | "Others";

export interface Transaction {
  name: string;
  amount: number | "";
  category: TransactionCategory | "";
  type: "income" | "expense";
  date: string;
}

export const CATEGORY_OPTIONS: TransactionCategory[] = [
  "Salary",
  "Food",
  "Transport",
  "Shopping",
  "Entertainment",
  "Others",
];
