
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Chat from "./pages/Chat";
import Forecast from "./pages/Forecast";
import RiskAssessment from "./pages/RiskAssessment";
import Investments from "./pages/Investments";
import FinancialLiteracy from "./pages/FinancialLiteracy";
import MarketUpdates from "./pages/MarketUpdates";
import InvestmentBasics from "./pages/InvestmentBasics";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Disclaimer from "./pages/Disclaimer";
import SocialRedirect from "./pages/SocialRedirect";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/risk-assessment" element={<RiskAssessment />} />
          <Route path="/investments" element={<Investments />} />
          
          {/* Resource pages */}
          <Route path="/financial-literacy" element={<FinancialLiteracy />} />
          <Route path="/market-updates" element={<MarketUpdates />} />
          <Route path="/investment-basics" element={<InvestmentBasics />} />
          <Route path="/faq" element={<FAQ />} />
          
          {/* Legal pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          
          {/* Social redirects */}
          <Route path="/social/:platform" element={<SocialRedirect />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
