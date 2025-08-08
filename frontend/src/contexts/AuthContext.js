import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers } from '../mock';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (username, password) => {
    const user = mockUsers.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return { success: true };
    }
    return { success: false, error: 'Nom d\'utilisateur ou mot de passe incorrect.' };
  };

  const register = (userData) => {
    const existingUser = mockUsers.find(u => u.username === userData.username || u.email === userData.email);
    if (existingUser) {
      return { success: false, error: 'Nom d\'utilisateur ou email déjà utilisé.' };
    }
    
    const newUser = {
      id: mockUsers.length + 1,
      ...userData,
      photo: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 10000)}?w=150&h=150&fit=crop&crop=face`
    };
    
    mockUsers.push(newUser);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateProfile = (updatedData) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updatedData };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      // Update in mock data
      const userIndex = mockUsers.findIndex(u => u.id === currentUser.id);
      if (userIndex !== -1) {
        mockUsers[userIndex] = updatedUser;
      }
      
      return { success: true };
    }
    return { success: false, error: 'Utilisateur non connecté' };
  };

  const value = {
    currentUser,
    isLoading,
    login,
    register,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};