import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Smartphone, Key, AlertTriangle, Monitor } from "lucide-react";

export default function Settings() {
  return (
    <Layout>
       <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Security Settings</h1>
          <p className="text-muted-foreground">Manage your device trust, quantum keys, and alert thresholds.</p>
        </div>

        <div className="grid gap-6">
          {/* Global Security */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Global Biometric Policy
              </CardTitle>
              <CardDescription>Configure when biometrics are required.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Require for Login</Label>
                  <p className="text-xs text-muted-foreground">Face ID or Fingerprint required to access dashboard</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Require for Transactions &gt; 100 QRM</Label>
                  <p className="text-xs text-muted-foreground">Step-up authentication for transfers</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Liveness Detection (Strict)</Label>
                  <p className="text-xs text-muted-foreground">Increases rejection rate but prevents spoofing</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Trusted Devices */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-purple-400" />
                Trusted Devices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-card/50">
                  <div className="flex items-center gap-3">
                     <Smartphone className="w-8 h-8 p-1.5 bg-muted rounded" />
                     <div>
                       <p className="font-medium text-sm">iPhone 15 Pro Max</p>
                       <p className="text-xs text-emerald-400">Current Device • Verified</p>
                     </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">Remove</Button>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-card/50">
                  <div className="flex items-center gap-3">
                     <Monitor className="w-8 h-8 p-1.5 bg-muted rounded" />
                     <div>
                       <p className="font-medium text-sm">MacBook Pro M3</p>
                       <p className="text-xs text-muted-foreground">Last active: 2 days ago</p>
                     </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">Remove</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quantum Keys */}
          <Card className="border-border bg-gradient-to-r from-background to-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5 text-primary" />
                Quantum Key Management
              </CardTitle>
            </CardHeader>
            <CardContent>
               <div className="bg-background/50 p-4 rounded border border-primary/20 font-mono text-xs break-all mb-4">
                 dilithium_pub_8x92...9a8f
               </div>
               <div className="flex gap-4">
                 <Button variant="outline" className="w-full border-primary/50 text-primary hover:bg-primary/10">Rotate Keys</Button>
                 <Button variant="destructive" className="w-full bg-destructive/20 hover:bg-destructive/30 text-destructive border border-destructive/50">Revoke All</Button>
               </div>
            </CardContent>
          </Card>
        </div>
       </div>
    </Layout>
  );
}
