import { drizzle } from "drizzle-orm/expo-sqlite";
import { useCallback } from "react";
import { useSQLiteContext } from "expo-sqlite";
import * as schema from "@/db/schema";
import { and, desc, eq, isNotNull, sql, sum } from "drizzle-orm";
import { Transaction } from "@/types";

export function useTransactions() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });

  const getActiveWalletTransactions = useCallback(async () => {
    const activeWallet = await drizzleDb.query.wallet.findFirst({
      where: isNotNull(schema.wallet.active_at),
    });

    return await drizzleDb.query.transactions.findMany({
      where: eq(schema.transactions.wallet_id, activeWallet?.id!),
      with: { category: true },
      orderBy: [desc(schema.transactions.created_at)],
    });
  }, []);

  const handleDelete = async (id: number) => {
    await drizzleDb.delete(schema.wallet).where(eq(schema.wallet.id, id));
  };

  const resetUserData = async () => {
    await drizzleDb.delete(schema.categories);
    await drizzleDb.delete(schema.wallet);
    await drizzleDb.delete(schema.transactions);
  };

  const handleUpdate = async () => {};

  const handleSetActive = async (id: number) => {
    try {
      await drizzleDb
        .update(schema.wallet)
        .set({ active_at: null })
        .where(isNotNull(schema.wallet.created_at));

      await drizzleDb
        .update(schema.wallet)
        .set({ active_at: new Date() })
        .where(eq(schema.wallet.id, id));
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  const getWalletSummary = async (id?: number) => {
    if (id === undefined) return { expense: 0, income: 0 };

    const [totalIncome] = await drizzleDb
      .select({ total: sum(schema.transactions.amount) })
      .from(schema.transactions)
      .where(
        and(
          eq(schema.transactions.wallet_id, id!),
          eq(schema.transactions.type, "income"),
        ),
      );

    const [totalExpense] = await drizzleDb
      .select({ total: sum(schema.transactions.amount) })
      .from(schema.transactions)
      .where(
        and(
          eq(schema.transactions.wallet_id, id!),
          eq(schema.transactions.type, "expense"),
        ),
      );

    return { expense: +totalExpense?.total!, income: +totalIncome.total! };
  };

  const deleteTransaction = async (id: number) => {
    try {
      // Find wallet and reverse transaction
      const transaction = await drizzleDb.query.transactions.findFirst({
        where: eq(schema.transactions.id, id),
      });

      await drizzleDb.update(schema.wallet).set({
        amount:
          transaction?.type === "income"
            ? sql`${schema.wallet.amount} - ${transaction.amount}`
            : sql`${schema.wallet.amount} + ${transaction?.amount}`,
      });

      // Delete transaction
      await drizzleDb
        .delete(schema.transactions)
        .where(eq(schema.transactions.id, id));
    } catch (error) {
      console.dir(error, { depth: 2 });
    }
  };

  const storeTransaction = async (
    state: Transaction,
    transaction: Omit<schema.Transactions, "id" | "updated_at" | "deleted_at">,
  ) => {
    try {
      await drizzleDb

        .update(schema.wallet)
        .set({
          amount:
            state.type === "income"
              ? sql`${schema.wallet.amount} + ${state.amount}`
              : sql`${schema.wallet.amount} - ${state.amount}`,
        })
        .where(isNotNull(schema.wallet.active_at));

      await drizzleDb.insert(schema.transactions).values(transaction);
    } catch (error) {
      console.log("Error saving wallet: ", error);
    }
  };

  return {
    getActiveWalletTransactions,
    getWalletSummary,
    handleDelete,
    handleSetActive,
    handleUpdate,
    deleteTransaction,
    resetUserData,
    storeTransaction,
  };
}
