import { db } from "./db";
import { kycUsers, paymentTransactions, kycCredentials } from "@shared/schema";
import type { 
  KycUser, InsertKycUser,
  PaymentTransaction, InsertPaymentTransaction,
  KycCredential, InsertKycCredential
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
}

export const storage = new DatabaseStorage();
