import { Colors } from "@/constants/Colors";

export type Transaction = {
  amount: number | string;
  type: TransactionType;
  addedAt: Date;
  categoryId: number | null;
  walletId: number | null;
  notes: string;
};

export type TransactionAction =
  | { type: "setAmount"; payload: number | string }
  | { type: "setWalletId"; payload: number }
  | { type: "setCategoryId"; payload: number }
  | { type: "setNotes"; payload: string }
  | { type: "setType"; payload: TransactionType }
  | { type: "setDate"; payload: Date };

export interface TransactionContext {
  deleteTransaction: (id: number) => Promise<void>;
  transactionSummary: { income: number; expense: number };
}

export type WalletForm = {
  wallet: string;
  amount: number;
  notes: string;
  theme: keyof typeof Colors.cards;
  created_at: Date;
  active_at: Date | null;
};

