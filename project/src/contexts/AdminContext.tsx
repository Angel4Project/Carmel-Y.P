import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  updateCredentials: (newUsername: string, newPassword: string) => void;
  adminData: {
    username: string;
    password: string;
  };
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminData, setAdminData] = useState({
    username: 'admin',
    password: 'admin123'
  });

  useEffect(() => {
    const savedAuth = localStorage.getItem('adminAuth');
    const savedCredentials = localStorage.getItem('adminCredentials');
    
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
    
    if (savedCredentials) {
      setAdminData(JSON.parse(savedCredentials));
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    if (username === adminData.username && password === adminData.password) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
  };

  const updateCredentials = (newUsername: string, newPassword: string) => {
    const newCredentials = { username: newUsername, password: newPassword };
    setAdminData(newCredentials);
    localStorage.setItem('adminCredentials', JSON.stringify(newCredentials));
  };

  return (
    <AdminContext.Provider value={{
      isAuthenticated,
      login,
      logout,
      updateCredentials,
      adminData
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};