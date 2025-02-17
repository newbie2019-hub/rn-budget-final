import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { timestamp } from "./column.helpers";
import { relations } from "drizzle-orm";
import { wallets } from "@/constants/Wallet";

export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  category: text("category").notNull().unique(),
  type: text({ enum: ["expense", "income"] }).notNull(),
  icon: text(),
  iconType: text(),
  ...timestamp,
});

export const wallet = sqliteTable("wallets", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  wallet: text("wallet").notNull().unique(),
  theme: text("theme").notNull(),
  notes: text("notes"),
  active_at: integer({ mode: "timestamp" }),
  amount: integer({ mode: "number" }).notNull(),
  ...timestamp,
});

export const walletRelations = relations(wallet, ({ many }) => ({
  transactions: many(transactions),
}));

export const transactions = sqliteTable("transactions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  type: text({ enum: ["expense", "transfer", "income"] }).notNull(),
  notes: text("notes"),
  amount: integer({ mode: "number" }).notNull(),
  category_id: integer("category_id")
    .notNull()
    .references(() => categories.id),
  wallet_id: integer("wallet_id")
    .notNull()
    .references(() => wallet.id),
  ...timestamp,
});

export const transactionsRelations = relations(transactions, ({ one }) => ({
  category: one(categories, {
    fields: [transactions.category_id],
    references: [categories.id],
  }),
  wallet: one(wallet, {
    fields: [transactions.wallet_id],
    references: [wallet.id],
  }),
}));

export type Transactions = typeof transactions.$inferSelect;
export type TransactionsWithCategory = Transactions & { category: Categories };

export type Wallets = typeof wallet.$inferSelect;
export type Categories = typeof categories.$inferSelect;
