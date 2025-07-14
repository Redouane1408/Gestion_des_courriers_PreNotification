import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { Toaster } from "sonner" // Changed from "@/components/ui/toaster"
import { AuthProvider } from "@/contexts/auth-context"
import { ThemeProvider } from "@/components/theme-provider"
import ProtectedRoute from "@/components/protected-route"
import LoginPage from "@/pages/Login"
import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { Dashboard } from "@/pages/Dashboard"
import { UsersPage } from "@/pages/Users"
import { ProfilePage } from "@/pages/Profile"
import { ArchivePage } from "@/pages/archive"
import { NotFoundPage } from "@/pages/not-found"
import { Example } from "@/pages/welcome"
import { NotificationProviderGuard } from "@/components/notification-provider-guard"

function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <AnimatePresence mode="wait">
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
            </Route>
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  );
}


export default App
