import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { users } from "./users";

export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  // activeExpires: integer('active_expires', { mode: 'timestamp_ms' }).notNull(),
  // idleExpires: integer('idle_expires', { mode: 'timestamp_ms' }).notNull(),
  expiresAt: integer("expires_at").notNull()
}, (table) => ({
  // activeExpiresIdx: index('active_expires_idx').on(table.activeExpires),
  // idleExpiresIdx: index('idle_expires_idx').on(table.idleExpires),
}));

export const insertSessionSchema = createInsertSchema(sessions);
export const selectSessionSchema = createSelectSchema(sessions);