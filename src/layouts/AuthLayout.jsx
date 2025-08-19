import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AuthLayout = () => {
  const { isAuthenticated } = useAuth();

  // Redirect to appropriate dashboard based on role if already authenticated
  if (isAuthenticated) {
    const { user } = useAuth();
    if (user?.role === 'superadmin') {
      return <Navigate to="/superadmin" replace />;
    } else if (user?.role === 'agent') {
      return <Navigate to="/agent" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
