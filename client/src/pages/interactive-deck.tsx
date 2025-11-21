import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Globe, Shield, Code, Smartphone, WifiOff, CheckCircle, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

const SLIDES = [
  {
    id: "hero",
    title: "Experience Instant Global Payments",
    subtitle: "AssetGrid (Q₹M) - Quantum Rupee Mesh",
    content: (
      <div className="flex flex-col items-center justify-center h-64">
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
        <pre>{`// AssetGrid Middleware
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
  },
  {
    id: "simulator",
    title: "Use Case: Mumbai Chai Vendor",
    subtitle: "Offline Peer-to-Peer Payment",
    content: (
      <div className="flex justify-between items-center h-80 px-10 relative">
         {/* Payer */}
         <div className="text-center z-10">
            <Smartphone className="w-16 h-16 mx-auto text-gray-400 mb-2" />
            <p className="font-bold">Customer</p>
            <p className="text-xs text-orange-400 flex items-center justify-center gap-1"><WifiOff className="w-3 h-3" /> Offline</p>
         </div>

         {/* Connection Line */}
         <div className="flex-1 h-1 bg-muted relative mx-4">
            <motion.div 
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full shadow-[0_0_10px_#00f0ff]"
              animate={{ x: [0, 200, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-mono text-muted-foreground">
               NFC / BLE MESH
            </div>
         </div>

         {/* Payee */}
         <div className="text-center z-10">
            <Smartphone className="w-16 h-16 mx-auto text-primary mb-2" />
            <p className="font-bold">Chai Vendor</p>
            <div className="mt-2 bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-xs border border-emerald-500/50 flex items-center gap-1">
               <CheckCircle className="w-3 h-3" /> Received ₹20
            </div>
         </div>
      </div>
    )
  }
];

export default function InteractiveDeck() {
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
    <div className="h-screen bg-background text-foreground overflow-hidden relative flex flex-col">
      {/* Deck Controls / Header */}
      <header className="h-16 border-b border-border flex items-center justify-between px-8 bg-card/80 backdrop-blur z-50">
         <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="ml-4 font-mono text-sm text-muted-foreground">NOVALAX_LIVE_DEMO.exe</span>
         </div>
         <div className="font-heading font-bold text-primary tracking-widest">ASSETGRID PRESENTATION</div>
      </header>

      {/* Main Slide Area */}
      <div className="flex-1 relative flex items-center justify-center p-12">
        {/* Background Ambience */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.05)_0%,transparent_70%)]" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 1.05 }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="w-full max-w-4xl aspect-video bg-card border border-primary/20 rounded-xl shadow-2xl relative overflow-hidden flex flex-col"
          >
             {/* Slide Header */}
             <div className="p-8 border-b border-border/50 bg-gradient-to-r from-primary/5 to-transparent">
                <h1 className="text-4xl font-heading font-bold text-white mb-2">{SLIDES[currentSlide].title}</h1>
                <p className="text-xl text-primary font-light">{SLIDES[currentSlide].subtitle}</p>
             </div>

             {/* Slide Content */}
             <div className="flex-1 p-8 relative">
                {SLIDES[currentSlide].content}
             </div>

             {/* Slide Footer */}
             <div className="p-4 border-t border-border/50 flex justify-between items-center text-xs text-muted-foreground font-mono">
                <span>SLIDE {currentSlide + 1} / {SLIDES.length}</span>
                <span>CONFIDENTIAL // INTERNAL USE ONLY</span>
             </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="h-20 border-t border-border flex items-center justify-center gap-8 bg-card/50 backdrop-blur z-50">
         <Button variant="outline" size="icon" onClick={prevSlide} className="rounded-full w-12 h-12 border-primary/20 hover:bg-primary/10">
            <ArrowLeft className="w-6 h-6" />
         </Button>
         
         <div className="flex gap-2">
            {SLIDES.map((_, idx) => (
               <div 
                 key={idx} 
                 className={cn(
                   "w-3 h-3 rounded-full transition-all duration-300 cursor-pointer",
                   idx === currentSlide ? "bg-primary w-8" : "bg-muted hover:bg-primary/50"
                 )}
                 onClick={() => setCurrentSlide(idx)}
               />
            ))}
         </div>

         <Button variant="outline" size="icon" onClick={nextSlide} className="rounded-full w-12 h-12 border-primary/20 hover:bg-primary/10">
            <ArrowRight className="w-6 h-6" />
         </Button>
      </div>
    </div>
  );
}
