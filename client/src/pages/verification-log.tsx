import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MOCK_LOGS } from "@/lib/mock-data";
import { CheckCircle2, XCircle, AlertTriangle, MapPin, Monitor } from "lucide-react";

export default function VerificationLog() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Verification Log</h1>
          <p className="text-muted-foreground">Audit trail of all biometric authentication attempts on your account.</p>
        </div>

        <Card className="border-primary/10">
          <CardContent className="p-0">
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
                {MOCK_LOGS.map((log) => (
                  <TableRow key={log.id} className="border-border/50 hover:bg-primary/5">
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
                    <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                    <TableCell className="font-medium">{log.type}</TableCell>
                    <TableCell>{log.method}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {log.location}
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
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
