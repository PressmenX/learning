import { useState } from "react";
import Transaction from "../interfaces/transaction.interface";

export default function TransactionForm() {
  const [formData, setFormData] = useState<Transaction>({
    name: "",
    amount: 0,
    category: "",
    type: "expense",
  });
}
