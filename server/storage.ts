import { db } from "./db";
import { kycUsers, paymentTransactions, kycCredentials, offlineDevices, meshTransactions, settlementBatches } from "@shared/schema";
import type { 
  KycUser, InsertKycUser,
  PaymentTransaction, InsertPaymentTransaction,
  KycCredential, InsertKycCredential,
  OfflineDevice, InsertOfflineDevice,
  MeshTransaction, InsertMeshTransaction,
  SettlementBatch, InsertSettlementBatch
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // KYC Users
  getKycUser(id: string): Promise<KycUser | undefined>;
  getKycUserByEmail(email: string): Promise<KycUser | undefined>;
  createKycUser(user: InsertKycUser): Promise<KycUser>;
  updateKycUserStatus(id: string, status: string): Promise<KycUser | undefined>;
  getAllKycUsers(): Promise<KycUser[]>;

  // Payment Transactions
  getPaymentTransaction(id: string): Promise<PaymentTransaction | undefined>;
  getPaymentTransactionsByUser(userId: string): Promise<PaymentTransaction[]>;
  createPaymentTransaction(payment: InsertPaymentTransaction): Promise<PaymentTransaction>;
  updatePaymentStatus(id: string, status: string, txHash?: string): Promise<PaymentTransaction | undefined>;
  getAllPaymentTransactions(): Promise<PaymentTransaction[]>;

  // KYC Credentials
  getKycCredential(id: string): Promise<KycCredential | undefined>;
  getKycCredentialsByUser(userId: string): Promise<KycCredential[]>;
  createKycCredential(credential: InsertKycCredential): Promise<KycCredential>;
  getAllKycCredentials(): Promise<KycCredential[]>;

  // Offline Devices
  getOfflineDevice(deviceId: string): Promise<OfflineDevice | undefined>;
  createOfflineDevice(device: InsertOfflineDevice): Promise<OfflineDevice>;
  updateDeviceBalance(deviceId: string, newBalance: string): Promise<OfflineDevice | undefined>;
  updateDeviceStatus(deviceId: string, status: string): Promise<OfflineDevice | undefined>;
  getAllOfflineDevices(): Promise<OfflineDevice[]>;

  // Mesh Transactions
  getMeshTransaction(id: string): Promise<MeshTransaction | undefined>;
  createMeshTransaction(transaction: InsertMeshTransaction): Promise<MeshTransaction>;
  updateMeshTransactionStatus(id: string, status: string, txHash?: string): Promise<MeshTransaction | undefined>;
  getAllMeshTransactions(): Promise<MeshTransaction[]>;
  getPendingMeshTransactions(): Promise<MeshTransaction[]>;

  // Settlement Batches
  getSettlementBatch(id: string): Promise<SettlementBatch | undefined>;
  createSettlementBatch(batch: InsertSettlementBatch): Promise<SettlementBatch>;
  updateSettlementBatchStatus(id: string, status: string, hederaTxId?: string): Promise<SettlementBatch | undefined>;
  getAllSettlementBatches(): Promise<SettlementBatch[]>;
}

export class DatabaseStorage implements IStorage {
  // KYC Users
  async getKycUser(id: string): Promise<KycUser | undefined> {
    const [user] = await db.select().from(kycUsers).where(eq(kycUsers.id, id));
    return user;
  }

  async getKycUserByEmail(email: string): Promise<KycUser | undefined> {
    const [user] = await db.select().from(kycUsers).where(eq(kycUsers.email, email));
    return user;
  }

  async createKycUser(insertUser: InsertKycUser): Promise<KycUser> {
    const [user] = await db.insert(kycUsers).values(insertUser).returning();
    return user;
  }

  async updateKycUserStatus(id: string, status: string): Promise<KycUser | undefined> {
    const [user] = await db
      .update(kycUsers)
      .set({ kycStatus: status, updatedAt: new Date() })
      .where(eq(kycUsers.id, id))
      .returning();
    return user;
  }

  async getAllKycUsers(): Promise<KycUser[]> {
    return db.select().from(kycUsers).orderBy(desc(kycUsers.createdAt));
  }

  // Payment Transactions
  async getPaymentTransaction(id: string): Promise<PaymentTransaction | undefined> {
    const [transaction] = await db.select().from(paymentTransactions).where(eq(paymentTransactions.id, id));
    return transaction;
  }

  async getPaymentTransactionsByUser(userId: string): Promise<PaymentTransaction[]> {
    return db.select().from(paymentTransactions)
      .where(eq(paymentTransactions.userId, userId))
      .orderBy(desc(paymentTransactions.createdAt));
  }

  async createPaymentTransaction(insertPayment: InsertPaymentTransaction): Promise<PaymentTransaction> {
    const [payment] = await db.insert(paymentTransactions).values(insertPayment).returning();
    return payment;
  }

  async updatePaymentStatus(id: string, status: string, txHash?: string): Promise<PaymentTransaction | undefined> {
    const [payment] = await db
      .update(paymentTransactions)
      .set({ 
        status, 
        ...(txHash && { transactionHash: txHash })
      })
      .where(eq(paymentTransactions.id, id))
      .returning();
    return payment;
  }

  async getAllPaymentTransactions(): Promise<PaymentTransaction[]> {
    return db.select().from(paymentTransactions).orderBy(desc(paymentTransactions.createdAt));
  }

  // KYC Credentials
  async getKycCredential(id: string): Promise<KycCredential | undefined> {
    const [credential] = await db.select().from(kycCredentials).where(eq(kycCredentials.id, id));
    return credential;
  }

  async getKycCredentialsByUser(userId: string): Promise<KycCredential[]> {
    return db.select().from(kycCredentials)
      .where(eq(kycCredentials.userId, userId))
      .orderBy(desc(kycCredentials.issuedAt));
  }

  async createKycCredential(insertCredential: InsertKycCredential): Promise<KycCredential> {
    const [credential] = await db.insert(kycCredentials).values(insertCredential).returning();
    return credential;
  }

  async getAllKycCredentials(): Promise<KycCredential[]> {
    return db.select().from(kycCredentials).orderBy(desc(kycCredentials.issuedAt));
  }

  // Offline Devices
  async getOfflineDevice(deviceId: string): Promise<OfflineDevice | undefined> {
    const [device] = await db.select().from(offlineDevices).where(eq(offlineDevices.deviceId, deviceId));
    return device;
  }

  async createOfflineDevice(insertDevice: InsertOfflineDevice): Promise<OfflineDevice> {
    const [device] = await db.insert(offlineDevices).values(insertDevice).returning();
    return device;
  }

  async updateDeviceBalance(deviceId: string, newBalance: string): Promise<OfflineDevice | undefined> {
    const [device] = await db
      .update(offlineDevices)
      .set({ balance: newBalance })
      .where(eq(offlineDevices.deviceId, deviceId))
      .returning();
    return device;
  }

  async updateDeviceStatus(deviceId: string, status: string): Promise<OfflineDevice | undefined> {
    const [device] = await db
      .update(offlineDevices)
      .set({ status, ...(status === 'ACTIVE' && { lastSyncAt: new Date() }) })
      .where(eq(offlineDevices.deviceId, deviceId))
      .returning();
    return device;
  }

  async getAllOfflineDevices(): Promise<OfflineDevice[]> {
    return db.select().from(offlineDevices).orderBy(desc(offlineDevices.createdAt));
  }

  // Mesh Transactions
  async getMeshTransaction(id: string): Promise<MeshTransaction | undefined> {
    const [transaction] = await db.select().from(meshTransactions).where(eq(meshTransactions.id, id));
    return transaction;
  }

  async createMeshTransaction(insertTransaction: InsertMeshTransaction): Promise<MeshTransaction> {
    const [transaction] = await db.insert(meshTransactions).values(insertTransaction).returning();
    return transaction;
  }

  async updateMeshTransactionStatus(id: string, status: string, txHash?: string): Promise<MeshTransaction | undefined> {
    const [transaction] = await db
      .update(meshTransactions)
      .set({ 
        status, 
        ...(txHash && { transactionHash: txHash }),
        ...(status === 'CONFIRMED' && { settledAt: new Date() })
      })
      .where(eq(meshTransactions.id, id))
      .returning();
    return transaction;
  }

  async getAllMeshTransactions(): Promise<MeshTransaction[]> {
    return db.select().from(meshTransactions).orderBy(desc(meshTransactions.createdAt));
  }

  async getPendingMeshTransactions(): Promise<MeshTransaction[]> {
    return db.select().from(meshTransactions)
      .where(eq(meshTransactions.status, 'PENDING_SYNC'))
      .orderBy(desc(meshTransactions.createdAt));
  }

  // Settlement Batches
  async getSettlementBatch(id: string): Promise<SettlementBatch | undefined> {
    const [batch] = await db.select().from(settlementBatches).where(eq(settlementBatches.id, id));
    return batch;
  }

  async createSettlementBatch(insertBatch: InsertSettlementBatch): Promise<SettlementBatch> {
    const [batch] = await db.insert(settlementBatches).values(insertBatch).returning();
    return batch;
  }

  async updateSettlementBatchStatus(id: string, status: string, hederaTxId?: string): Promise<SettlementBatch | undefined> {
    const [batch] = await db
      .update(settlementBatches)
      .set({ 
        status, 
        ...(hederaTxId && { hederaTransactionId: hederaTxId }),
        ...(status === 'CONFIRMED' && { settledAt: new Date() })
      })
      .where(eq(settlementBatches.id, id))
      .returning();
    return batch;
  }

  async getAllSettlementBatches(): Promise<SettlementBatch[]> {
    return db.select().from(settlementBatches).orderBy(desc(settlementBatches.createdAt));
  }
}

export const storage = new DatabaseStorage();
