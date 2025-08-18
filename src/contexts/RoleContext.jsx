import React, { createContext, useContext, useState } from 'react';

const RoleContext = createContext();

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState('org_admin'); // Default role
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const value = {
    role,
    setRole,
    activeMenu,
    setActiveMenu,
  };

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
};
