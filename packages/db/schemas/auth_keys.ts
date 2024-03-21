import { index, integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { users } from "./users";

export const auth_keys = sqliteTable('auth_keys', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  primaryKey: integer('primary_key', { mode: 'boolean' }).notNull(),
  hashedPassword: text('hashed_password'),
  expires: integer('expires', { mode: 'timestamp_ms' }),
}, (table) => ({
  userIdIdx: index('user_id_idx').on(table.userId),
  userIdPrimaryKeyIdx: uniqueIndex('user_id_primary_key_idx').on(table.userId, table.primaryKey),
}));

export const insertAuthKeySchema = createInsertSchema(auth_keys);
export const selectAuthKeySchema = createSelectSchema(auth_keys);