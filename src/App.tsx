import { Suspense, lazy, useEffect, useState } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

// Lazy load components for better performance
const Login = lazy(() => import("./components/auth/Login"));
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

// Protected route component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const { user, isLoading } = useAuth();

  // Wait for auth to initialize before rendering routes
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

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
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" replace />}
          />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <ReportsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/new"
            element={
              <ProtectedRoute>
                <ReportForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/:id"
            element={
              <ProtectedRoute>
                <ReportDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <ReportDashboard />
              </ProtectedRoute>
            }
          />

          {/* Support Hub */}
          <Route
            path="/support"
            element={
              <ProtectedRoute>
                <ProfessionalSupportHub />
              </ProtectedRoute>
            }
          />

          {/* Economic Empowerment Center */}
          <Route
            path="/opportunities/*"
            element={
              <ProtectedRoute>
                <EconomicEmpowermentCenter />
              </ProtectedRoute>
            }
          />

          {/* Community Learning Portal */}
          <Route
            path="/community/*"
            element={
              <ProtectedRoute>
                <CommunityLearningPortal />
              </ProtectedRoute>
            }
          />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
