import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, decimal, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// KYC Users Table
export const kycUsers = pgTable("kyc_users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email"),
  kycStatus: text("kyc_status").notNull().default("PENDING"), // PENDING, VERIFIED, REJECTED
  walletAddress: text("wallet_address"), // Hedera wallet address
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Payment Transactions Table
export const paymentTransactions = pgTable("payment_transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => kycUsers.id).notNull(),
  amount: decimal("amount", { precision: 18, scale: 6 }).notNull(), // USDC amount
  currency: text("currency").notNull().default("USDC"), // USDC, USDT, etc.
  status: text("status").notNull().default("PENDING"), // PENDING, CONFIRMED, FAILED
  transactionHash: text("transaction_hash"), // Hedera transaction hash
  verificationType: text("verification_type"), // age_check, address_check, full_kyc
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// KYC Credentials Table
export const kycCredentials = pgTable("kyc_credentials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => kycUsers.id).notNull(),
  credentialType: text("credential_type").notNull(), // AADHAAR_KYC, DIGILOCKER_KYC, etc.
  credentialHash: text("credential_hash").notNull(), // SHA-256 hash of the credential
  ipfsHash: text("ipfs_hash"), // IPFS storage hash
  did: text("did"), // Decentralized Identifier
  issuedAt: timestamp("issued_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at"),
});

// Insert Schemas
export const insertKycUserSchema = createInsertSchema(kycUsers).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPaymentTransactionSchema = createInsertSchema(paymentTransactions).omit({
  id: true,
  createdAt: true,
});

export const insertKycCredentialSchema = createInsertSchema(kycCredentials).omit({
  id: true,
  issuedAt: true,
});

// Types
export type KycUser = typeof kycUsers.$inferSelect;
export type InsertKycUser = z.infer<typeof insertKycUserSchema>;

export type PaymentTransaction = typeof paymentTransactions.$inferSelect;
export type InsertPaymentTransaction = z.infer<typeof insertPaymentTransactionSchema>;

export type KycCredential = typeof kycCredentials.$inferSelect;
export type InsertKycCredential = z.infer<typeof insertKycCredentialSchema>;

// Offline CBDC Devices Table
export const offlineDevices = pgTable("offline_devices", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  deviceId: text("device_id").notNull().unique(), // Unique device identifier
  ownerName: text("owner_name").notNull(),
  deviceType: text("device_type").notNull(), // CUSTOMER, MERCHANT, AID_WORKER
  balance: decimal("balance", { precision: 18, scale: 2 }).notNull().default("0"), // e-Rupee balance
  offlineLimit: decimal("offline_limit", { precision: 18, scale: 2 }).notNull().default("5000"), // Max offline spending
  status: text("status").notNull().default("ACTIVE"), // ACTIVE, OFFLINE, SYNCING
  lastSyncAt: timestamp("last_sync_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Offline Mesh Transactions Table
export const meshTransactions = pgTable("mesh_transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fromDeviceId: text("from_device_id").references(() => offlineDevices.deviceId).notNull(),
  toDeviceId: text("to_device_id").references(() => offlineDevices.deviceId).notNull(),
  amount: decimal("amount", { precision: 18, scale: 2 }).notNull(),
  sequenceNumber: integer("sequence_number").notNull(), // Monotonic counter
  nonce: text("nonce").notNull().unique(), // Unique transaction nonce
  status: text("status").notNull().default("PENDING_SYNC"), // PENDING_SYNC, CONFIRMED, FAILED
  transactionHash: text("transaction_hash"), // Hedera tx hash after settlement
  scenario: text("scenario"), // rural, metro, disaster
  createdAt: timestamp("created_at").defaultNow().notNull(),
  settledAt: timestamp("settled_at"),
});

// Settlement Batches Table
export const settlementBatches = pgTable("settlement_batches", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  batchSize: integer("batch_size").notNull(),
  totalAmount: decimal("total_amount", { precision: 18, scale: 2 }).notNull(),
  status: text("status").notNull().default("PENDING"), // PENDING, PROCESSING, CONFIRMED
  hederaTransactionId: text("hedera_transaction_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  settledAt: timestamp("settled_at"),
});

// Insert Schemas
export const insertOfflineDeviceSchema = createInsertSchema(offlineDevices).omit({
  id: true,
  createdAt: true,
});

export const insertMeshTransactionSchema = createInsertSchema(meshTransactions).omit({
  id: true,
  createdAt: true,
});

export const insertSettlementBatchSchema = createInsertSchema(settlementBatches).omit({
  id: true,
  createdAt: true,
});

// Types
export type OfflineDevice = typeof offlineDevices.$inferSelect;
export type InsertOfflineDevice = z.infer<typeof insertOfflineDeviceSchema>;

export type MeshTransaction = typeof meshTransactions.$inferSelect;
export type InsertMeshTransaction = z.infer<typeof insertMeshTransactionSchema>;

export type SettlementBatch = typeof settlementBatches.$inferSelect;
export type InsertSettlementBatch = z.infer<typeof insertSettlementBatchSchema>;
