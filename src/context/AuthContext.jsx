import React from 'react';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { auth, db } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { addCurrentUserToFirestore, initializeSampleUsers } from '../utils/initializeUsers';

const AuthContext = createContext();

export { AuthContext };

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize Firebase Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Add user to Firestore
        await addCurrentUserToFirestore();
        // Initialize sample users for testing
        await initializeSampleUsers();
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Fetch user info from backend, return promise for awaiting
  const refreshUser = useCallback(() => {
    setLoading(true);
    const apiUrl = import.meta.env.VITE_API_URL;
    return axios.get(`${apiUrl}/api/auth/me`, { withCredentials: true })
      .then(res => {
        // Log what is received from the backend
        console.log("[AuthContext] /api/auth/me response:", res.data);

        setUserRole(res.data.role);
        setUserName(res.data.name);
        setUser(res.data.user);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response && err.response.status !== 401) {
          // Only log unexpected errors, not 401
          console.error("[AuthContext] /api/auth/me error:", err);
        }
        setUser(null);
        setUserRole(null);
        setUserName(null);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  // Listen for cross-tab auth events
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'auth-event') {
        refreshUser();
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, [refreshUser]);

  // Broadcast to other tabs
  const broadcastAuthEvent = () => {
    localStorage.setItem('auth-event', Date.now().toString());
  };

  // Call this after login/logout/role change, return promise for awaiting
  const login = () => {
    const p = refreshUser();
    broadcastAuthEvent();
    return p;
  };
  const logout = () => {
    const p = refreshUser();
    broadcastAuthEvent();
    return p;
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
      loading,
      refreshUser,
      currentUser // Add Firebase currentUser to context
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
