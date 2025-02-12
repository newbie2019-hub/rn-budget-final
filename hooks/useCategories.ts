import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import * as schema from "@/db/schema";

export function useCategories() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });

  const getCategories = async () => {
    return await drizzleDb.query.categories.findMany();
  };

  return {
    getCategories,
  };
}
