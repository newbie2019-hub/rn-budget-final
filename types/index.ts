export type Transaction = {
  amount: number | string;
  type: TransactionType
  addedAt: Date
  categoryId: number | null
  walletId: number | null
  notes: string
}

export type TransactionAction =
  | { type: 'setAmount'; payload: number | string }
  | { type: 'setWalletId'; payload: number }
  | { type: 'setCategoryId'; payload: number }
  | { type: 'setNotes'; payload: string }
  | { type: 'setType'; payload: TransactionType }
  | { type: 'setDate'; payload: Date };

export interface TransactionContext {
  deleteTransaction: (id: number) => Promise<void>
  transactionSummary: { income: number, expense: number }
}