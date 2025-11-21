import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_KYC_CREDENTIALS, MOCK_AADHAAR_DATA } from "@/lib/mock-data";
import { CheckCircle2, FileText, ShieldCheck, Loader2, Lock, Scan, Fingerprint } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function TokenizedKYC() {
  const { toast } = useToast();
  const [verifying, setVerifying] = useState(false);
  const [step, setStep] = useState(1); // 1: Select, 2: Capture, 3: Verify, 4: Complete

  const handleAadhaarVerify = () => {
    setVerifying(true);
    setTimeout(() => {
      setStep(2);
      setVerifying(false);
    }, 1500);
  };

  const handleBiometricCapture = () => {
    setVerifying(true);
    setTimeout(() => {
      setStep(3);
      setTimeout(() => {
        setStep(4);
        setVerifying(false);
        toast({
          title: "KYC Token Minted",
          description: "Your W3C Verifiable Credential has been issued on the chain.",
          className: "border-emerald-500 text-emerald-500 bg-emerald-500/10"
        });
      }, 2000);
    }, 2000);
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-heading font-bold mb-2 text-primary">Tokenized KYC</h1>
            <p className="text-muted-foreground">Convert your physical identity into a privacy-preserving ZK-Proof credential.</p>
          </div>
          <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary">
            <ShieldCheck className="w-3 h-3 mr-1" /> W3C Standard Compliant
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Action Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-primary/20 bg-card/60 backdrop-blur-sm min-h-[400px]">
              <CardHeader>
                <CardTitle className="font-heading">Credential Issuance</CardTitle>
                <CardDescription>Select a trusted source to mint your KYC token</CardDescription>
              </CardHeader>
              <CardContent>
                {step === 1 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button 
                      variant="outline" 
                      className="h-32 flex flex-col gap-3 hover:bg-primary/10 hover:border-primary/50 transition-all"
                      onClick={handleAadhaarVerify}
                    >
                      <Fingerprint className="w-8 h-8 text-orange-400" />
                      <div className="text-center">
                        <span className="block font-bold">Aadhaar Biometric</span>
                        <span className="text-xs text-muted-foreground">UIDAI Direct Integration</span>
                      </div>
                    </Button>
                    <Button variant="outline" className="h-32 flex flex-col gap-3 hover:bg-blue-500/10 hover:border-blue-500/50 transition-all">
                      <FileText className="w-8 h-8 text-blue-400" />
                      <div className="text-center">
                        <span className="block font-bold">DigiLocker Import</span>
                        <span className="text-xs text-muted-foreground">PAN / Driving License</span>
                      </div>
                    </Button>
                  </div>
                )}

                {step === 2 && (
                  <div className="flex flex-col items-center justify-center py-8 space-y-6 animate-in fade-in slide-in-from-bottom-4">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full border-2 border-dashed border-primary/50 flex items-center justify-center animate-[spin_10s_linear_infinite]">
                        <Scan className="w-10 h-10 text-primary animate-pulse" />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                         <Fingerprint className="w-8 h-8 text-primary/80" />
                      </div>
                    </div>
                    <div className="text-center space-y-2">
                      <h3 className="text-xl font-bold">Biometric Authentication</h3>
                      <p className="text-sm text-muted-foreground">
                        Please use your <strong>external biometric scanner</strong> (STARTEK FM220) or built-in camera for facial verification.
                      </p>
                      <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 mt-2">
                        <Fingerprint className="w-3 h-3 mr-1" /> External Hardware Required
                      </Badge>
                    </div>
                    <Button onClick={handleBiometricCapture} disabled={verifying} className="w-full max-w-xs bg-primary text-background hover:bg-primary/90">
                      {verifying ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Fingerprint className="w-4 h-4 mr-2" />}
                      {verifying ? "Verifying..." : "Simulate Hardware Scan"}
                    </Button>
                  </div>
                )}

                {step === 3 && (
                  <div className="flex flex-col items-center justify-center py-8 space-y-6 animate-in fade-in">
                    <Loader2 className="w-16 h-16 text-primary animate-spin" />
                    <div className="text-center space-y-1">
                      <h3 className="text-lg font-bold text-primary">Minting Credential...</h3>
                      <p className="text-xs font-mono text-muted-foreground">Generating Zero-Knowledge Proofs</p>
                      <p className="text-xs font-mono text-muted-foreground">Encrypting PII with user public key</p>
                      <p className="text-xs font-mono text-muted-foreground">Anchoring DID on Hedera Hashgraph</p>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="flex flex-col items-center justify-center py-8 space-y-6 animate-in zoom-in">
                    <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                      <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-2xl font-heading font-bold text-emerald-400">KYC Token Issued</h3>
                      <p className="text-sm text-muted-foreground mt-2">Your identity is now tokenized and reusable.</p>
                    </div>
                    <Button onClick={() => setStep(1)} variant="outline" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10">
                      Issue Another Credential
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* ZK Proof Demo Section */}
            <Card className="border-border/50">
               <CardHeader>
                 <CardTitle className="text-sm font-mono text-muted-foreground uppercase tracking-wider">Selective Disclosure (Zero-Knowledge)</CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="bg-muted/30 p-4 rounded-lg border border-border space-y-3">
                   <div className="flex items-center justify-between">
                     <span className="text-sm">Prove Age {'>='} 18</span>
                     <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">VERIFIED</Badge>
                   </div>
                   <div className="flex items-center justify-between">
                     <span className="text-sm">Prove Residency (Maharashtra)</span>
                     <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">VERIFIED</Badge>
                   </div>
                   <div className="flex items-center justify-between opacity-50">
                     <span className="text-sm">Prove Income {'>'} ₹5L</span>
                     <Badge variant="outline" className="text-muted-foreground border-muted">NOT REQUESTED</Badge>
                   </div>
                 </div>
                 <p className="text-xs text-muted-foreground mt-4 italic">
                   * Actual PII data (DOB, Address) is never revealed to the verifier, only the cryptographic proof.
                 </p>
               </CardContent>
            </Card>
          </div>

          {/* Right Column: Credential Preview */}
          <div className="space-y-6">
            <Card className={cn(
              "border-primary/20 transition-all duration-500",
              step === 4 ? "bg-primary/5 shadow-[0_0_30px_rgba(0,240,255,0.1)]" : "bg-card"
            )}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-sm font-mono text-primary uppercase tracking-wider">Live Credential Object</CardTitle>
                  <Lock className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-black/50 p-4 rounded-md border border-primary/10 font-mono text-[10px] text-muted-foreground overflow-hidden relative">
                  <pre className={cn("transition-opacity duration-500", step === 4 ? "opacity-100" : "opacity-50 blur-[1px]")}>
                    {JSON.stringify(step === 4 ? MOCK_KYC_CREDENTIALS : { status: "WAITING_FOR_ISSUANCE" }, null, 2)}
                  </pre>
                  {step !== 4 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs bg-background/80 px-2 py-1 rounded border border-border">Encrypted</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-900/20 to-transparent border-emerald-500/20">
              <CardHeader>
                 <CardTitle className="text-emerald-400 font-heading flex items-center gap-2">
                   <ShieldCheck className="w-5 h-5" />
                   CBDC Ready
                 </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This credential can be used for offline CBDC wallet creation on the 
                  <span className="text-primary font-bold"> AssetGrid Mesh</span>.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
