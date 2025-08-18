import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { Suspense } from "react"
import { AnimatePresence } from "framer-motion"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/contexts/auth-context"
import { ThemeProvider } from "@/components/theme-provider"
import ProtectedRoute from "@/components/protected-route"
import LoginPage from "@/pages/Login"
import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { NotificationProviderGuard } from "@/components/notification-provider-guard"
import { LoadingScreen } from "@/components/loading-screen"
import { lazy } from "react"

// Lazy load heavy components
const Dashboard = lazy(() => import("@/pages/Dashboard").then(module => ({ default: module.Dashboard })));
const UsersPage = lazy(() => import("@/pages/Users").then(module => ({ default: module.UsersPage })));
const ProfilePage = lazy(() => import("@/pages/Profile").then(module => ({ default: module.ProfilePage })));
const ArchivePage = lazy(() => import("@/pages/archive").then(module => ({ default: module.ArchivePage })));
const NotFoundPage = lazy(() => import("@/pages/not-found").then(module => ({ default: module.NotFoundPage })));
const Example = lazy(() => import("@/pages/welcome").then(module => ({ default: module.Example })));
const NotificationsPage = lazy(() => import("@/pages/notifications"));
const OrganigrammePage = lazy(() => import("@/pages/Organigramme"));

function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <AnimatePresence mode="wait">
          <Suspense fallback={<LoadingScreen />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/welcome" element={<Example />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<Navigate to="/welcome" replace />} />

              <Route element={<ProtectedRoute />}>
                <Route element={
                  <NotificationProviderGuard>
                    <DashboardLayout />
                  </NotificationProviderGuard>
                }>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/users" element={<UsersPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/archive" element={<ArchivePage />} />
                  <Route path="/notifications" element={<NotificationsPage />} />
                  <Route path="/organigramme" element={<OrganigrammePage />} />
                </Route>
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App
