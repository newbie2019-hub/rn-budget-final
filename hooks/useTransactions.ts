import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import * as schema from "@/db/schema";
import { useCallback } from "react";
import { and, eq, isNotNull, sql, sum } from "drizzle-orm";

export function useTransactions() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });

  const fetchTransactions = useCallback(async () => {
    const activeWallet = await drizzleDb.query.wallet.findFirst({
      where: isNotNull(schema.wallet.active_at),
    });

    return await drizzleDb.query.transactions.findMany({
      where: eq(schema.transactions.wallet_id, activeWallet?.id!),
      with: { category: true },
    });
  }, []);

  const handleDelete = async (id: number) => {
    await drizzleDb.delete(schema.wallet).where(eq(schema.wallet.id, id));
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

  // TODO: Check how to pass params using Tanstack Query
  const getWalletSummary = async (id: number) => {
    const [totalIncome] = await drizzleDb
      .select({ total: sum(schema.transactions.amount) })
      .from(schema.transactions)
      .where(
        and(
          eq(schema.transactions.wallet_id, id),
          eq(schema.transactions.type, "income"),
        ),
      );

    const [totalExpense] = await drizzleDb
      .select({ total: sum(schema.transactions.amount) })
      .from(schema.transactions)
      .where(
        and(
          eq(schema.transactions.wallet_id, id),
          eq(schema.transactions.type, "expense"),
        ),
      );
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

  return {
    fetchTransactions,
    getWalletSummary,
    handleDelete,
    handleSetActive,
    handleUpdate,
    deleteTransaction,
  };
}
