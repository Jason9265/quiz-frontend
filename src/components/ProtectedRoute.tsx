import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute Component
 * 
 * This component acts as a wrapper for routes that require authentication.
 * It prevents unauthorized access to protected pages by redirecting users
 * to the login page if they are not authenticated.
 * 
 * Usage example:
 * <Route path="/dashboard" element={
 *   <ProtectedRoute>
 *     <DashboardComponent />
 *   </ProtectedRoute>
 * } />
 * 
 * @param {ReactNode} children - The child components/routes to be protected
 * @returns {JSX.Element} Either the protected content or a redirect to login
 */
export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};