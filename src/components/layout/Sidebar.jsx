import React from 'react';
import { useRole } from '../../contexts/RoleContext';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
  const { role, activeMenu, setActiveMenu, menuItems, currentUser } = useRole();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const getRoleDisplayName = (role) => {
    switch (role) {
      case 'super_admin':
        return 'Super Admin';
      case 'org_admin':
        return 'Admin Organisasi';
      case 'agent':
        return 'Agent';
      default:
        return 'User';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'super_admin':
        return 'bg-red-100 text-red-800';
      case 'org_admin':
        return 'bg-blue-100 text-blue-800';
      case 'agent':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg">🤖</span>
          </div>
          <div>
            <h1 className="font-bold text-lg text-gray-900">ChatBot</h1>
            <p className="text-xs text-gray-500">Platform</p>
          </div>
        </div>
        
        {/* User Info */}
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-sm font-medium">
                {currentUser.fullName?.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {currentUser.fullName}
              </p>
              <span className={`inline-block px-2 py-1 text-xs rounded-full ${getRoleColor(role)}`}>
                {getRoleDisplayName(role)}
              </span>
            </div>
          </div>
          {currentUser.organizationName && (
            <div className="mt-2 text-xs text-gray-500">
              🏢 {currentUser.organizationName}
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveMenu(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 text-left ${
              activeMenu === item.id
                ? "bg-blue-50 text-blue-700 border border-blue-200"
                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <span className="text-lg">📋</span>
            <div className="flex-1">
              <div className="font-medium">{item.label}</div>
              <div className="text-xs text-gray-500 font-normal">
                {item.description}
              </div>
            </div>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="space-y-2">
          <button
            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
            onClick={() => setActiveMenu('profile')}
          >
            👤 Profile
          </button>
          <button
            className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
            onClick={handleLogout}
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
