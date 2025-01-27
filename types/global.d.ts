export {};

declare global {
  interface ListTransaction {
    category: string
    type: string
    amount: number
    createdAt: string | Date
  }
  type Options = {
    label: string
    value: TransactionType
  }[]
  type TransactionType = 'expense' | 'income' | 'transfer'
}