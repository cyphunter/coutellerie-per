import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import { tbl } from "./site-id";

/**
 * Schéma D1 — toutes les tables de CE projet (préfixées par SITE_ID).
 *
 * Convention :
 *  - DB : snake_case (auto via drizzle.config `casing`)
 *  - TS : camelCase
 *  - Préfixe tables : `tbl("user")` → `{SITE_ID}_user`
 *  - Chaque table : id, createdAt, updatedAt si applicable
 *  - Timestamps en epoch ms
 *
 * /!\ La D1 "freelance-shared" est partagée entre tous les projets de l'agence.
 *     Aucune requête ne doit jamais toucher les tables d'un autre site.
 */

// ─── Better-Auth tables ──────────────────────────────────────────────
export const user = sqliteTable(tbl("user"), {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" }).notNull().default(false),
  image: text("image"),
  role: text("role").notNull().default("user"),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
});

export const session = sqliteTable(tbl("session"), {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
});

export const account = sqliteTable(tbl("account"), {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", { mode: "timestamp_ms" }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", { mode: "timestamp_ms" }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
});

export const verification = sqliteTable(tbl("verification"), {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" }),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }),
});

// ─── Tables métier ───────────────────────────────────────────────────

/**
 * Persistance des demandes de contact reçues via le formulaire public.
 * Permet d'avoir une trace même si l'email Resend échoue, et de
 * filtrer / rappeler les demandes côté admin plus tard.
 */
export const contactRequest = sqliteTable(
  tbl("contact_request"),
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    /** Type de demande : devis-creation | affutage | restauration | autre */
    category: text("category").notNull(),
    subject: text("subject").notNull(),
    message: text("message").notNull(),
    /** Hash IP (anti-spam, RGPD-friendly — pas d'IP brute conservée). */
    ipHash: text("ip_hash"),
    userAgent: text("user_agent"),
    status: text("status").notNull().default("new"),
    createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  },
  (table) => ({
    createdAtIdx: index("contact_request_created_at_idx").on(table.createdAt),
    statusIdx: index("contact_request_status_idx").on(table.status),
  }),
);
