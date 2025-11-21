import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";

interface BiometricCardProps {
  type: any;
  status: "ACTIVE" | "NOT_ENROLLED" | "SUSPENDED";
  onEnroll?: () => void;
}

export function BiometricCard({ type, status, onEnroll }: BiometricCardProps) {
  const isActive = status === "ACTIVE";
  
  return (
    <Card className={cn(
      "border-l-4 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.1)]",
      isActive ? "border-l-emerald-500 bg-card/60" : "border-l-muted-foreground bg-card/30 opacity-80 hover:opacity-100"
    )}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className={cn("p-2 rounded-lg bg-background/50 border border-border", type.color)}>
            <type.icon className="w-6 h-6" />
          </div>
          <Badge variant={isActive ? "default" : "outline"} className={cn(
            isActive ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/50 hover:bg-emerald-500/30" : "text-muted-foreground"
          )}>
            {status.replace("_", " ")}
          </Badge>
        </div>
        <CardTitle className="mt-4 font-heading text-lg tracking-wide">{type.label}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4 h-10 line-clamp-2">
          {type.description}
        </p>
        
        <div className="space-y-2 text-xs font-mono text-muted-foreground mb-6">
          <div className="flex justify-between">
            <span>Provider:</span>
            <span className="text-foreground">{type.provider}</span>
          </div>
          <div className="flex justify-between">
            <span>Accuracy:</span>
            <span className="text-primary">{type.accuracy}</span>
          </div>
        </div>

        {isActive ? (
          <div className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-500/5 p-2 rounded border border-emerald-500/20">
            <CheckCircle2 className="w-4 h-4" />
            <span>Verified & Secure</span>
          </div>
        ) : (
          <Button 
            onClick={onEnroll} 
            className="w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/50"
            variant="outline"
          >
            Enroll Now <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
