import { useCallback } from "react";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import * as schema from "@/db/schema";
import { desc, isNotNull, sql } from "drizzle-orm";
import { Transaction } from "@/types";

export function useWallets() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });

  const getWallets = useCallback(
    async () =>
      await drizzleDb.query.wallet.findMany({
        orderBy: (wallets, { desc }) => [desc(wallets.created_at)],
      }),
    [],
  );

  const getActiveWallet = useCallback(
    async () =>
      await drizzleDb.query.wallet.findFirst({
        where: isNotNull(schema.wallet.active_at),
        with: {
          transactions: {
            with: {
              category: true,
            },
            orderBy: [desc(schema.transactions.created_at)],
            limit: 10,
          },
        },
      }),
    [],
  );

  const storeWallet = async (
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

  return { getWallets, getActiveWallet, storeWallet };
}
