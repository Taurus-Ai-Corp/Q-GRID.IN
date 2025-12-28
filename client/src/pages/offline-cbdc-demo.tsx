import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Shield, Cpu, WifiOff, Radio, Server, FileCheck, Lock, Share2, Database, Activity, Smartphone, CheckCircle, Globe, TrainFront, Tent, AlertTriangle, Signal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock Images (Replace with generated assets)
import chipImage from "@assets/generated_images/secure_element_chip_macro.png";
import meshImage from "@assets/generated_images/nfc_mesh_network.png";
import ledgerImage from "@assets/generated_images/distributed_ledger_consensus.png";

const SLIDES = [
  {
    id: "intro",
    title: "Q_GRID.taurusai.in (Q₹M)",
    subtitle: "India's Quantum Rupee Mesh",
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
        <div className="relative w-48 h-48">
           <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
           <div className="absolute inset-0 border-4 border-primary rounded-full animate-[spin_10s_linear_infinite]" />
           <Shield className="w-full h-full text-primary p-10" />
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl font-heading font-bold text-white">Secure Offline CBDC</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hardware-secured, offline-first digital currency with distributed ledger settlement.
            Mathematically provable double-spend prevention.
          </p>
        </div>
      </div>
    )
  },
  {
    id: "architecture",
    title: "System Architecture",
    subtitle: "Three Integrated Layers of Security",
    content: (
      <div className="grid grid-cols-3 gap-6 h-full">
        <Card className="bg-card/50 border-primary/20 hover:bg-primary/5 transition-colors">
          <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30">
              <Cpu className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-primary">Layer 1: Hardware</h3>
            <p className="text-sm text-muted-foreground">Secure Element (NXP SmartMX3) with Balance Certificates & confined keys.</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-primary/20 hover:bg-primary/5 transition-colors">
          <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/30">
              <WifiOff className="w-8 h-8 text-orange-400" />
            </div>
            <h3 className="text-xl font-bold text-orange-400">Layer 2: Protocol</h3>
            <p className="text-sm text-muted-foreground">Offline peer-to-peer via NFC/BLE with multi-layer fraud prevention.</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-primary/20 hover:bg-primary/5 transition-colors">
          <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30">
              <Server className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-emerald-400">Layer 3: Settlement</h3>
            <p className="text-sm text-muted-foreground">Distributed Ledger (Hedera) for instant finality upon reconnection.</p>
          </CardContent>
        </Card>
      </div>
    )
  },
  {
    id: "layer1_chip",
    title: "Layer 1: Secure Element",
    subtitle: "Hardware-Enforced Trust",
    image: chipImage,
    content: (
      <div className="grid grid-cols-2 gap-8 h-full items-center">
        <div className="space-y-6">
          <div className="space-y-2">
             <div className="flex items-center gap-2 text-primary font-bold">
                <FileCheck className="w-5 h-5" /> Balance Certificate
             </div>
             <p className="text-sm text-muted-foreground pl-7">
               Cryptographically signed structure containing encrypted balance, max offline limit, and expiry.
             </p>
          </div>
          <div className="space-y-2">
             <div className="flex items-center gap-2 text-primary font-bold">
                <Database className="w-5 h-5" /> Transaction Log
             </div>
             <p className="text-sm text-muted-foreground pl-7">
               Tamper-proof append-only log with monotonic sequence numbers and unique nonces.
             </p>
          </div>
          <div className="space-y-2">
             <div className="flex items-center gap-2 text-primary font-bold">
                <Lock className="w-5 h-5" /> Confined Keys
             </div>
             <p className="text-sm text-muted-foreground pl-7">
               Private keys never leave the hardware. Used for signing and validation.
             </p>
          </div>
        </div>
        <div className="rounded-xl overflow-hidden border border-primary/20 relative h-64">
           {/* Placeholder if image not loaded */}
           <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-black" />
           <img src={chipImage} alt="Secure Element" className="absolute inset-0 w-full h-full object-cover opacity-80" />
        </div>
      </div>
    )
  },
  {
    id: "layer2_protocol",
    title: "Layer 2: Offline Protocol",
    subtitle: "Proximity Transaction Flow",
    image: meshImage,
    content: (
      <div className="space-y-6">
        <div className="flex justify-center gap-8 mb-8">
           <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center"><Radio className="w-6 h-6" /></div>
              <span className="text-xs font-mono">NFC (1-2m)</span>
           </div>
           <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center"><Share2 className="w-6 h-6" /></div>
              <span className="text-xs font-mono">BLE (10-100m)</span>
           </div>
        </div>
        <div className="bg-card/50 p-6 rounded-lg border border-border font-mono text-xs relative overflow-hidden">
           <div className="absolute top-0 right-0 p-2 text-primary text-[10px] border border-primary/20 rounded bg-primary/5 m-2">
              JSON Payload
           </div>
           <pre className="text-muted-foreground">
{`{
  "version": "1.0",
  "device_id": "did:hedera:mainnet:zAbC...",
  "sequence_number": 42,
  "nonce": "7f9a3b2c1d...",  // Unique per tx
  "amount": 500,
  "signature": "3045022100...",
  "balance_cert_hash": "sha256:..."
}`}
           </pre>
        </div>
        <p className="text-center text-sm text-emerald-400 font-bold">
           Double-Spend Prevention: Hardware Sequence + Unique Nonce Check
        </p>
      </div>
    )
  },
  {
    id: "layer3_settlement",
    title: "Layer 3: Settlement",
    subtitle: "Instant Finality on Reconnection",
    image: ledgerImage,
    content: (
      <div className="grid grid-cols-2 gap-8 h-full items-center">
         <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-card/50 rounded-lg border border-border">
               <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">1</div>
               <div>
                  <h4 className="font-bold text-sm">Auto-Sync</h4>
                  <p className="text-xs text-muted-foreground">Device detects network & batches pending transactions.</p>
               </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-card/50 rounded-lg border border-border">
               <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">2</div>
               <div>
                  <h4 className="font-bold text-sm">Consensus Validation</h4>
                  <p className="text-xs text-muted-foreground">Hedera nodes verify signatures, nonces, and certificates.</p>
               </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-card/50 rounded-lg border border-border">
               <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">3</div>
               <div>
                  <h4 className="font-bold text-sm">Immutable Record</h4>
                  <p className="text-xs text-muted-foreground">Finality in 3-5 seconds. Audit trail permanently stored.</p>
               </div>
            </div>
         </div>
         <div className="rounded-xl overflow-hidden border border-emerald-500/20 relative h-64">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-black" />
            <img src={ledgerImage} alt="Distributed Ledger" className="absolute inset-0 w-full h-full object-cover opacity-80" />
         </div>
      </div>
    )
  },
  {
    id: "fraud_detection",
    title: "AI Fraud Detection",
    subtitle: "Real-Time Risk Scoring",
    content: (
      <div className="flex flex-col items-center justify-center h-full space-y-8">
         <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
            <div className="bg-card/50 p-4 rounded border border-border text-center">
               <Activity className="w-8 h-8 mx-auto text-orange-400 mb-2" />
               <h4 className="font-bold">Velocity Analysis</h4>
               <p className="text-xs text-muted-foreground">Transaction frequency & geo-patterns.</p>
            </div>
            <div className="bg-card/50 p-4 rounded border border-border text-center">
               <Smartphone className="w-8 h-8 mx-auto text-blue-400 mb-2" />
               <h4 className="font-bold">Behavioral Biometrics</h4>
               <p className="text-xs text-muted-foreground">Device usage & auth patterns.</p>
            </div>
         </div>
         
         <div className="w-full max-w-2xl bg-muted/20 rounded-full h-4 overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-emerald-500/50" />
            <div className="absolute left-1/3 top-0 bottom-0 w-1/3 bg-yellow-500/50" />
            <div className="absolute left-2/3 top-0 bottom-0 w-1/3 bg-destructive/50" />
            
            <div className="absolute top-1/2 -translate-y-1/2 left-[15%] w-2 h-6 bg-white border border-black" />
            <div className="absolute -bottom-6 left-[15%] -translate-x-1/2 text-xs font-mono text-emerald-400">LOW RISK (Auto-Approve)</div>
         </div>
         
         <p className="text-sm text-muted-foreground max-w-md text-center">
            Combining offline hardware security with online AI scoring achieves 
            <span className="text-primary font-bold"> 99.7% fraud prevention accuracy</span>.
         </p>
      </div>
    )
  },
  {
    id: "live_demo_intro",
    title: "Live Demo",
    subtitle: "Use Case: Mumbai Chai Vendor",
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
        <div className="relative w-32 h-32 mb-8">
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
          <div className="absolute inset-0 border-2 border-primary rounded-full animate-[spin_10s_linear_infinite]" />
          <Globe className="w-full h-full text-primary p-6" />
        </div>
        <div className="flex gap-4 text-sm font-mono text-muted-foreground">
          <span className="flex items-center gap-1"><Shield className="w-4 h-4 text-emerald-400" /> Quantum Safe</span>
          <span className="flex items-center gap-1"><WifiOff className="w-4 h-4 text-orange-400" /> Offline Capable</span>
        </div>
      </div>
    )
  },
  {
    id: "unlimited_offline",
    title: "Unlimited Offline Payments",
    subtitle: "Real-World Scenarios",
    content: (
      <div className="h-full flex flex-col">
        <Tabs defaultValue="rural" className="w-full h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-muted/50 border border-primary/20">
            <TabsTrigger value="rural" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
               <Globe className="w-4 h-4 mr-2" /> Rural Village
            </TabsTrigger>
            <TabsTrigger value="metro" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
               <TrainFront className="w-4 h-4 mr-2" /> Metro Transit
            </TabsTrigger>
            <TabsTrigger value="disaster" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
               <Tent className="w-4 h-4 mr-2" /> Disaster Relief
            </TabsTrigger>
          </TabsList>

          {/* Scenario 1: Rural Village */}
          <TabsContent value="rural" className="flex-1 mt-0 animate-in fade-in slide-in-from-bottom-4">
             <div className="grid grid-cols-2 gap-8 h-full items-center">
                <div className="space-y-6">
                   <div className="flex items-center gap-3 text-orange-400 mb-4">
                      <Signal className="w-6 h-6 text-destructive animate-pulse" />
                      <span className="font-mono text-sm font-bold">NO NETWORK COVERAGE</span>
                   </div>
                   <h3 className="text-2xl font-bold">Remote Village Market</h3>
                   <p className="text-muted-foreground">
                      A farmer purchasing supplies in a remote area with zero cellular connectivity.
                      Transactions are signed locally and stored in the secure element.
                   </p>
                   <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                      <div className="flex justify-between text-sm mb-2">
                         <span className="text-muted-foreground">Offline Wallet Balance</span>
                         <span className="font-mono font-bold">₹4,500.00</span>
                      </div>
                      <div className="flex justify-between text-sm">
                         <span className="text-muted-foreground">Pending Sync</span>
                         <span className="font-mono text-orange-400">12 Txs</span>
                      </div>
                   </div>
                </div>
                <div className="relative h-64 bg-black/40 rounded-xl border border-border flex items-center justify-center overflow-hidden">
                   <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566555698097-69cb6e9290b5?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
                   <div className="z-10 text-center">
                      <Smartphone className="w-16 h-16 mx-auto text-primary mb-4" />
                      <div className="bg-background/80 backdrop-blur px-4 py-2 rounded-full border border-primary/50 text-xs font-mono">
                         Peers Connected: 15
                      </div>
                   </div>
                </div>
             </div>
          </TabsContent>

          {/* Scenario 2: Metro Transit */}
          <TabsContent value="metro" className="flex-1 mt-0 animate-in fade-in slide-in-from-bottom-4">
             <div className="grid grid-cols-2 gap-8 h-full items-center">
                <div className="space-y-6">
                   <div className="flex items-center gap-3 text-orange-400 mb-4">
                      <WifiOff className="w-6 h-6" />
                      <span className="font-mono text-sm font-bold">UNDERGROUND / TUNNEL</span>
                   </div>
                   <h3 className="text-2xl font-bold">Metro Ticketing</h3>
                   <p className="text-muted-foreground">
                      High-speed turnstile access underground. 300ms tap-and-go latency without server validation.
                   </p>
                   <div className="flex gap-4">
                      <div className="flex-1 p-4 bg-card rounded-lg border border-border text-center">
                         <div className="text-2xl font-bold text-primary">0.3s</div>
                         <div className="text-xs text-muted-foreground">Latency</div>
                      </div>
                      <div className="flex-1 p-4 bg-card rounded-lg border border-border text-center">
                         <div className="text-2xl font-bold text-emerald-400">∞</div>
                         <div className="text-xs text-muted-foreground">Consecutive Txs</div>
                      </div>
                   </div>
                </div>
                <div className="relative h-64 bg-black/40 rounded-xl border border-border flex items-center justify-center overflow-hidden">
                   <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556380673-76276056c03e?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
                   <div className="z-10 flex items-center gap-8">
                      <Smartphone className="w-12 h-12 text-gray-400" />
                      <ArrowRight className="w-8 h-8 text-primary animate-pulse" />
                      <div className="w-16 h-16 rounded-full border-4 border-primary flex items-center justify-center">
                         <CheckCircle className="w-8 h-8 text-primary" />
                      </div>
                   </div>
                </div>
             </div>
          </TabsContent>

          {/* Scenario 3: Disaster Relief */}
          <TabsContent value="disaster" className="flex-1 mt-0 animate-in fade-in slide-in-from-bottom-4">
             <div className="grid grid-cols-2 gap-8 h-full items-center">
                <div className="space-y-6">
                   <div className="flex items-center gap-3 text-destructive mb-4">
                      <AlertTriangle className="w-6 h-6 animate-bounce" />
                      <span className="font-mono text-sm font-bold">INFRASTRUCTURE DOWN</span>
                   </div>
                   <h3 className="text-2xl font-bold">Emergency Relief</h3>
                   <p className="text-muted-foreground">
                      Aid workers distributing digital cash credits to victims in a disaster zone where towers are down.
                   </p>
                   <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                      <h4 className="font-bold text-destructive mb-2">Aid Worker Terminal</h4>
                      <div className="space-y-2 text-sm">
                         <div className="flex justify-between">
                            <span>Recipients Serviced</span>
                            <span className="font-mono">1,245</span>
                         </div>
                         <div className="flex justify-between">
                            <span>Total Disbursed</span>
                            <span className="font-mono">₹50,00,000</span>
                         </div>
                      </div>
                   </div>
                </div>
                <div className="relative h-64 bg-black/40 rounded-xl border border-border flex items-center justify-center overflow-hidden">
                   <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1584268389256-0c59b4285a9d?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
                   <div className="z-10 text-center">
                      <div className="flex justify-center gap-4 mb-4">
                         <Smartphone className="w-10 h-10 text-primary" />
                         <Smartphone className="w-10 h-10 text-gray-400" />
                         <Smartphone className="w-10 h-10 text-gray-400" />
                      </div>
                      <div className="bg-destructive text-white px-3 py-1 rounded text-xs font-bold animate-pulse">
                         MESH NETWORK ACTIVE
                      </div>
                   </div>
                </div>
             </div>
          </TabsContent>
        </Tabs>
      </div>
    )
  },
  {
    id: "explorer",
    title: "Hedera Consensus Explorer",
    subtitle: "Live Transaction Visualization",
    content: (
      <div className="w-full h-80 bg-black/50 rounded-lg border border-primary/20 overflow-hidden relative font-mono text-xs p-4">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
         <div className="space-y-2 relative z-10">
            {[...Array(5)].map((_, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, x: -50 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: i * 0.5, duration: 0.5 }}
                 className="flex items-center gap-4 p-2 border-b border-primary/10"
               >
                 <span className="text-muted-foreground">0x{Math.random().toString(16).substring(2, 10)}...</span>
                 <span className="text-emerald-400">CONFIRMED</span>
                 <span className="text-primary ml-auto">{(Math.random() * 1000).toFixed(2)} QRM</span>
               </motion.div>
            ))}
         </div>
         <div className="absolute bottom-4 right-4 text-xs text-primary animate-pulse">
            LIVE FEED :: HEDERA MAINNET
         </div>
      </div>
    )
  },
  {
    id: "code",
    title: "HTTPx402 Middleware",
    subtitle: "Seamless Payment Integration",
    content: (
      <div className="w-full h-80 bg-[#0d1117] rounded-lg border border-muted overflow-hidden p-4 font-mono text-xs text-gray-300 overflow-y-auto">
        <pre>{`// Q_GRID Middleware
const paymentMiddleware = async (req, res, next) => {
  const { paymentHash } = req.headers;
  
  // 1. Verify Payment Proof on Hedera
  const isValid = await hederaClient.verifyPayment({
    hash: paymentHash,
    minAmount: 500, // 5.00 QRM
    recipient: MERCHANT_WALLET
  });

  if (!isValid) {
    return res.status(402).json({
      error: "Payment Required",
      paymentRequest: generateInvoice(500)
    });
  }

  // 2. Execute Smart Contract Logic
  await contract.executeService(req.body);
  
  next();
};`}</pre>
      </div>
    )
  }
];

export default function OfflineCBDCDemo() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="h-screen bg-background text-foreground overflow-hidden relative flex flex-col font-sans">
      {/* Header */}
      <header className="h-14 border-b border-border flex items-center justify-between px-6 bg-card/80 backdrop-blur z-50">
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-xs text-primary tracking-widest">Q_GRID_Q₹M.exe</span>
         </div>
         <div className="text-xs text-muted-foreground">OFFLINE CBDC ARCHITECTURE DEMO</div>
      </header>

      {/* Slide Container */}
      <div className="flex-1 relative flex items-center justify-center p-8 bg-[radial-gradient(ellipse_at_top,rgba(0,240,255,0.05),transparent_50%)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: "anticipate" }}
            className="w-full max-w-5xl aspect-[16/9] bg-card border border-primary/20 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
          >
             {/* Slide Content Header */}
             <div className="p-8 pb-4 border-b border-border/30 bg-gradient-to-r from-primary/5 to-transparent">
                <h1 className="text-3xl font-heading font-bold text-white mb-1">{SLIDES[currentSlide].title}</h1>
                <p className="text-lg text-primary font-light tracking-wide">{SLIDES[currentSlide].subtitle}</p>
             </div>

             {/* Main Content Area */}
             <div className="flex-1 p-8 relative overflow-y-auto">
                {SLIDES[currentSlide].content}
             </div>

             {/* Footer / Progress */}
             <div className="h-2 bg-muted w-full">
                <motion.div 
                  className="h-full bg-primary" 
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentSlide + 1) / SLIDES.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
             </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="h-16 border-t border-border flex items-center justify-center gap-8 bg-card/50 backdrop-blur z-50">
         <Button variant="ghost" onClick={prevSlide} className="hover:bg-primary/10 hover:text-primary">
            <ArrowLeft className="w-5 h-5 mr-2" /> Previous
         </Button>
         <span className="font-mono text-sm text-muted-foreground">
            {currentSlide + 1} / {SLIDES.length}
         </span>
         <Button variant="ghost" onClick={nextSlide} className="hover:bg-primary/10 hover:text-primary">
            Next <ArrowRight className="w-5 h-5 ml-2" />
         </Button>
      </div>
    </div>
  );
}
