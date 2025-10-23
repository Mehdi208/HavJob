import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean, pgEnum, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const userRoleEnum = pgEnum("user_role", ["freelance", "client", "both"]);
export const missionStatusEnum = pgEnum("mission_status", ["open", "in_progress", "completed", "cancelled"]);
export const applicationStatusEnum = pgEnum("application_status", ["pending", "accepted", "rejected", "withdrawn"]);
export const boostDurationEnum = pgEnum("boost_duration", ["1", "3", "7", "15", "30"]);

// Session storage table (required for Replit Auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table (updated for Replit Auth compatibility)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  // Replit Auth fields
  email: varchar("email", { length: 255 }).unique(),
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  profileImageUrl: varchar("profile_image_url", { length: 500 }),
  // HavJob specific fields (kept for backward compatibility, made optional)
  phoneNumber: varchar("phone_number", { length: 20 }).unique(),
  password: text("password"),
  fullName: text("full_name"),
  role: userRoleEnum("role").notNull().default("freelance"),
  bio: text("bio"),
  skills: text("skills").array(),
  location: varchar("location", { length: 100 }),
  avatar: text("avatar"),
  rating: integer("rating").default(0),
  reviewCount: integer("review_count").default(0),
  completedMissions: integer("completed_missions").default(0),
  responseRate: integer("response_rate").default(100),
  isBoosted: boolean("is_boosted").default(false),
  boostExpiresAt: timestamp("boost_expires_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const missions = pgTable("missions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  budget: integer("budget").notNull(),
  budgetType: varchar("budget_type", { length: 20 }).default("fixed"),
  location: varchar("location", { length: 100 }),
  isRemote: boolean("is_remote").default(false),
  duration: varchar("duration", { length: 50 }),
  skillsRequired: text("skills_required").array(),
  status: missionStatusEnum("status").notNull().default("open"),
  applicantsCount: integer("applicants_count").default(0),
  isBoosted: boolean("is_boosted").default(false),
  boostExpiresAt: timestamp("boost_expires_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const applications = pgTable("applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  missionId: varchar("mission_id").notNull().references(() => missions.id),
  freelancerId: varchar("freelancer_id").notNull().references(() => users.id),
  coverLetter: text("cover_letter"),
  proposedBudget: integer("proposed_budget"),
  status: applicationStatusEnum("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const favorites = pgTable("favorites", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  missionId: varchar("mission_id").notNull().references(() => missions.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const reviews = pgTable("reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  missionId: varchar("mission_id").notNull().references(() => missions.id),
  reviewerId: varchar("reviewer_id").notNull().references(() => users.id),
  revieweeId: varchar("reviewee_id").notNull().references(() => users.id),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const boosts = pgTable("boosts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  targetId: varchar("target_id").notNull(),
  targetType: varchar("target_type", { length: 20 }).notNull(),
  duration: boostDurationEnum("duration").notNull(),
  price: integer("price").notNull(),
  paymentStatus: varchar("payment_status", { length: 20 }).default("pending"),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  rating: true,
  reviewCount: true,
  completedMissions: true,
  responseRate: true,
  isBoosted: true,
  boostExpiresAt: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  phoneNumber: z.string().min(8, "Numéro de téléphone invalide").optional(),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères").optional(),
  fullName: z.string().min(2, "Le nom complet est requis").optional(),
  email: z.union([z.string().email("Email invalide"), z.literal("")]).optional(),
});

// Replit Auth specific upsert schema
export const upsertUserSchema = z.object({
  id: z.string(),
  email: z.string().email().nullable().optional(),
  firstName: z.string().nullable().optional(),
  lastName: z.string().nullable().optional(),
  profileImageUrl: z.string().nullable().optional(),
});

export const insertMissionSchema = createInsertSchema(missions).omit({
  id: true,
  clientId: true,
  applicantsCount: true,
  isBoosted: true,
  boostExpiresAt: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  title: z.string().min(10, "Le titre doit contenir au moins 10 caractères"),
  description: z.string().min(50, "La description doit contenir au moins 50 caractères"),
  budget: z.number().min(1000, "Le budget minimum est de 1000 FCFA"),
});

export const insertApplicationSchema = createInsertSchema(applications).omit({
  id: true,
  freelancerId: true,
  status: true,
  createdAt: true,
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
  reviewerId: true,
  createdAt: true,
}).extend({
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, "Le commentaire doit contenir au moins 10 caractères").optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpsertUser = z.infer<typeof upsertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertMission = z.infer<typeof insertMissionSchema>;
export type Mission = typeof missions.$inferSelect;
export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type Application = typeof applications.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviews.$inferSelect;
export type Favorite = typeof favorites.$inferSelect;
export type Boost = typeof boosts.$inferSelect;
