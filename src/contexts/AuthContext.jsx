import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserAvatarData } from '../utils/avatarUtils';

// Test users dengan 3 role berbeda
export const testUsers = [
  {
    id: 1,
    username: 'superadmin',
    password: 'super123',
    name: 'Super Administrator',
    email: 'superadmin@system.com',
    role: 'superadmin',
    avatar: getUserAvatarData('superadmin@system.com', 'Super Administrator').avatar,
    permissions: ['*'], // All permissions
    description: 'Full system access across all organizations'
  },
  {
    id: 2,
    username: 'orgadmin',
    password: 'admin123',
    name: 'Ahmad Rahman',
    email: 'ahmad.rahman@company.com',
    role: 'organization_admin',
    organizationId: 'org-001',
    organizationName: 'PT Teknologi Nusantara',
    avatar: getUserAvatarData('ahmad.rahman@company.com', 'Ahmad Rahman').avatar,
    permissions: ['handle_chats', 'manage_users', 'manage_agents', 'manage_settings', 'view_analytics', 'manage_billing'],
    description: 'Organization administrator with full org management access'
  },
  {
    id: 3,
    username: 'agent1',
    password: 'agent123',
    name: 'Sari Dewi',
    email: 'sari.dewi@company.com',
    role: 'agent',
    organizationId: 'org-001',
    organizationName: 'PT Teknologi Nusantara',
    avatar: getUserAvatarData('sari.dewi@company.com', 'Sari Dewi').avatar,
    specialization: 'Customer Support',
    permissions: ['handle_chats', 'view_conversations', 'update_profile'],
    description: 'Customer support agent with chat handling capabilities'
  }
];

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('chatbot_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('chatbot_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username, password) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user in test users
      const foundUser = testUsers.find(
        u => u.username === username && u.password === password
      );

      if (foundUser) {
        // Remove password from user object for security
        const { password: _, ...userWithoutPassword } = foundUser;
        
        setUser(userWithoutPassword);
        setIsAuthenticated(true);
        
        // Save to localStorage for persistence
        localStorage.setItem('chatbot_user', JSON.stringify(userWithoutPassword));
        
        setIsLoading(false);
        return { success: true, user: userWithoutPassword };
      } else {
        setIsLoading(false);
        return { success: false, error: 'Username atau password salah' };
      }
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: 'Terjadi kesalahan saat login' };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('chatbot_user');
  };

  const hasPermission = (permission) => {
    if (!user || !user.permissions) return false;
    return user.permissions.includes('*') || user.permissions.includes(permission);
  };

  const isRole = (role) => {
    return user?.role === role;
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    hasPermission,
    isRole,
    testUsers // Export test users for login page
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
