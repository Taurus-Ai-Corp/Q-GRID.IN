import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertKycUserSchema, insertPaymentTransactionSchema, insertKycCredentialSchema, insertOfflineDeviceSchema, insertMeshTransactionSchema, insertSettlementBatchSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // KYC Users endpoints
  app.get("/api/kyc/users", async (req, res) => {
    try {
      const users = await storage.getAllKycUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  app.post("/api/kyc/users", async (req, res) => {
    try {
      const validatedData = insertKycUserSchema.parse(req.body);
      const user = await storage.createKycUser(validatedData);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  app.patch("/api/kyc/users/:id/status", async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const user = await storage.updateKycUserStatus(id, status);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to update user status" });
    }
  });

  // Payment Transactions endpoints
  app.get("/api/payments", async (req, res) => {
    try {
      const payments = await storage.getAllPaymentTransactions();
      res.json(payments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch payments" });
    }
  });

  app.post("/api/payments", async (req, res) => {
    try {
      const validatedData = insertPaymentTransactionSchema.parse(req.body);
      const payment = await storage.createPaymentTransaction(validatedData);
      res.status(201).json(payment);
    } catch (error) {
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  app.patch("/api/payments/:id/status", async (req, res) => {
    try {
      const { id } = req.params;
      const { status, transactionHash } = req.body;
      const payment = await storage.updatePaymentStatus(id, status, transactionHash);
      if (!payment) {
        return res.status(404).json({ error: "Payment not found" });
      }
      res.json(payment);
    } catch (error) {
      res.status(500).json({ error: "Failed to update payment status" });
    }
  });

  // KYC Credentials endpoints
  app.get("/api/credentials", async (req, res) => {
    try {
      const credentials = await storage.getAllKycCredentials();
      res.json(credentials);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch credentials" });
    }
  });

  app.post("/api/credentials", async (req, res) => {
    try {
      const validatedData = insertKycCredentialSchema.parse(req.body);
      const credential = await storage.createKycCredential(validatedData);
      res.status(201).json(credential);
    } catch (error) {
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  // Simulated x402 Payment Verification Endpoint (Demo)
  app.post("/api/kyc/verify", async (req, res) => {
    try {
      const { userId, verificationType } = req.body;
      const paymentHeader = req.headers['x-payment'];

      // If no payment header, return 402 Payment Required
      if (!paymentHeader) {
        return res.status(402).json({
          error: "Payment Required",
          paymentRequirements: {
            amount: "0.15",
            currency: "USDC",
            recipient: "0.0.123456",
            network: "hedera"
          }
        });
      }

      // Simulate payment verification (in production, verify with Hedera)
      // For demo, we just check if header exists
      
      // Create payment record
      const payment = await storage.createPaymentTransaction({
        userId,
        amount: "0.15",
        currency: "USDC",
        status: "CONFIRMED",
        transactionHash: `0x${Math.random().toString(16).substring(2, 10)}`,
        verificationType: verificationType || "full_kyc"
      });

      // Create credential
      const credential = await storage.createKycCredential({
        userId,
        credentialType: "AADHAAR_KYC",
        credentialHash: `sha256:${Math.random().toString(16).substring(2, 10)}`,
        did: `did:hedera:mainnet:${userId}`,
        expiresAt: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000) // 10 years
      });

      // Update user status
      await storage.updateKycUserStatus(userId, "VERIFIED");

      res.json({
        status: "success",
        message: "KYC verification completed",
        payment,
        credential
      });
    } catch (error) {
      console.error("Verification error:", error);
      res.status(500).json({ error: "Verification failed" });
    }
  });

  // Offline CBDC endpoints
  app.get("/api/offline/devices", async (req, res) => {
    try {
      const devices = await storage.getAllOfflineDevices();
      res.json(devices);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch devices" });
    }
  });

  app.post("/api/offline/devices", async (req, res) => {
    try {
      const validatedData = insertOfflineDeviceSchema.parse(req.body);
      const device = await storage.createOfflineDevice(validatedData);
      res.status(201).json(device);
    } catch (error) {
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  app.get("/api/offline/transactions", async (req, res) => {
    try {
      const transactions = await storage.getAllMeshTransactions();
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch transactions" });
    }
  });

  app.post("/api/offline/transactions", async (req, res) => {
    try {
      const validatedData = insertMeshTransactionSchema.parse(req.body);
      const transaction = await storage.createMeshTransaction(validatedData);
      
      // Update device balances
      const fromDevice = await storage.getOfflineDevice(validatedData.fromDeviceId);
      const toDevice = await storage.getOfflineDevice(validatedData.toDeviceId);
      
      if (fromDevice && toDevice) {
        const fromBalance = parseFloat(fromDevice.balance || '0');
        const toBalance = parseFloat(toDevice.balance || '0');
        const amount = parseFloat(validatedData.amount);
        
        await storage.updateDeviceBalance(validatedData.fromDeviceId, (fromBalance - amount).toString());
        await storage.updateDeviceBalance(validatedData.toDeviceId, (toBalance + amount).toString());
      }
      
      res.status(201).json(transaction);
    } catch (error) {
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  app.get("/api/offline/batches", async (req, res) => {
    try {
      const batches = await storage.getAllSettlementBatches();
      res.json(batches);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch batches" });
    }
  });

  app.post("/api/offline/settle", async (req, res) => {
    try {
      // Get all pending transactions
      const pending = await storage.getPendingMeshTransactions();
      
      if (pending.length === 0) {
        return res.json({ message: "No pending transactions to settle" });
      }

      // Calculate total amount
      const totalAmount = pending.reduce((sum, tx) => {
        return sum + parseFloat(tx.amount || '0');
      }, 0);

      // Create settlement batch
      const batch = await storage.createSettlementBatch({
        batchSize: pending.length,
        totalAmount: totalAmount.toString(),
        status: "PROCESSING"
      });

      // Simulate Hedera settlement
      const hederaTxId = `0.0.123456@${Date.now()}.${Math.floor(Math.random() * 1000000)}`;
      
      // Update all transactions
      for (const tx of pending) {
        await storage.updateMeshTransactionStatus(tx.id, "CONFIRMED", hederaTxId);
      }

      // Update batch status
      const confirmedBatch = await storage.updateSettlementBatchStatus(batch.id, "CONFIRMED", hederaTxId);

      res.json({
        message: "Settlement successful",
        batch: confirmedBatch,
        transactionsSettled: pending.length,
        hederaTransactionId: hederaTxId
      });
    } catch (error) {
      console.error("Settlement error:", error);
      res.status(500).json({ error: "Settlement failed" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
