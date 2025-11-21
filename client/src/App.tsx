import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import KycEnrollment from "@/pages/kyc-enrollment";
import VerificationLog from "@/pages/verification-log";
import Settings from "@/pages/settings";
import TokenizedKYC from "@/pages/tokenized-kyc";
import InteractiveDeck from "@/pages/interactive-deck";
import OfflineCBDCDemo from "@/pages/offline-cbdc-demo";
import WalletPage from "@/pages/wallet";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/enroll" component={KycEnrollment} />
      <Route path="/logs" component={VerificationLog} />
      <Route path="/settings" component={Settings} />
      <Route path="/tokenized-kyc" component={TokenizedKYC} />
      <Route path="/demo" component={InteractiveDeck} />
      <Route path="/offline-cbdc" component={OfflineCBDCDemo} />
      <Route path="/wallet" component={WalletPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
