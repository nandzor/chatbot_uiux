import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getMenuByRole } from '../data/userConfig';

const RoleContext = createContext();

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

export const RoleProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [activeMenu, setActiveMenu] = useState('');
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const userMenu = getMenuByRole(currentUser.role);
      setMenuItems(userMenu);
      
      // Set default active menu based on role
      if (userMenu.length > 0) {
        setActiveMenu(userMenu[0].id);
      }
    } else {
      setMenuItems([]);
      setActiveMenu('');
    }
  }, [currentUser]);

  const getCurrentMenu = () => {
    return menuItems.find(item => item.id === activeMenu);
  };

  const value = {
    role: currentUser?.role || null,
    activeMenu,
    setActiveMenu,
    menuItems,
    getCurrentMenu,
    currentUser
  };

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
};
