import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, MapPin, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface VerificationLog {
  id: string;
  userId: string | null;
  eventType: string;
  method: string;
  result: string;
  location: string | null;
  ipAddress: string | null;
  deviceInfo: string | null;
  riskScore: number;
  createdAt: string;
}

export default function VerificationLog() {
  const { data: logs = [], isLoading } = useQuery<VerificationLog[]>({
    queryKey: ['/api/logs'],
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Verification Log</h1>
          <p className="text-muted-foreground">Audit trail of all biometric authentication attempts on your account.</p>
        </div>

        <Card className="border-primary/10">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : logs.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>No verification logs yet.</p>
                <p className="text-sm mt-2">Complete a biometric enrollment to see activity here.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border">
                    <TableHead className="text-primary">Status</TableHead>
                    <TableHead className="text-primary">Timestamp</TableHead>
                    <TableHead className="text-primary">Event Type</TableHead>
                    <TableHead className="text-primary">Method</TableHead>
                    <TableHead className="text-primary">Details</TableHead>
                    <TableHead className="text-right text-primary">Risk Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log) => (
                    <TableRow key={log.id} className="border-border/50 hover:bg-primary/5" data-testid={`log-row-${log.id}`}>
                      <TableCell>
                        {log.result === "SUCCESS" ? (
                          <Badge variant="outline" className="border-emerald-500/50 text-emerald-400 bg-emerald-500/10">
                            <CheckCircle2 className="w-3 h-3 mr-1" /> Success
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="border-destructive/50 text-destructive bg-destructive/10">
                            <XCircle className="w-3 h-3 mr-1" /> Failed
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {new Date(log.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell className="font-medium">{log.eventType}</TableCell>
                      <TableCell>{log.method}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {log.location || "Unknown"}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={`font-mono font-bold ${
                          log.riskScore > 50 ? "text-destructive" : "text-emerald-400"
                        }`}>
                          {log.riskScore}/100
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
