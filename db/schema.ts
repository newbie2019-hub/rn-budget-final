import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { timestamp } from "./column.helpers";

export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  category: text('category').notNull().unique(),
  ...timestamp
})

export const wallet = sqliteTable('wallets', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  wallet: text('wallet').notNull().unique(),
  theme: text('theme').notNull(),
  notes: text('notes'),
  active_at: integer({ mode: 'timestamp' }),
  amount: integer({ mode: 'number' }).notNull(),
  ...timestamp
})

export const transactions = sqliteTable('transactions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  type: text({ enum: ['expense', 'transfer', 'income'] }).notNull(),
  notes: text('notes'),
  amount: integer({ mode: 'number' }).notNull(),
  category_id: integer('category_id')
    .notNull()
    .references(() => categories.id),
  wallet_id: integer('wallet_id')
    .notNull()
    .references(() => wallet.id),
  ...timestamp
})

export type Transactions = typeof transactions.$inferSelect
export type Wallets = typeof wallet.$inferSelect
export type Categories = typeof categories.$inferSelect