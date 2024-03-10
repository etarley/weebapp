import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`CAST(strftime('%s', 'now') AS INTEGER)`).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`CAST(strftime('%s', 'now') AS INTEGER)`).notNull(),
});

export const insertUserSchema = createInsertSchema(users, {
  email: (schema) => schema.email.email(),
  password: (schema) => schema.password.min(8),
});

export const selectUserSchema = createSelectSchema(users, {
  createdAt: (schema) => schema.createdAt.transform((value) => new Date(`${value} UTC`)),
  updatedAt: (schema) => schema.updatedAt.transform((value) => new Date(`${value} UTC`)),
});