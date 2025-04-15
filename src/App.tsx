import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";

// Lazy load components for better performance
const ReportForm = lazy(() => import("./components/reporting/ReportForm"));
const ReportsList = lazy(() => import("./components/reporting/ReportsList"));
const ReportDetail = lazy(() => import("./components/reporting/ReportDetail"));
const ReportDashboard = lazy(
  () => import("./components/reporting/ReportDashboard"),
);
const ProfessionalSupportHub = lazy(
  () => import("./components/support/ProfessionalSupportHub"),
);
const EconomicEmpowermentCenter = lazy(
  () => import("./components/opportunities/EconomicEmpowermentCenter"),
);
const CommunityLearningPortal = lazy(
  () => import("./components/learning/CommunityLearningPortal"),
);

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      }
    >
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reports" element={<ReportsList />} />
          <Route path="/reports/new" element={<ReportForm />} />
          <Route path="/reports/:id" element={<ReportDetail />} />
          <Route path="/dashboard" element={<ReportDashboard />} />

          {/* Support Hub */}
          <Route path="/support" element={<ProfessionalSupportHub />} />

          {/* Economic Empowerment Center */}
          <Route
            path="/opportunities/*"
            element={<EconomicEmpowermentCenter />}
          />

          {/* Community Learning Portal */}
          <Route path="/community/*" element={<CommunityLearningPortal />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
