import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// Layout Components
import RootLayout from '../layouts/RootLayout';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import SuperAdminLayout from '../layouts/SuperAdminLayout';
import AgentLayout from '../layouts/AgentLayout';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';

// Dashboard Pages
import Dashboard from '../pages/dashboard/Dashboard';
import Inbox from '../pages/inbox/Inbox';
import Analytics from '../pages/analytics/Analytics';
import Knowledge from '../pages/knowledge/Knowledge';
import Automations from '../pages/automations/Automations';
import Settings from '../pages/settings/Settings';

// Super Admin Pages
import SuperAdminDashboard from '../pages/superadmin/Dashboard';
import Financials from '../pages/superadmin/Financials';
import UserManagement from '../pages/superadmin/UserManagement';
import SystemSettings from '../pages/superadmin/SystemSettings';

// Agent Pages
import AgentDashboard from '../pages/agent/Dashboard';
import AgentInbox from '../pages/agent/Inbox';
import AgentProfile from '../pages/agent/Profile';

// Error Pages
import NotFound from '../pages/errors/NotFound';
import Unauthorized from '../pages/errors/Unauthorized';
import ServerError from '../pages/errors/ServerError';

// Protected Route Components
import ProtectedRoute from '../components/auth/ProtectedRoute';
import RoleBasedRoute from '../components/auth/RoleBasedRoute';
import RoleBasedRedirect from '../components/auth/RoleBasedRedirect';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      // Auth Routes
      {
        path: '/auth',
        element: <AuthLayout />,
        children: [
          { index: true, element: <Navigate to="/auth/login" replace /> },
          { path: 'login', element: <Login /> },
          { path: 'register', element: <Register /> },
          { path: 'forgot-password', element: <ForgotPassword /> },
          { path: 'reset-password', element: <ResetPassword /> },
        ],
      },

      // Dashboard Routes (Organization Admin/Manager)
      {
        path: '/dashboard',
        element: (
          <RoleBasedRoute requiredRole="organization_admin">
            <DashboardLayout />
          </RoleBasedRoute>
        ),
        children: [
          { index: true, element: <Dashboard /> },
          { 
            path: 'inbox', 
            element: (
              <RoleBasedRoute requiredPermission="handle_chats">
                <Inbox />
              </RoleBasedRoute>
            ) 
          },
          { 
            path: 'analytics', 
            element: (
              <RoleBasedRoute requiredPermission="view_analytics">
                <Analytics />
              </RoleBasedRoute>
            ) 
          },
          { path: 'knowledge', element: <Knowledge /> },
          { 
            path: 'automations', 
            element: (
              <RoleBasedRoute requiredPermission="manage_settings">
                <Automations />
              </RoleBasedRoute>
            ) 
          },
          { 
            path: 'settings', 
            element: (
              <RoleBasedRoute requiredPermission="manage_settings">
                <Settings />
              </RoleBasedRoute>
            ) 
          },
        ],
      },

      // Super Admin Routes
      {
        path: '/superadmin',
        element: (
          <RoleBasedRoute requiredRole="superadmin">
            <SuperAdminLayout />
          </RoleBasedRoute>
        ),
        children: [
          { index: true, element: <SuperAdminDashboard /> },
          { path: 'financials', element: <Financials /> },
          { path: 'users', element: <UserManagement /> },
          { path: 'system', element: <SystemSettings /> },
        ],
      },

      // Agent Routes
      {
        path: '/agent',
        element: (
          <RoleBasedRoute requiredRole="agent">
            <AgentLayout />
          </RoleBasedRoute>
        ),
        children: [
          { index: true, element: <AgentDashboard /> },
          { path: 'inbox', element: <AgentInbox /> },
          { path: 'profile', element: <AgentProfile /> },
        ],
      },

      // Error Routes
      { path: '/unauthorized', element: <Unauthorized /> },
      { path: '/server-error', element: <ServerError /> },

      // Default redirect - will be handled by RoleBasedRedirect
      { index: true, element: <RoleBasedRedirect /> },
    ],
  },
]);

export default router;
