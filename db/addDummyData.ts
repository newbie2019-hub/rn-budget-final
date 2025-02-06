import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { categories } from "./schema";

export const addCategoryData = async (db: ExpoSQLiteDatabase) => {
  await db.insert(categories).values([
    {
      category: 'Food',
      type: 'expense',
      created_at: new Date(),
      icon: 'fast-food',
      iconType: 'Ionicons'
    },
    {
      category: 'Groceries',
      type: 'expense',
      created_at: new Date(),
      icon: 'local-grocery-store',
      iconType: 'MaterialIcons'
    },
    {
      category: 'Transportation',
      type: 'expense',
      created_at: new Date(),
      icon: 'emoji-transportation',
      iconType: 'MaterialIcons'
    },
    {
      category: 'Utilities',
      type: 'expense',
      created_at: new Date(),
      icon: 'infinity',
      iconType: 'Entypo'
    },
    {
      category: 'Entertainment',
      type: 'expense',
      created_at: new Date(),
      icon: 'devices-other',
      iconType: 'MaterialIcons'
    },
    {
      category: 'Health',
      type: 'expense',
      created_at: new Date(),
      icon: 'health-and-safety',
      iconType: 'MaterialIcons'
    },
    {
      category: 'Fitness',
      type: 'expense',
      created_at: new Date(),
      icon: 'fitness',
      iconType: 'Ionicons'
    },
    {
      category: 'Clothing',
      type: 'expense',
      created_at: new Date(),
      icon: 'shirt',
      iconType: 'Ionicons'
    },
    {
      category: 'Education',
      type: 'expense',
      created_at: new Date(),
      icon: 'book',
      iconType: 'Entypo'
    },
    {
      category: 'Insurance',
      type: 'expense',
      created_at: new Date(),
      icon: 'health-and-safety',
      iconType: 'MaterialIcons'
    },
    {
      category: 'Home Maintenance',
      type: 'expense',
      created_at: new Date(),
      icon: 'tools',
      iconType: 'Entypo'
    },
    {
      category: 'Gifts',
      type: 'expense',
      created_at: new Date(),
      icon: 'gift',
      iconType: 'Ionicons'
    },
    {
      category: 'Charity',
      type: 'expense',
      created_at: new Date(),
      icon: 'heart',
      iconType: 'Entypo'
    },
    {
      category: 'Travel',
      type: 'expense',
      created_at: new Date(),
      icon: 'mode-of-travel',
      iconType: 'MaterialIcons'
    },
    {
      category: 'Subscriptions',
      type: 'expense',
      created_at: new Date(),
      icon: 'payment',
      iconType: 'MaterialIcons'
    },
    {
      category: 'Pets',
      type: 'expense',
      created_at: new Date(),
      icon: 'pets',
      iconType: 'MaterialIcons'
    },
    {
      category: 'Dining Out',
      type: 'expense',
      created_at: new Date(),
      icon: 'fast-food',
      iconType: 'Ionicons'
    },
    {
      category: 'Personal Care',
      type: 'expense',
      created_at: new Date(),
      icon: 'health-and-safety',
      iconType: 'MaterialIcons'
    },
    {
      category: 'Miscellaneous',
      type: 'expense',
      created_at: new Date(),
      icon: 'miscellaneous-services',
      iconType: 'MaterialIcons'
    },
    {
      category: 'Salary',
      type: 'income',
      created_at: new Date(),
      icon: 'attach-money',
      iconType: 'MaterialIcons'
    },
    {
      category: 'Freelancing',
      type: 'income',
      created_at: new Date(),
      icon: 'attach-money',
      iconType: 'MaterialIcons'
    },
    {
      category: 'Investments',
      type: 'income',
      created_at: new Date(),
      icon: 'attach-money',
      iconType: 'MaterialIcons'
    },
    {
      category: 'Business',
      type: 'income',
      created_at: new Date(),
      icon: 'attach-money',
      iconType: 'MaterialIcons'
    },
    {
      category: 'Side Hustles',
      type: 'income',
      created_at: new Date(),
      icon: 'attach-money',
      iconType: 'MaterialIcons'
    }

  ])
}