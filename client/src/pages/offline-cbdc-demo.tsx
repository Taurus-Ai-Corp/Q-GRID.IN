import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Shield, Cpu, WifiOff, Radio, Server, FileCheck, Lock, Share2, Database, Activity, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

// Mock Images (Replace with generated assets)
import chipImage from "@assets/generated_images/secure_element_chip_macro.png";
import meshImage from "@assets/generated_images/nfc_mesh_network.png";
import ledgerImage from "@assets/generated_images/distributed_ledger_consensus.png";

const SLIDES = [
  {
    id: "intro",
    title: "AssetGrid (Q₹M)",
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
            <span className="font-mono text-xs text-primary tracking-widest">ASSETGRID_Q₹M.exe</span>
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
