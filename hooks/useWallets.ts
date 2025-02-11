import { useCallback } from "react";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import * as schema from "@/db/schema";
import { isNotNull } from "drizzle-orm";

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
          },
        },
      }),
    [],
  );

  return { getWallets, getActiveWallet };
}
