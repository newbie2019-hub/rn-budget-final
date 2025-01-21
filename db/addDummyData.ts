import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { categories } from "./schema";

export const addDummyData = async (db: ExpoSQLiteDatabase) => {
  await db.insert(categories).values([
    {
      category: 'Food',
      created_at: new Date()
    },
    {
      category: 'Groceries',
      created_at: new Date()
    },
    {
      category: 'Supplies',
      created_at: new Date()
    },
    {
      category: 'Fitness',
      created_at: new Date()
    },
    {
      category: 'Gas',
      created_at: new Date()
    },
    {
      category: 'Internet',
      created_at: new Date()
    },
    {
      category: 'Utilities',
      created_at: new Date()
    },
    {
      category: 'Rent',
      created_at: new Date()
    },
  ])
}