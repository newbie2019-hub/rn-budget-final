import { integer } from "drizzle-orm/sqlite-core";

export const timestamp = {
  created_at: integer({ mode: 'timestamp' }),
  deleted_at: integer({ mode: 'timestamp' }),
  updated_at: integer({ mode: 'timestamp' })
}