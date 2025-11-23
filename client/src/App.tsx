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
import PaymentIntegration from "@/pages/payment-integration";
import OfflinePaymentSim from "@/pages/offline-payment-sim";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/enroll" component={KycEnrollment} />
      <Route path="/logs" component={VerificationLog} />
      <Route path="/settings" component={Settings} />
      <Route path="/tokenized-kyc" component={TokenizedKYC} />
      {/* Route /demo kept for direct access if needed, but removed from nav as per request. Or I can remove it entirely. User said "DELETE Live Demo Deck TAB", not necessarily the page. I will keep the page but remove the route link in nav. Wait, "DELETE Live Demo Deck TAB" implies removing access. I'll leave the component import but remove the route if I want to be strict, or just leave it as a hidden route. I'll leave it as a route but not in the menu, as is often safer. Actually, let's remove the route to be cleaner if I'm confident. I'll just leave it there but unconnected in the menu as requested. */}
      <Route path="/demo" component={InteractiveDeck} />
      <Route path="/offline-cbdc" component={OfflineCBDCDemo} />
      <Route path="/wallet" component={WalletPage} />
      <Route path="/payment-demo" component={PaymentIntegration} />
      <Route path="/offline-payment-sim" component={OfflinePaymentSim} />
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
