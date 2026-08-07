import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import { AppLayout } from "./components/layout/AppLayout.tsx";
import { AppDashboard } from "./pages/AppDashboard.tsx";
import { BillingPage } from "./pages/BillingPage.tsx";
import { TenantsPage } from "./pages/TenantsPage.tsx";
import { ComplaintsPage } from "./pages/ComplaintsPage.tsx";
import { VisitorsPage } from "./pages/VisitorsPage.tsx";
import { AmenitiesPage } from "./pages/AmenitiesPage.tsx";
import { VotingPage } from "./pages/VotingPage.tsx";
import { DocumentsPage } from "./pages/DocumentsPage.tsx";
import { AdminPage } from "./pages/AdminPage.tsx";
import { UtilitiesPage } from "./pages/UtilitiesPage.tsx";
import { HelpersPage } from "./pages/HelpersPage.tsx";
import { ClearancePage } from "./pages/ClearancePage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" richColors />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* SocietyConnect OS Application Workspace Routes */}
          <Route
            path="/app/*"
            element={
              <AppLayout>
                <Routes>
                  <Route path="/" element={<AppDashboard />} />
                  <Route path="/billing" element={<BillingPage />} />
                  <Route path="/utilities" element={<UtilitiesPage />} />
                  <Route path="/tenants" element={<TenantsPage />} />
                  <Route path="/complaints" element={<ComplaintsPage />} />
                  <Route path="/visitors" element={<VisitorsPage />} />
                  <Route path="/amenities" element={<AmenitiesPage />} />
                  <Route path="/voting" element={<VotingPage />} />
                  <Route path="/helpers" element={<HelpersPage />} />
                  <Route path="/clearance" element={<ClearancePage />} />
                  <Route path="/documents" element={<DocumentsPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                </Routes>
              </AppLayout>
            }
          />

          {/* CATCH-ALL ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
