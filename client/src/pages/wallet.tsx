import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, ArrowRightLeft, Send, QrCode, ShieldCheck, Building2, FileText, Activity, AlertTriangle, Globe, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState("crypto");

  const ASSETS = [
    { symbol: "HBAR", name: "Hedera", balance: "15,420.50", value: "$1,850.46", change: "+5.2%", icon: "ħ" },
    { symbol: "USDC", name: "USD Coin", balance: "5,000.00", value: "$5,000.00", change: "+0.0%", icon: "$" },
    { symbol: "ETH", name: "Ethereum", balance: "1.45", value: "$4,820.12", change: "-1.2%", icon: "Ξ" },
    { symbol: "SOL", name: "Solana", balance: "145.20", value: "$2,150.80", change: "+8.5%", icon: "◎" },
  ];

  return (
    <Layout>
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-heading font-bold mb-2 text-primary">Smart Wallet</h1>
            <p className="text-muted-foreground">Unified interface for CBDC, Crypto, and Fiat operations.</p>
          </div>
          <div className="flex gap-2">
             <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                <ShieldCheck className="w-3 h-3 mr-1" /> HTS Audited
             </Badge>
             <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                <Globe className="w-3 h-3 mr-1" /> Hedera Mainnet
             </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Wallet Interface */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-primary/20 bg-card/60 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="font-heading">Asset Portfolio</CardTitle>
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[200px]">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="crypto">Crypto</TabsTrigger>
                      <TabsTrigger value="fiat">Fiat / CBDC</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent>
                {activeTab === "crypto" ? (
                  <div className="space-y-4 mt-4">
                    <div className="bg-gradient-to-r from-primary/20 to-purple-500/20 p-6 rounded-xl border border-primary/20 mb-6">
                       <div className="flex justify-between items-start mb-4">
                          <div>
                             <p className="text-sm text-muted-foreground">Total Balance</p>
                             <h2 className="text-4xl font-bold font-mono text-white">$13,821.38</h2>
                          </div>
                          <div className="p-2 bg-black/30 rounded-lg">
                             <QrCode className="w-6 h-6 text-white" />
                          </div>
                       </div>
                       <div className="flex gap-3">
                          <Button size="sm" className="flex-1 bg-primary text-black hover:bg-primary/90"><Send className="w-4 h-4 mr-2" /> Send</Button>
                          <Button size="sm" variant="outline" className="flex-1 border-primary/50 text-primary hover:bg-primary/10"><ArrowRightLeft className="w-4 h-4 mr-2" /> Swap</Button>
                       </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">Assets</h3>
                      {ASSETS.map((asset) => (
                        <div key={asset.symbol} className="flex items-center justify-between p-4 bg-card/40 border border-border rounded-lg hover:border-primary/30 transition-colors cursor-pointer group">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg font-bold text-foreground group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                                 {asset.icon}
                              </div>
                              <div>
                                 <p className="font-bold">{asset.name}</p>
                                 <p className="text-xs text-muted-foreground">{asset.balance} {asset.symbol}</p>
                              </div>
                           </div>
                           <div className="text-right">
                              <p className="font-mono font-medium">{asset.value}</p>
                              <p className={cn("text-xs", asset.change.startsWith("+") ? "text-emerald-400" : "text-destructive")}>
                                 {asset.change}
                              </p>
                           </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 mt-4">
                     <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 p-6 rounded-xl border border-emerald-500/20 mb-6">
                       <div className="flex justify-between items-start mb-4">
                          <div>
                             <p className="text-sm text-muted-foreground">e-Rupee (CBDC) Balance</p>
                             <h2 className="text-4xl font-bold font-mono text-white">₹45,200.00</h2>
                          </div>
                          <Badge className="bg-emerald-500 text-black">OFFLINE READY</Badge>
                       </div>
                       <div className="flex gap-3">
                          <Button size="sm" className="flex-1 bg-emerald-500 text-black hover:bg-emerald-400"><Wallet className="w-4 h-4 mr-2" /> Pay Offline</Button>
                          <Button size="sm" variant="outline" className="flex-1 border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10"><ArrowRightLeft className="w-4 h-4 mr-2" /> Convert to Crypto</Button>
                       </div>
                    </div>
                    
                    <div className="p-4 rounded-lg border border-yellow-500/20 bg-yellow-500/5 flex items-start gap-3">
                       <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                       <div>
                          <h4 className="text-sm font-bold text-yellow-500">Offline Limit Warning</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                             You have ₹4,800 remaining in your offline spending limit. Please connect to internet to sync and reset limit.
                          </p>
                       </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Compliance & Security */}
          <div className="space-y-6">
            <Card className="border-primary/20">
               <CardHeader>
                  <CardTitle className="font-heading flex items-center gap-2">
                     <ShieldCheck className="w-5 h-5 text-primary" />
                     Compliance Layer
                  </CardTitle>
               </CardHeader>
               <CardContent className="space-y-6">
                  {/* Jumio Integration */}
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                     <div className="bg-emerald-500 p-1.5 rounded-full">
                        <CheckCircle2 className="w-4 h-4 text-black" />
                     </div>
                     <div>
                        <p className="text-sm font-bold text-emerald-400">Identity Verified</p>
                        <p className="text-[10px] text-muted-foreground">Via Jumio Identity Verification</p>
                     </div>
                  </div>

                  {/* Accredited Investor */}
                  <div className="space-y-2">
                     <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Accredited Investor</span>
                        <Badge variant="outline" className="text-primary border-primary/30">VERIFIED</Badge>
                     </div>
                     <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full w-full bg-primary" />
                     </div>
                     <p className="text-[10px] text-muted-foreground">Net worth check passed via automated banking integration.</p>
                  </div>

                  {/* Monitoring */}
                  <div className="space-y-3 pt-4 border-t border-border">
                     <h4 className="text-xs font-bold text-muted-foreground uppercase">Real-time Monitoring</h4>
                     
                     <div className="flex items-center gap-3 text-sm">
                        <Activity className="w-4 h-4 text-blue-400" />
                        <span>AML Transaction Screening</span>
                        <span className="ml-auto text-emerald-400 text-xs">ACTIVE</span>
                     </div>
                     
                     <div className="flex items-center gap-3 text-sm">
                        <Building2 className="w-4 h-4 text-purple-400" />
                        <span>Regulatory Reporting</span>
                        <span className="ml-auto text-emerald-400 text-xs">AUTO</span>
                     </div>
                  </div>

                  <Button variant="outline" className="w-full text-xs mt-2">
                     <FileText className="w-3 h-3 mr-2" /> Download Compliance Report
                  </Button>
               </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-card to-card/50 border-border">
               <CardHeader>
                  <CardTitle className="text-sm font-mono text-muted-foreground">HEDERA GOVERNANCE</CardTitle>
               </CardHeader>
               <CardContent>
                  <p className="text-sm mb-4">
                     Backed by 30+ global leaders providing enterprise-grade stability and regulatory confidence.
                  </p>
                  <div className="flex flex-wrap gap-2">
                     {["Google", "IBM", "LG", "Boeing", "Dell"].map(n => (
                        <span key={n} className="text-[10px] bg-muted px-2 py-1 rounded border border-border">{n}</span>
                     ))}
                     <span className="text-[10px] text-muted-foreground px-2 py-1">+25 more</span>
                  </div>
               </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
