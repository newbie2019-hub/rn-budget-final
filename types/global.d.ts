export {};

declare global {
  interface ListTransaction {
    category: string
    type: string
    amount: number
    createdAt: string | Date
  }
  type TransactionType = 'expense' | 'income' | 'transfer'
}