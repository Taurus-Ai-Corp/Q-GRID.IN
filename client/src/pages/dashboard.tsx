import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BIOMETRIC_TYPES } from "@/lib/constants";
import { BiometricCard } from "@/components/biometric-card";
import { useLocation } from "wouter";
import { ShieldCheck, TrendingUp, Activity, Lock } from "lucide-react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

interface DashboardStats {
  totalBalance: string;
  securityScore: number;
  activeProfiles: number;
  totalProfiles: number;
  recentLogs: {
    id: string;
    eventType: string;
    method: string;
    result: string;
    location: string | null;
    riskScore: number;
    createdAt: string;
  }[];
}

interface BiometricProfile {
  id: string;
  biometricType: string;
  status: string;
}

export default function Dashboard() {
  const [, setLocation] = useLocation();

  const { data: stats, isLoading: statsLoading } = useQuery<DashboardStats>({
    queryKey: ['/api/dashboard/stats'],
  });

  const { data: profiles = [] } = useQuery<BiometricProfile[]>({
    queryKey: ['/api/biometrics'],
  });

  const getStatus = (typeId: string) => {
    const profile = profiles.find(p => 
      p.biometricType === typeId.toUpperCase() || 
      p.biometricType === BIOMETRIC_TYPES[typeId.toUpperCase() as keyof typeof BIOMETRIC_TYPES]?.id?.toUpperCase()
    );
    return profile ? profile.status : "NOT_ENROLLED";
  };

  const balance = stats?.totalBalance || "0.00";
  const securityScore = stats?.securityScore || 0;
  const recentLogs = stats?.recentLogs || [];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 bg-gradient-to-br from-card to-card/50 border-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <ShieldCheck className="w-48 h-48" />
            </div>
            <CardHeader>
              <CardTitle className="text-sm font-mono text-muted-foreground uppercase tracking-wider">Total Balance (Q₹M)</CardTitle>
            </CardHeader>
            <CardContent>
                <h1 className="text-5xl font-bold font-heading text-white drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]" data-testid="text-total-balance">
                {balance.split(" ")[0]}
                <span className="text-2xl text-primary ml-2">Q₹M</span>
              </h1>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-1 text-emerald-400 text-sm bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                  <TrendingUp className="w-4 h-4" />
                  <span>+2.4% (24h)</span>
                </div>
                <p className="text-xs text-muted-foreground">Protected by Q_GRID.taurusai.in Mesh</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-primary/20">
            <CardHeader>
              <CardTitle className="text-sm font-mono text-muted-foreground uppercase tracking-wider">Security Score</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center pt-0">
              <div className="w-32 h-32 font-heading font-bold">
                <CircularProgressbar 
                  value={securityScore} 
                  text={`${securityScore}%`}
                  styles={buildStyles({
                    pathColor: `rgba(0, 240, 255, ${securityScore / 100})`,
                    textColor: '#fff',
                    trailColor: 'rgba(255,255,255,0.1)',
                    textSize: '24px',
                  })}
                />
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm font-medium text-primary" data-testid="text-security-status">
                  {securityScore >= 80 ? "Excellent" : securityScore >= 50 ? "Good" : "Needs Improvement"}
                </p>
                <p className="text-xs text-muted-foreground">{stats?.activeProfiles || 0}/5 Biometrics Active</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Biometric Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-heading font-bold">Biometric Factors</h2>
            <div className="flex gap-2">
               <Badge className="bg-primary/10 text-primary border-primary/20">
                  <Activity className="w-3 h-3 mr-1" /> Live Monitoring
               </Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(BIOMETRIC_TYPES).map((type) => (
              <BiometricCard 
                key={type.id} 
                type={type} 
                status={getStatus(type.id) as any}
                onEnroll={() => setLocation("/enroll")}
              />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="border-muted">
           <CardHeader>
              <CardTitle className="font-heading">Recent Verifications</CardTitle>
           </CardHeader>
           <CardContent>
              <div className="space-y-4">
                {recentLogs.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">No verification logs yet. Complete a biometric enrollment to see activity here.</p>
                ) : (
                  recentLogs.slice(0, 3).map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border hover:border-primary/30 transition-colors" data-testid={`log-item-${log.id}`}>
                      <div className="flex items-center gap-4">
                        <div className={cn("p-2 rounded-full", log.result === "SUCCESS" ? "bg-emerald-500/10 text-emerald-400" : "bg-destructive/10 text-destructive")}>
                          {log.result === "SUCCESS" ? <Lock className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{log.eventType}</p>
                          <p className="text-xs text-muted-foreground">{new Date(log.createdAt).toLocaleString()} • {log.location || "Unknown"}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className={cn(
                          "mb-1",
                           log.result === "SUCCESS" ? "border-emerald-500/50 text-emerald-400" : "border-destructive/50 text-destructive"
                        )}>
                          {log.result}
                        </Badge>
                        <p className="text-xs text-muted-foreground">Via {log.method}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
           </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
