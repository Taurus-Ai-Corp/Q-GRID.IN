import { useState } from "react";
import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, CheckCircle2, Database, DollarSign, Lock, Server, Shield, Terminal, Wallet, ArrowRight, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Mock Database State
const INITIAL_DB = {
  users: [
    { id: "usr_1", name: "Rajesh Kumar", kyc_status: "PENDING", wallet: "0.0.1234" },
    { id: "usr_2", name: "Priya Sharma", kyc_status: "VERIFIED", wallet: "0.0.5678" }
  ],
  payments: [
    { id: "pay_1", user_id: "usr_2", amount: "0.15 USDC", status: "CONFIRMED", tx_hash: "0x7f8..." }
  ],
  credentials: [
    { id: "cred_1", user_id: "usr_2", type: "AADHAAR_KYC", hash: "sha256:..." }
  ]
};

export default function PaymentIntegration() {
  const [db, setDb] = useState(INITIAL_DB);
  const [logs, setLogs] = useState<string[]>([]);
  const [step, setStep] = useState(1); // 1: Request, 2: 402 Error, 3: Paying, 4: Success
  const [processing, setProcessing] = useState(false);

  const addLog = (msg: string) => setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);

  const handleVerifyRequest = () => {
    setProcessing(true);
    addLog("POST /api/kyc/verify - Initiating request...");
    setTimeout(() => {
      addLog("HTTP 402 Payment Required - Missing X-PAYMENT header");
      addLog("Requirement: 0.15 USDC to 0.0.123456");
      setProcessing(false);
      setStep(2);
    }, 1000);
  };

  const handlePayment = () => {
    setProcessing(true);
    addLog("Initiating Hedera Transaction...");
    setTimeout(() => {
      addLog("Hedera Consensus Service: Transaction Confirmed (2.1s)");
      addLog("Payment Proof Generated: 0x9a8b...");
      setStep(3);
      setTimeout(() => {
        completeVerification();
      }, 1000);
    }, 2000);
  };

  const completeVerification = () => {
    addLog("Re-sending Request with X-PAYMENT header");
    addLog("Middleware: Payment Verified on-chain");
    addLog("Executing KYC Logic...");
    
    // Update Mock DB
    const newPayment = { id: `pay_${Date.now()}`, user_id: "usr_1", amount: "0.15 USDC", status: "CONFIRMED", tx_hash: "0x9a8..." };
    const newCred = { id: `cred_${Date.now()}`, user_id: "usr_1", type: "AADHAAR_KYC", hash: "sha256:new..." };
    
    setDb(prev => ({
      ...prev,
      users: prev.users.map(u => u.id === "usr_1" ? { ...u, kyc_status: "VERIFIED" } : u),
      payments: [newPayment, ...prev.payments],
      credentials: [newCred, ...prev.credentials]
    }));

    addLog("Database Updated: User Status -> VERIFIED");
    addLog("HTTP 200 OK - Verification Complete");
    setProcessing(false);
    setStep(4);
  };

  const resetDemo = () => {
    setStep(1);
    setLogs([]);
    setDb(INITIAL_DB);
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-heading font-bold mb-2 text-primary">HTTP x402 Payment Integration</h1>
            <p className="text-muted-foreground">Micropayment infrastructure for Tokenized KYC fees using Hedera.</p>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              <Server className="w-3 h-3 mr-1" /> Backend Simulator
            </Badge>
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
              <Database className="w-3 h-3 mr-1" /> Mock DB Active
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Interactive Demo */}
          <div className="lg:col-span-7 space-y-6">
            <Card className="border-primary/20 bg-card/60 backdrop-blur-sm min-h-[500px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Payment Flow Simulation
                </CardTitle>
                <CardDescription>Simulate the client-server interaction for a paid API endpoint.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-center items-center space-y-8">
                
                {/* State Visualization */}
                <div className="w-full max-w-md">
                  <div className="flex justify-between mb-8 relative">
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-muted -z-10 -translate-y-1/2" />
                    {[1, 2, 3, 4].map((s) => (
                      <div key={s} className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500",
                        step >= s ? "bg-primary text-primary-foreground scale-110" : "bg-muted text-muted-foreground"
                      )}>
                        {s}
                      </div>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center space-y-4">
                        <div className="w-20 h-20 bg-muted rounded-full mx-auto flex items-center justify-center">
                          <Shield className="w-10 h-10 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">Initiate Verification</h3>
                          <p className="text-sm text-muted-foreground">Request KYC verification for User #1</p>
                        </div>
                        <Button onClick={handleVerifyRequest} disabled={processing} className="w-full">
                          {processing ? "Requesting..." : "Start Verification"}
                        </Button>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center space-y-4">
                        <div className="w-20 h-20 bg-orange-500/20 rounded-full mx-auto flex items-center justify-center border border-orange-500/50 animate-pulse">
                          <Lock className="w-10 h-10 text-orange-500" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-orange-500">402 Payment Required</h3>
                          <p className="text-sm text-muted-foreground">Endpoint requires micro-payment of 0.15 USDC</p>
                        </div>
                        <div className="p-3 bg-muted rounded text-xs font-mono text-left">
                          <span className="text-green-400">header:</span> X-Payment-Required<br/>
                          <span className="text-green-400">amount:</span> 0.15<br/>
                          <span className="text-green-400">currency:</span> USDC<br/>
                          <span className="text-green-400">address:</span> 0.0.123456
                        </div>
                        <Button onClick={handlePayment} disabled={processing} className="w-full bg-emerald-600 hover:bg-emerald-700">
                          {processing ? "Processing..." : "Pay 0.15 USDC & Retry"}
                        </Button>
                      </motion.div>
                    )}

                    {(step === 3) && (
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center space-y-4">
                         <div className="w-20 h-20 bg-emerald-500/20 rounded-full mx-auto flex items-center justify-center animate-spin">
                            <DollarSign className="w-10 h-10 text-emerald-500" />
                         </div>
                         <h3 className="text-xl font-bold">Verifying Payment...</h3>
                      </motion.div>
                    )}

                    {step === 4 && (
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center space-y-4">
                        <div className="w-20 h-20 bg-emerald-500/20 rounded-full mx-auto flex items-center justify-center border border-emerald-500">
                          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-emerald-500">Verification Successful</h3>
                          <p className="text-sm text-muted-foreground">KYC Status Updated. Payment Settled.</p>
                        </div>
                        <Button onClick={resetDemo} variant="outline" className="w-full">
                          Reset Simulation
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </CardContent>
            </Card>

            {/* Server Logs */}
            <Card className="bg-[#0d1117] border-border">
              <CardHeader className="py-3 px-4 border-b border-border">
                 <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
                    <Terminal className="w-4 h-4" /> Server Logs
                 </div>
              </CardHeader>
              <ScrollArea className="h-[200px] w-full p-4">
                <div className="space-y-1 font-mono text-xs">
                  {logs.length === 0 && <span className="text-muted-foreground opacity-50">Waiting for requests...</span>}
                  {logs.map((log, i) => (
                    <div key={i} className="text-green-400/80 border-b border-white/5 pb-1 mb-1 last:border-0">
                      <span className="text-blue-400 mr-2">➜</span>
                      {log}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          </div>

          {/* Right Column: Database View */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="border-primary/20 h-full flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                   <Database className="w-5 h-5 text-primary" />
                   Live Database View
                </CardTitle>
                <CardDescription>Real-time updates to simulated backend records.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <Tabs defaultValue="users" className="w-full">
                  <TabsList className="w-full grid grid-cols-3 mb-4">
                    <TabsTrigger value="users">Users</TabsTrigger>
                    <TabsTrigger value="payments">Payments</TabsTrigger>
                    <TabsTrigger value="credentials">Credentials</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="users">
                    <div className="rounded-md border border-border overflow-hidden">
                      <Table>
                        <TableHeader className="bg-muted/50">
                          <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {db.users.map((u) => (
                            <TableRow key={u.id}>
                              <TableCell className="font-mono text-xs">{u.id}</TableCell>
                              <TableCell>{u.name}</TableCell>
                              <TableCell className="text-right">
                                <Badge variant="outline" className={cn(
                                  u.kyc_status === "VERIFIED" ? "border-emerald-500 text-emerald-500 bg-emerald-500/10" : "border-yellow-500 text-yellow-500 bg-yellow-500/10"
                                )}>
                                  {u.kyc_status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>

                  <TabsContent value="payments">
                    <div className="rounded-md border border-border overflow-hidden">
                       <Table>
                        <TableHeader className="bg-muted/50">
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {db.payments.map((p) => (
                            <TableRow key={p.id} className="animate-in slide-in-from-left-2">
                              <TableCell className="font-mono text-xs">{p.id}</TableCell>
                              <TableCell className="font-mono text-xs">{p.amount}</TableCell>
                              <TableCell className="text-right">
                                <span className="text-xs text-emerald-400">{p.status}</span>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>

                  <TabsContent value="credentials">
                     <div className="rounded-md border border-border overflow-hidden">
                       <Table>
                        <TableHeader className="bg-muted/50">
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="text-right">Hash</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {db.credentials.map((c) => (
                            <TableRow key={c.id} className="animate-in slide-in-from-left-2">
                              <TableCell className="font-mono text-xs">{c.id}</TableCell>
                              <TableCell className="text-xs">{c.type}</TableCell>
                              <TableCell className="text-right font-mono text-[10px] text-muted-foreground">
                                {c.hash.substring(0, 8)}...
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="bg-muted/30 border-t border-border p-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                   <Server className="w-3 h-3" />
                   <span>Connected to Replit Postgres (Simulated)</span>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
