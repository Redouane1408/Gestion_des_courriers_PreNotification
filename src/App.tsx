//import "@fontsource/poppins/300.css"; // Light
//import "@fontsource/poppins/400.css"; // Regular
//import "@fontsource/poppins/700.css"; // Bold
//import "@fontsource/poppins/600.css"; // SemiBold
//import "@fontsource/poppins/800.css"; // ExtraBold
//import "@fontsource/poppins/200.css"; // ExtraLight
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/contexts/auth-context"
import { ThemeProvider } from "@/components/theme-provider"
import  ProtectedRoute  from "@/components/protected-route"
import  LoginPage  from "@/pages/login"
import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { Dashboard } from "@/pages/dashboard"
import { UsersPage } from "@/pages/users"
import { ProfilePage } from "@/pages/profile"
import { ArchivePage } from "@/pages/archive"
import { NotFoundPage } from "@/pages/not-found"
import { Example } from "@/pages/welcome"
import { NotificationProvider } from '@/contexts/notification-context';

function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <NotificationProvider> {/* Add NotificationProvider here */}
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/welcome"
                element={
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Example />
                  </motion.div>
                }
              />
              <Route
                path="/login"
                element={
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                  >
                    <LoginPage />
                  </motion.div>
                }
              />
              <Route path="/" element={<Navigate to="/welcome" replace />} />

              <Route element={<ProtectedRoute />}>
                <Route element={<DashboardLayout />}>
                  <Route
                    path="/dashboard"
                    element={
                      <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Dashboard />
                      </motion.div>
                    }
                  />
                  <Route
                    path="/users"
                    element={
                      <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                      >
                        <UsersPage />
                      </motion.div>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ProfilePage />
                      </motion.div>
                    }
                  />
                  <Route
                    path="/archive"
                    element={
                      <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArchivePage />
                      </motion.div>
                    }
                  />
                </Route>
              </Route>

              <Route
                path="*"
                element={
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                  >
                    <NotFoundPage />
                  </motion.div>
                }
              />
            </Routes>
          </AnimatePresence>
          <Toaster />
        </NotificationProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;