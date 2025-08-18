import React from 'react';
import { RoleProvider, useRole } from './contexts/RoleContext';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import Inbox from './components/inbox/Inbox';
import Analytics from './components/analytics/Analytics';
import Knowledge from './components/knowledge/Knowledge';
import Automations from './components/automations/Automations';
import Settings from './components/settings/Settings';
import './styles/globals.css';

const AppContent = () => {
  const { role, activeMenu, setActiveMenu } = useRole();

  const renderContent = () => {
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
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar role={role} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
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
    <RoleProvider>
      <AppContent />
    </RoleProvider>
  );
};

export default App;
