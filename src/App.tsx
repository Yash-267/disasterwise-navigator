
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LocationProvider } from "./contexts/LocationContext";
import Index from "./pages/Index";
import MapPage from "./pages/MapPage";
import AlertsPage from "./pages/AlertsPage";
import SafetyPage from "./pages/SafetyPage";
import EmergencyPage from "./pages/EmergencyPage";
import AssistantPage from "./pages/AssistantPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LocationProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/safety" element={<SafetyPage />} />
            <Route path="/emergency" element={<EmergencyPage />} />
            <Route path="/assistant" element={<AssistantPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LocationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
