import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Original user schema (keeping as it might be used elsewhere)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Text correction schema
export const correctionResponseSchema = z.object({
  correctedText: z.string(),
  enhancedText: z.string(),
  explanations: z.array(z.string()),
});

export type CorrectionResponse = z.infer<typeof correctionResponseSchema>;
