import React from 'react';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { auth, db } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { addCurrentUserToFirestore, initializeSampleUsers } from '../utils/initializeUsers';
import { signOut } from "firebase/auth";

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
    
    const apiUrl = 'https://thehoneybee-gl4r.onrender.com';
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
        // 401 means "not logged in" and is expected on initial load if no session exists.
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

  // Only check /api/auth/me if we think the user might be logged in
  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      refreshUser();
    } else {
      setLoading(false); // Not loading, not logged in
    }
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
    localStorage.setItem('isLoggedIn', 'true'); // Set flag on login
    const p = refreshUser();
    broadcastAuthEvent();
    return p;
  };
  const logout = async () => {
    setLoading(true);
    try {
      // 1. Firebase sign out
      await signOut(auth);

      // 2. Backend logout
      const apiUrl = 'https://thehoneybee-gl4r.onrender.com';
      await axios.post(`${apiUrl}/api/auth/logout`, {}, { withCredentials: true });

      // 3. Reset user state
      setUser(null);
      setUserRole(null);
      setUserName(null);
      setCurrentUser && setCurrentUser(null); // Only if you have this

      // 4. Broadcast event (optional)
      broadcastAuthEvent && broadcastAuthEvent();
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setLoading(false);
    }
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
