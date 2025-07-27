import { integer, pgTable, varchar, text, timestamp, json } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  credits: integer(),
});

export const sessionChatTable = pgTable("sessionChatTable", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  sessionId: varchar().notNull(),
  notes:text(),
  selectedDoctor: json(),
  conversation: json(), // JSON string storing the full conversation
  report: json(), // Generated medical report/summary
  createdBy: varchar().references(() => usersTable.email).notNull(), // Who created the session
  createdOn: varchar(),
});
