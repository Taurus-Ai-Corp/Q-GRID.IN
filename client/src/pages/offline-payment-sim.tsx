import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Smartphone, Store, Heart, Zap, Shield, Network, CheckCircle2, Clock, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface Device {
  id: string;
  deviceId: string;
  ownerName: string;
  deviceType: string;
  balance: string;
  offlineLimit: string;
  status: string;
  lastSyncAt: string | null;
  createdAt: string;
}

interface Transaction {
  id: string;
  fromDeviceId: string;
  toDeviceId: string;
  amount: string;
  sequenceNumber: number;
  nonce: string;
  status: string;
  transactionHash: string | null;
  scenario: string | null;
  createdAt: string;
  settledAt: string | null;
}

interface SettlementBatch {
  id: string;
  batchSize: number;
  totalAmount: string;
  status: string;
  hederaTransactionId: string | null;
  createdAt: string;
  settledAt: string | null;
}

const scenarios = [
  {
    id: "rural",
    name: "Rural Village",
    icon: Store,
    description: "Farmer purchases seeds from local merchant",
    devices: [
      { deviceId: "RURAL_FARMER_001", ownerName: "Ramesh Kumar", deviceType: "CUSTOMER", balance: "15000" },
      { deviceId: "RURAL_MERCHANT_001", ownerName: "Village Store", deviceType: "MERCHANT", balance: "5000" }
    ],
    amount: "850"
  },
  {
    id: "metro",
    name: "Metro Transit",
    icon: Zap,
    description: "Commuter pays for metro ride",
    devices: [
      { deviceId: "METRO_USER_001", ownerName: "Priya Sharma", deviceType: "CUSTOMER", balance: "8000" },
      { deviceId: "METRO_STATION_001", ownerName: "Metro Station", deviceType: "MERCHANT", balance: "125000" }
    ],
    amount: "45"
  },
  {
    id: "disaster",
    name: "Disaster Relief",
    icon: Heart,
    description: "Aid worker distributes emergency funds",
    devices: [
      { deviceId: "RELIEF_WORKER_001", ownerName: "Red Cross Worker", deviceType: "AID_WORKER", balance: "500000" },
      { deviceId: "RELIEF_BENEFICIARY_001", ownerName: "Flood Victim", deviceType: "CUSTOMER", balance: "0" }
    ],
    amount: "5000"
  }
];

export default function OfflinePaymentSim() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [batches, setBatches] = useState<SettlementBatch[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState(scenarios[0]);

  const fetchData = async () => {
    try {
      const [devicesRes, transactionsRes, batchesRes] = await Promise.all([
        fetch("/api/offline/devices"),
        fetch("/api/offline/transactions"),
        fetch("/api/offline/batches")
      ]);

      if (devicesRes.ok) setDevices(await devicesRes.json());
      if (transactionsRes.ok) setTransactions(await transactionsRes.json());
      if (batchesRes.ok) setBatches(await batchesRes.json());
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  const initializeScenario = async (scenario: typeof scenarios[0]) => {
    setIsProcessing(true);
    try {
      for (const device of scenario.devices) {
        await fetch("/api/offline/devices", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...device,
            offlineLimit: "5000",
            status: "OFFLINE"
          })
        });
      }
      toast.success(`${scenario.name} devices initialized`);
      await fetchData();
    } catch (error) {
      toast.error("Failed to initialize scenario");
    } finally {
      setIsProcessing(false);
    }
  };

  const executePayment = async (scenario: typeof scenarios[0]) => {
    setIsProcessing(true);
    try {
      const nonce = `${scenario.id}_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      const sequenceNumber = transactions.filter(t => t.scenario === scenario.id).length + 1;

      const response = await fetch("/api/offline/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromDeviceId: scenario.devices[0].deviceId,
          toDeviceId: scenario.devices[1].deviceId,
          amount: scenario.amount,
          sequenceNumber,
          nonce,
          scenario: scenario.id,
          status: "PENDING_SYNC"
        })
      });

      if (response.ok) {
        toast.success(`Payment of ₹${scenario.amount} completed offline!`);
        await fetchData();
      } else {
        toast.error("Payment failed");
      }
    } catch (error) {
      toast.error("Payment execution failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const settleBatch = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch("/api/offline/settle", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });

      const result = await response.json();
      
      if (response.ok) {
        if (result.message === "No pending transactions to settle") {
          toast.info("No pending transactions to settle");
        } else {
          toast.success(`Settled ${result.transactionsSettled} transactions on Hedera`);
        }
        await fetchData();
      } else {
        toast.error("Settlement failed");
      }
    } catch (error) {
      toast.error("Settlement execution failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const pendingCount = transactions.filter(t => t.status === "PENDING_SYNC").length;
  const confirmedCount = transactions.filter(t => t.status === "CONFIRMED").length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-purple-950/20 to-gray-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Network className="w-12 h-12 text-cyan-400" />
            <h1 className="text-5xl font-bold" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                OFFLINE CBDC PAYMENT SIM
              </span>
            </h1>
          </div>
          <p className="text-xl text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            Real-time Database-Backed Payment Simulation • 3-Layer Security Architecture
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gray-900/50 border-cyan-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-400">Total Devices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-cyan-400">{devices.length}</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900/50 border-purple-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-400">Pending Sync</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-400">{pendingCount}</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900/50 border-green-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-400">Confirmed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">{confirmedCount}</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900/50 border-yellow-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-400">Settlement Batches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-400">{batches.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Scenarios */}
        <Card className="bg-gray-900/50 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyan-400">
              <Smartphone className="w-5 h-5" />
              Payment Scenarios
            </CardTitle>
            <CardDescription className="text-gray-400">
              Initialize devices and execute offline payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={scenarios[0].id} onValueChange={(value) => {
              const scenario = scenarios.find(s => s.id === value);
              if (scenario) setSelectedScenario(scenario);
            }}>
              <TabsList className="grid w-full grid-cols-3 bg-gray-800/50">
                {scenarios.map((scenario) => {
                  const Icon = scenario.icon;
                  return (
                    <TabsTrigger key={scenario.id} value={scenario.id} data-testid={`tab-${scenario.id}`}>
                      <Icon className="w-4 h-4 mr-2" />
                      {scenario.name}
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {scenarios.map((scenario) => (
                <TabsContent key={scenario.id} value={scenario.id} className="space-y-4">
                  <div className="bg-gray-800/30 rounded-lg p-4 border border-cyan-500/20">
                    <h3 className="text-lg font-semibold text-cyan-300 mb-2">{scenario.name}</h3>
                    <p className="text-gray-400 mb-4">{scenario.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {scenario.devices.map((device, idx) => (
                        <div key={device.deviceId} className="bg-gray-900/50 rounded-lg p-3 border border-purple-500/20">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-purple-400">
                              {idx === 0 ? "Sender" : "Receiver"}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {device.deviceType}
                            </Badge>
                          </div>
                          <div className="text-white font-medium">{device.ownerName}</div>
                          <div className="text-xs text-gray-500 font-mono mt-1">{device.deviceId}</div>
                          <div className="text-lg font-bold text-cyan-400 mt-2">
                            ₹{device.balance}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      <Button
                        onClick={() => initializeScenario(scenario)}
                        disabled={isProcessing}
                        className="bg-cyan-600 hover:bg-cyan-700"
                        data-testid={`button-init-${scenario.id}`}
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        Initialize Devices
                      </Button>
                      <Button
                        onClick={() => executePayment(scenario)}
                        disabled={isProcessing}
                        className="bg-purple-600 hover:bg-purple-700"
                        data-testid={`button-pay-${scenario.id}`}
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Execute Payment (₹{scenario.amount})
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            <div className="mt-6 pt-6 border-t border-cyan-500/20">
              <Button
                onClick={settleBatch}
                disabled={isProcessing || pendingCount === 0}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                data-testid="button-settle"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Settle All Pending Transactions on Hedera ({pendingCount})
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Database Views */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Devices */}
          <Card className="bg-gray-900/50 border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-cyan-400">Active Devices</CardTitle>
              <CardDescription className="text-gray-400">
                Real-time device registry from PostgreSQL
              </CardDescription>
            </CardHeader>
            <CardContent className="max-h-96 overflow-y-auto">
              <div className="space-y-2">
                {devices.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">No devices initialized</div>
                ) : (
                  devices.map((device) => (
                    <div key={device.id} className="bg-gray-800/50 rounded-lg p-3 border border-purple-500/20" data-testid={`device-${device.deviceId}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-white">{device.ownerName}</span>
                        <Badge variant={device.status === "OFFLINE" ? "destructive" : "default"} className="text-xs">
                          {device.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-500 font-mono mb-1">{device.deviceId}</div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-cyan-400">₹{device.balance}</span>
                        <span className="text-xs text-gray-400">Limit: ₹{device.offlineLimit}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Transactions */}
          <Card className="bg-gray-900/50 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-400">Mesh Transactions</CardTitle>
              <CardDescription className="text-gray-400">
                Offline payment ledger
              </CardDescription>
            </CardHeader>
            <CardContent className="max-h-96 overflow-y-auto">
              <div className="space-y-2">
                {transactions.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">No transactions yet</div>
                ) : (
                  transactions.map((tx) => (
                    <div key={tx.id} className="bg-gray-800/50 rounded-lg p-3 border border-cyan-500/20" data-testid={`transaction-${tx.id}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-bold text-cyan-400">₹{tx.amount}</span>
                        <Badge 
                          variant={tx.status === "CONFIRMED" ? "default" : "secondary"}
                          className={tx.status === "CONFIRMED" ? "bg-green-600" : "bg-yellow-600"}
                        >
                          {tx.status === "CONFIRMED" ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                          {tx.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                        <span className="truncate">{tx.fromDeviceId}</span>
                        <ArrowRight className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{tx.toDeviceId}</span>
                      </div>
                      {tx.scenario && (
                        <Badge variant="outline" className="text-xs">{tx.scenario.toUpperCase()}</Badge>
                      )}
                      {tx.transactionHash && (
                        <div className="text-xs text-green-400 font-mono mt-2 truncate">
                          Hedera: {tx.transactionHash}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settlement Batches */}
        <Card className="bg-gray-900/50 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-green-400">Settlement Batches</CardTitle>
            <CardDescription className="text-gray-400">
              Hedera blockchain settlement records
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {batches.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No settlement batches yet</div>
              ) : (
                batches.map((batch) => (
                  <div key={batch.id} className="bg-gray-800/50 rounded-lg p-4 border border-green-500/20" data-testid={`batch-${batch.id}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-lg font-bold text-green-400">₹{batch.totalAmount}</span>
                        <span className="text-sm text-gray-400 ml-3">{batch.batchSize} transactions</span>
                      </div>
                      <Badge 
                        variant={batch.status === "CONFIRMED" ? "default" : "secondary"}
                        className={batch.status === "CONFIRMED" ? "bg-green-600" : "bg-yellow-600"}
                      >
                        {batch.status}
                      </Badge>
                    </div>
                    {batch.hederaTransactionId && (
                      <div className="text-xs text-green-400 font-mono mt-2">
                        Hedera TX: {batch.hederaTransactionId}
                      </div>
                    )}
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(batch.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
