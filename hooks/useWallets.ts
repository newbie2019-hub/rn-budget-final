import { useCallback } from "react";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import * as schema from "@/db/schema";
import { router } from "expo-router";
import { count, desc, isNotNull } from "drizzle-orm";
import { WalletForm } from "../types";

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

  const saveWallet = async (wallet: WalletForm) => {
    try {
      // Check if there is a wallet that has an active state
      const [result] = await drizzleDb
        .select({ count: count() })
        .from(schema.wallet);

      if (result.count === 0) {
        wallet.active_at = new Date();
      }

      await drizzleDb.insert(schema.wallet).values(wallet);
    } catch (error) {
      console.log("Error saving wallet: ", error);
    }

    router.back();
  };

  return { getWallets, getActiveWallet, saveWallet };
}
