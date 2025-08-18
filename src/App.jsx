import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { RoleProvider, useRole } from './contexts/RoleContext';
import Sidebar from './components/layout/Sidebar';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import Inbox from './components/inbox/Inbox';
import Analytics from './components/analytics/Analytics';
import Knowledge from './components/knowledge/Knowledge';
import Automations from './components/automations/Automations';
import Settings from './components/settings/Settings';
import PlatformDashboard from './components/superadmin/PlatformDashboard';
import MyDashboard from './components/agent/MyDashboard';
import './styles/globals.css';

const AppContent = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { role, activeMenu, menuItems } = useRole();

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - show login
  if (!isAuthenticated) {
    return <Login />;
  }

  // Render content based on active menu and role
  const renderContent = () => {
    // Super Admin routes
    if (role === 'super_admin') {
      switch (activeMenu) {
        case 'platform-dashboard':
          return <PlatformDashboard />;
        case 'organizations':
          return <div className="p-6"><h2>Organizations Management</h2><p>Organizations content coming soon...</p></div>;
        case 'subscription-plans':
          return <div className="p-6"><h2>Subscription Plans</h2><p>Subscription plans content coming soon...</p></div>;
        case 'system-logs':
          return <div className="p-6"><h2>System Logs</h2><p>System logs content coming soon...</p></div>;
        case 'platform-settings':
          return <div className="p-6"><h2>Platform Settings</h2><p>Platform settings content coming soon...</p></div>;
        default:
          return <PlatformDashboard />;
      }
    }

    // Organization Admin routes
    if (role === 'org_admin') {
      switch (activeMenu) {
        case 'dashboard':
          return <Dashboard />;
        case 'inbox':
          return <Inbox />;
        case 'analytics':
          return <Analytics />;
        case 'knowledge':
          return <Knowledge />;
        case 'automations':
          return <Automations />;
        case 'settings':
          return <Settings />;
        default:
          return <Dashboard />;
      }
    }

    // Agent routes
    if (role === 'agent') {
      switch (activeMenu) {
        case 'my-dashboard':
          return <MyDashboard />;
        case 'inbox':
          return <Inbox />;
        case 'my-profile':
          return <div className="p-6"><h2>My Profile</h2><p>Profile content coming soon...</p></div>;
        default:
          return <MyDashboard />;
      }
    }

    // Default fallback
    return <div className="p-6"><h2>Welcome</h2><p>Please select a menu item.</p></div>;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
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
