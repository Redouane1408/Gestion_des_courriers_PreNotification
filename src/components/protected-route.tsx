// src/components/ProtectedRoute.tsx
import { useAuth } from '@/contexts/auth-context';
import { Navigate, Outlet } from 'react-router-dom';
//import { LoadingScreen } from '@/LoadingScreen';

export default function ProtectedRoute({ adminOnly = false }) {
  const { isAuthenticated, /*isLoading,*/ role } = useAuth();

  //if (isLoading) return <LoadingScreen />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (adminOnly && role !== 'ADMIN') return <Navigate to="/unauthorized" replace />;

  return <Outlet />;
}