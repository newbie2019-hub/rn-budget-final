import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { categories } from "./schema";

export const addCategoryData = async (db: ExpoSQLiteDatabase) => {
  await db.insert(categories).values([
    {
      category: 'Food',
      type: 'expense',
      created_at: new Date()
    },
    {
      category: 'Groceries',
      type: 'expense',
      created_at: new Date()
    },
    {
      category: 'Transportation',
      type: 'expense',
      created_at: new Date()
    },
    {
      category: 'Utilities',
      type: 'expense',
      created_at: new Date()
    },
    {
      category: 'Entertainment',
      type: 'expense',
      created_at: new Date()
    },
    {
      category: 'Health',
      type: 'expense',
      created_at: new Date()
    },
    {
      category: 'Fitness',
      type: 'expense',
      created_at: new Date()
    },
    {
      category: 'Clothing',
      type: 'expense',
      created_at: new Date()
    },
    {
      category: 'Education',
      type: 'expense',
      created_at: new Date()
    },
    {
      category: 'Insurance',
      type: 'expense',
      created_at: new Date()
    },
    {
      category: 'Home Maintenance',
      type: 'expense',
      created_at: new Date()
    },
    {
      category: 'Gifts',
      type: 'expense',
      created_at: new Date()
    },
    {
      category: 'Charity',
      type: 'expense',
      created_at: new Date()
    },
    {
      category: 'Travel',
      type: 'expense',
      created_at: new Date()
    },
    {
      category: 'Subscriptions',
      type: 'expense',
      created_at: new Date()
    },
    {
      category: 'Pets',
      type: 'expense',
      created_at: new Date()
    },
    {
      category: 'Dining Out',
      type: 'expense',
      created_at: new Date()
    },
    {
      category: 'Personal Care',
      type: 'expense',
      created_at: new Date()
    },
    {
      category: 'Miscellaneous',
      type: 'expense',
      created_at: new Date()
    },
    {
      category: 'Salary',
      type: 'income',
      created_at: new Date()
    },
    {
      category: 'Freelancing',
      type: 'income',
      created_at: new Date()
    },
    {
      category: 'Investments',
      type: 'income',
      created_at: new Date()
    },
    {
      category: 'Business',
      type: 'income',
      created_at: new Date()
    },
    {
      category: 'Side Hustles',
      type: 'income',
      created_at: new Date()
    }

  ])
}