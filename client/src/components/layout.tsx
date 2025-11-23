import { Link, useLocation } from "wouter";
import { LayoutDashboard, Shield, ScanLine, History, Settings, LogOut, FileCheck, Presentation, Laptop2, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@assets/generated_images/assetgrid_quantum_logo.png";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: Wallet, label: "Smart Wallet", href: "/wallet" },
    { icon: FileCheck, label: "Tokenized KYC", href: "/tokenized-kyc" },
    { icon: Laptop2, label: "Offline CBDC Demo", href: "/offline-cbdc" },
    { icon: ScanLine, label: "Biometric Enrollment", href: "/enroll" },
    { icon: History, label: "Verification Log", href: "/logs" },
    { icon: Settings, label: "Security Settings", href: "/settings" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-sidebar-border bg-sidebar flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-sidebar-border">
          <img src={logo} alt="Logo" className="w-8 h-8 animate-pulse" />
          <div>
            <h1 className="font-heading font-bold text-lg tracking-wider text-primary">AssetGrid™</h1>
            <p className="text-xs text-muted-foreground tracking-widest">QUANTUM_RUPEE(Q₹)</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-md cursor-pointer transition-all duration-200 group",
                  location === item.href
                    ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(0,240,255,0.1)]"
                    : "hover:bg-sidebar-accent hover:text-foreground text-muted-foreground"
                )}
              >
                <item.icon className={cn("w-5 h-5", location === item.href && "animate-pulse")} />
                <span className="font-medium">{item.label}</span>
              </div>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="bg-card/50 p-4 rounded-lg border border-border mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">QUANTUM KEYS</span>
              <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded">ACTIVE</span>
            </div>
            <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full w-[85%] bg-gradient-to-r from-primary to-secondary animate-pulse" />
            </div>
          </div>
          <button className="flex items-center gap-3 px-4 py-3 w-full text-destructive hover:bg-destructive/10 rounded-md transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Disconnect</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Background Grid Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] pointer-events-none z-0" />
        
        {/* Header */}
        <header className="h-16 border-b border-border bg-background/80 backdrop-blur-md flex items-center justify-between px-8 z-10 sticky top-0">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-mono text-emerald-400">SYSTEM STATUS: QUANTUM SAFE</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-muted-foreground">CURRENT SESSION</p>
              <p className="text-sm font-mono text-primary">ID: 8849-CX-22</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-secondary/20 border border-secondary flex items-center justify-center">
              <span className="font-bold text-secondary">AC</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-8 z-10 relative scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
          {children}
        </div>
      </main>
    </div>
  );
}
