export default interface Transaction {
  name: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
}