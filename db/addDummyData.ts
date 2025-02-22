import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { categories, transactions, wallet } from "./schema";

export const addTransactionsData = async (db: ExpoSQLiteDatabase) => {
  function generateTransactions(count: number) {
    function getRandomInt(min: number, max: number) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomTimestamp() {
      const start = new Date("2025-01-01").getTime(); // January 1, 2025
      const end = new Date().getTime(); // Current date
      return new Date(getRandomInt(start, end));
    }

    const transactions = [];

    for (let i = 0; i < count; i++) {
      const isExpense = Math.random() < 0.5; // 50% chance for expense or income

      transactions.push({
        type: isExpense ? "expense" : ("income" as TransactionType),
        notes: "",
        amount: Number(getRandomInt(10, 1000).toFixed(2)), // Random amount between 10 and 1000
        category_id: isExpense ? getRandomInt(1, 20) : getRandomInt(21, 24),
        wallet_id: getRandomInt(1, 5),
        created_at: getRandomTimestamp(),
      });
    }

    return transactions;
  }

  const transactionsData = generateTransactions(200);
  await db.insert(transactions).values(transactionsData);
};

export const addWalletData = async (db: ExpoSQLiteDatabase) => {
  function generateWallets(count: number) {
    const themes = ["peach_yellow", "cornsilk", "pink", "celadon", "champaign"];

    function getRandomInt(min: number, max: number) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomDate() {
      const start = new Date("2025-01-01").getTime(); // From January 2025
      const end = new Date().getTime(); // Until today
      return new Date(getRandomInt(start, end));
    }

    const wallets = [];

    for (let i = 0; i < count; i++) {
      wallets.push({
        wallet: `Wallet ${i + 1}`,
        theme: themes[getRandomInt(0, themes.length - 1)],
        amount: getRandomInt(35000, 100000),
        created_at: getRandomDate(),
      });
    }

    return wallets;
  }

  const wallets = generateWallets(6);
  await db.insert(wallet).values(wallets);
};

export const addCategoryData = async (db: ExpoSQLiteDatabase) => {
  await db.insert(categories).values([
    {
      category: "Food",
      type: "expense",
      created_at: new Date(),
      icon: "fast-food",
      iconType: "Ionicons",
    },
    {
      category: "Groceries",
      type: "expense",
      created_at: new Date(),
      icon: "local-grocery-store",
      iconType: "MaterialIcons",
    },
    {
      category: "Transportation",
      type: "expense",
      created_at: new Date(),
      icon: "emoji-transportation",
      iconType: "MaterialIcons",
    },
    {
      category: "Utilities",
      type: "expense",
      created_at: new Date(),
      icon: "infinity",
      iconType: "Entypo",
    },
    {
      category: "Entertainment",
      type: "expense",
      created_at: new Date(),
      icon: "devices-other",
      iconType: "MaterialIcons",
    },
    {
      category: "Health",
      type: "expense",
      created_at: new Date(),
      icon: "health-and-safety",
      iconType: "MaterialIcons",
    },
    {
      category: "Fitness",
      type: "expense",
      created_at: new Date(),
      icon: "fitness",
      iconType: "Ionicons",
    },
    {
      category: "Clothing",
      type: "expense",
      created_at: new Date(),
      icon: "shirt",
      iconType: "Ionicons",
    },
    {
      category: "Education",
      type: "expense",
      created_at: new Date(),
      icon: "book",
      iconType: "Entypo",
    },
    {
      category: "Insurance",
      type: "expense",
      created_at: new Date(),
      icon: "health-and-safety",
      iconType: "MaterialIcons",
    },
    {
      category: "Home Maintenance",
      type: "expense",
      created_at: new Date(),
      icon: "tools",
      iconType: "Entypo",
    },
    {
      category: "Gifts",
      type: "expense",
      created_at: new Date(),
      icon: "gift",
      iconType: "Ionicons",
    },
    {
      category: "Charity",
      type: "expense",
      created_at: new Date(),
      icon: "heart",
      iconType: "Entypo",
    },
    {
      category: "Travel",
      type: "expense",
      created_at: new Date(),
      icon: "mode-of-travel",
      iconType: "MaterialIcons",
    },
    {
      category: "Subscriptions",
      type: "expense",
      created_at: new Date(),
      icon: "payment",
      iconType: "MaterialIcons",
    },
    {
      category: "Pets",
      type: "expense",
      created_at: new Date(),
      icon: "pets",
      iconType: "MaterialIcons",
    },
    {
      category: "Dining Out",
      type: "expense",
      created_at: new Date(),
      icon: "fast-food",
      iconType: "Ionicons",
    },
    {
      category: "Personal Care",
      type: "expense",
      created_at: new Date(),
      icon: "health-and-safety",
      iconType: "MaterialIcons",
    },
    {
      category: "Miscellaneous",
      type: "expense",
      created_at: new Date(),
      icon: "miscellaneous-services",
      iconType: "MaterialIcons",
    },
    {
      category: "Salary",
      type: "income",
      created_at: new Date(),
      icon: "attach-money",
      iconType: "MaterialIcons",
    },
    {
      category: "Freelancing",
      type: "income",
      created_at: new Date(),
      icon: "attach-money",
      iconType: "MaterialIcons",
    },
    {
      category: "Investments",
      type: "income",
      created_at: new Date(),
      icon: "attach-money",
      iconType: "MaterialIcons",
    },
    {
      category: "Business",
      type: "income",
      created_at: new Date(),
      icon: "attach-money",
      iconType: "MaterialIcons",
    },
    {
      category: "Side Hustles",
      type: "income",
      created_at: new Date(),
      icon: "attach-money",
      iconType: "MaterialIcons",
    },
  ]);
};

