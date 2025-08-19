import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import UserProfile from '../components/auth/UserProfile';
import { useAuth } from '../contexts/AuthContext';

const DashboardLayout = () => {
  const { user } = useAuth();

  return (
    <div className="flex h-screen bg-background">
      <Sidebar role={user?.role} />
      <main className="flex-1 overflow-auto">
        {/* Header with User Profile */}
        <div className="border-b bg-white p-4 flex justify-end">
          <UserProfile />
        </div>
        <div className="container mx-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
