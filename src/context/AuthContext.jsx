import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialUser } from '../data/userMockData';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('foodbari_user_session');
    return saved ? JSON.parse(saved) : initialUser;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const saved = localStorage.getItem('foodbari_is_authenticated');
    return saved ? JSON.parse(saved) : true; // Default true for frictionless UI exploration, session updated on login/logout
  });

  useEffect(() => {
    localStorage.setItem('foodbari_user_session', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('foodbari_is_authenticated', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const login = (email, password) => {
    const updatedUser = {
      ...currentUser,
      email: email || currentUser.email
    };
    setCurrentUser(updatedUser);
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const updateUserProfile = (newDetails) => {
    setCurrentUser(prev => ({
      ...prev,
      ...newDetails
    }));
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAuthenticated,
      login,
      logout,
      updateUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
