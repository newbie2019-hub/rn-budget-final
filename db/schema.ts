import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { timestamp } from "./column.helpers";

export const settings = sqliteTable('settings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  currency: text().default('USD'),
  theme: text({ enum: ['system', 'dark', 'light' ]}),
  ...timestamp
})

export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  category: text('category').notNull().unique(),
  ...timestamp
})

export const wallet = sqliteTable('wallets', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  wallet: text('wallet').notNull().unique(),
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