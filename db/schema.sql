-- 1. create DB
sqlite3 budgetApp.db

-- 2. create tables
CREATE TABLE IF NOT EXISTS settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  currency TEXT DEFAULT "USD" NOT NULL,
  theme TEXT DEFAULT "system" NOT NULL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
)

CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
)

CREATE TABLE IF NOT EXISTS wallets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  wallet TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
)

CREATE TABLE IF NOT EXISTS transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  notes TEXT,
  amount INTEGER NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Expense', 'Transfer', 'Income')),
  FOREIGN KEY (wallet_id) REFERENCES wallets (id),
  FOREIGN KEY (category_id) REFERENCES categories (id),
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
)