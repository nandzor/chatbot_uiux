import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { RoleProvider, useRole } from './contexts/RoleContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UserProfile from './components/auth/UserProfile';
import Login from './pages/Login';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import SessionManager from './components/inbox/SessionManager';
import Analytics from './components/analytics/Analytics';
import Knowledge from './components/knowledge/Knowledge';
import Automations from './components/automations/Automations';
import Settings from './components/settings/Settings';
import SuperAdmin from './components/superadmin/SuperAdmin';
import './styles/globals.css';

const AppContent = () => {
  const { isAuthenticated, isLoading, user, isRole } = useAuth();
  const { role, activeMenu, setActiveMenu } = useRole();

  // Show login page if not authenticated
  if (!isAuthenticated && !isLoading) {
    return <Login />;
  }

  // Show SuperAdmin interface for superadmin role
  if (isRole('superadmin')) {
    return <SuperAdmin />;
  }

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        );
      case 'inbox':
        return (
          <ProtectedRoute requiredPermission="handle_chats">
            <SessionManager />
          </ProtectedRoute>
        );
      case 'analytics':
        return (
          <ProtectedRoute requiredPermission="view_analytics">
            <Analytics />
          </ProtectedRoute>
        );
      case 'knowledge':
        return (
          <ProtectedRoute>
            <Knowledge />
          </ProtectedRoute>
        );
      case 'automations':
        return (
          <ProtectedRoute requiredPermission="manage_settings">
            <Automations />
          </ProtectedRoute>
        );
      case 'settings':
        return (
          <ProtectedRoute requiredPermission="manage_settings">
            <Settings />
          </ProtectedRoute>
        );
      default:
        return (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        );
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar role={role} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <main className="flex-1 overflow-auto">
        {/* Header with User Profile */}
        <div className="border-b bg-white p-4 flex justify-end">
          <UserProfile />
        </div>
        <div className="container mx-auto p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <RoleProvider>
        <AppContent />
      </RoleProvider>
    </AuthProvider>
  );
};

export default App;
