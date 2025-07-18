
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Always listen to Firebase auth state
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        // Optionally, set userRole and userName from sessionStorage or fetch from backend
      } else {
        setUser(null);
        setUserRole(null);
        setUserName(null);
      }
      setLoading(false); // Auth state is now known
    });

    // Optionally, load role/name from sessionStorage for display
    const role = sessionStorage.getItem('userRole');
    const name = sessionStorage.getItem('userName');
    if (role && name) {
      setUserRole(role);
      setUserName(name);
    }

    return () => unsubscribe();
  }, []);

  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('userName');
  };

  return (
    <AuthContext.Provider value={{ 
      user,
      userRole, 
      userName, 
      
      setUserRole, 
      setUserName,
      login,
      logout,
      
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
