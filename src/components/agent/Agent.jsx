import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from '../layout/Sidebar';
import UserProfile from '../auth/UserProfile';
import AgentDashboard from './AgentDashboard';
import AgentInbox from './AgentInbox';
import AgentProfile from './AgentProfile';
import ProtectedRoute from '../auth/ProtectedRoute';

const Agent = () => {
  const { user } = useAuth();
  const [activeMenu, setActiveMenu] = useState('my-dashboard');

  const renderContent = () => {
    switch (activeMenu) {
      case 'my-dashboard':
        return (
          <ProtectedRoute requiredPermission="handle_chats">
            <AgentDashboard />
          </ProtectedRoute>
        );
      case 'inbox':
        return (
          <ProtectedRoute requiredPermission="handle_chats">
            <AgentInbox />
          </ProtectedRoute>
        );
      case 'my-profile':
        return (
          <ProtectedRoute requiredPermission="update_profile">
            <AgentProfile />
          </ProtectedRoute>
        );
      default:
        return (
          <ProtectedRoute requiredPermission="handle_chats">
            <AgentDashboard />
          </ProtectedRoute>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar 
        role={user?.role} 
        activeMenu={activeMenu} 
        setActiveMenu={setActiveMenu} 
      />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">
                {user?.organizationName || 'Customer Service Platform'}
              </h1>
              <p className="text-sm text-muted-foreground">
                Agent Workspace
              </p>
            </div>
            <UserProfile />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Agent;
