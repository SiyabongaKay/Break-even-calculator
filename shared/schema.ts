import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const scenarios = pgTable("scenarios", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  userId: integer("user_id"),
  fixedCosts: jsonb("fixed_costs").$type<CostItem[]>().notNull(),
  pricePerLearner: integer("price_per_learner").notNull(),
  variableCostPerLearner: integer("variable_cost_per_learner").notNull(),
  initialLearnerCount: integer("initial_learner_count").notNull(),
  monthlyGrowthRate: integer("monthly_growth_rate").notNull(), // stored as percentage * 10 (8.5% = 85)
  monthlyChurnRate: integer("monthly_churn_rate").notNull(), // stored as percentage * 10 (5.2% = 52)
});

export const costItemSchema = z.object({
  id: z.string(),
  description: z.string().min(1, "Description is required"),
  amount: z.number().min(0, "Amount must be positive"),
});

export const insertScenarioSchema = createInsertSchema(scenarios).pick({
  name: true,
  fixedCosts: true,
  pricePerLearner: true,
  variableCostPerLearner: true,
  initialLearnerCount: true,
  monthlyGrowthRate: true,
  monthlyChurnRate: true,
}).extend({
  fixedCosts: z.array(costItemSchema),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type CostItem = z.infer<typeof costItemSchema>;
export type InsertScenario = z.infer<typeof insertScenarioSchema>;
export type Scenario = typeof scenarios.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
