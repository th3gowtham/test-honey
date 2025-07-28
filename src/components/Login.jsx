import { useState } from 'react';
import {
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { auth, googleprovider } from '../services/firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import React from 'react';
import ForgotPassword from './ForgotPassword';

// Add global styles for autofill
const globalStyles = `
  input:-internal-autofill-selected { 
    background-color: azure !important; 
    color: black !important; 
  }
`;


const Login = ({ onClose }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [rememberMe, setRememberMe] = useState(true);
  const [isRegister, setIsRegister] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  
  // Apply global styles
  React.useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = globalStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const closeModal = () => {
    if (onClose) onClose();
    else if (window.history.length > 2) navigate(-1);
    else navigate('/');
  };

  // Google login
  const loginclick = async () => {
    try {
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      const result = await signInWithPopup(auth, googleprovider);
      const idToken = await result.user.getIdToken();
      const apiUrl = import.meta.env.VITE_API_URL;
      await axios.post(`${apiUrl}/api/auth/google-login`, { idToken, rememberMe }, { withCredentials: true });
      await login();
      closeModal();
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  // Email/password registration
  const handleEmailRegister = async (e) => {
    e.preventDefault();
    try {
      const { email, password, name } = form;
      if (!email || !password || !name) {
        alert("Please fill all fields.");
        return;
      }
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      const idToken = await userCredential.user.getIdToken();
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      await axios.post(`${apiUrl}/api/auth/google-login`, { idToken, rememberMe }, { withCredentials: true });
      await login();
      closeModal();
    } catch (err) {
      // **THE FIX IS HERE**
      // Check for the specific "email already in use" error code
      if (err.code === 'auth/email-already-in-use') {
        alert('This email address is already registered. Please try logging in instead.');
      } else {
        // For any other error, show the default message
        alert("Registration failed: " + err.message);
      }
    }
  };

  // Email/password login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = form;
      if (!email || !password) {
        alert("Please fill all fields.");
        return;
      }
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      const apiUrl ='http://localhost:5000';
      await axios.post(`${apiUrl}/api/auth/google-login`, { idToken, rememberMe }, { withCredentials: true });
      await login();
      closeModal();
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  return (
    <>
      {showForgotPassword ? (
        <ForgotPassword onClose={() => setShowForgotPassword(false)} />
      ) : (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgb(122 119 119 / 45%)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
      <div style={{
        background: '#fff', color: '#333', borderRadius: '8px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.18)', padding: '2rem',
        minWidth: 340, maxWidth: 400, position: 'relative', textAlign: 'left'
      }}>
        <button
          onClick={closeModal}
          style={{
            position: 'absolute', top: 16, right: 16, background: 'none',
            border: 'none', fontSize: 22, color: '#666', cursor: 'pointer', fontWeight: 'bold'
          }}
          aria-label="Close"
        >×</button>
        <h1 style={{
          color: '#333', fontWeight: 600, marginBottom: 16, fontSize: '1.5rem', textAlign: 'left'
        }}>{isRegister ? "Create Account" : "Log in"}</h1>
        
        {isRegister ? (
          <p style={{ marginBottom: 16, fontSize: '0.9rem', color: '#666' }}>
            Already have an account? <span style={{ color: "#127d8e", cursor: "pointer", fontWeight: 500 }} onClick={() => setIsRegister(false)}>Log in</span>
          </p>
        ) : (
          <p style={{ marginBottom: 16, fontSize: '0.9rem', color: '#666' }}>
            New user? <span style={{ color: "#127d8e", cursor: "pointer", fontWeight: 500 }} onClick={() => setIsRegister(true)}>Register Now</span>
          </p>
        )}

        {!isRegister && (
          <div style={{ marginBottom: 24 }}>
            <button
              onClick={loginclick}
              style={{
                background: '#fff', color: '#333', fontWeight: 500, border: '1px solid #ddd',
                borderRadius: '4px', padding: '10px', fontSize: '0.9rem', display: 'flex',
                alignItems: 'center', justifyContent: 'center', width: "100%", marginBottom: 12,
                cursor: 'pointer', transition: 'background 0.2s'
              }}
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: 18, height: 18, marginRight: 8 }} />
              Continue with Google
            </button>
          </div>
        )}

        <div style={{ textAlign: 'center', margin: '16px 0', position: 'relative' }}>
          <hr style={{ border: '0.5px solid #eee', margin: '10px 0' }} />
          <span style={{ position: 'absolute', top: '0', backgroundColor: '#fff', padding: '0 10px', color: '#666', fontSize: '0.9rem', transform: 'translateY(-50%) translateX(-50%)', left: '50%' }}>
            or
          </span>
        </div>

        <form onSubmit={isRegister ? handleEmailRegister : handleEmailLogin}>
          {isRegister && (
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 6, fontSize: '0.9rem', color: '#333', fontWeight: 500 }}>Username</label>
              <input
                type="text"
                name="name"
                placeholder="name"
                value={form.name}
                onChange={handleChange}
                style={{ width: "100%", padding: 10, borderRadius: 4, border: '1px solid #ddd', fontSize: '0.9rem' }}
                required
              />
            </div>
          )}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, fontSize: '0.9rem', color: '#333', fontWeight: 500 }}>Username or Email</label>
            <input
              type="email"
              name="email"
              placeholder="Username or Email"
              value={form.email}
              onChange={handleChange}
              style={{ width: "100%", padding: 10, borderRadius: 4, border: '1px solid #ddd', fontSize: '0.9rem' }}
              required
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, fontSize: '0.9rem', color: '#333', fontWeight: 500 }}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              style={{ width: "100%", padding: 10, borderRadius: 4, border: '1px solid #ddd', fontSize: '0.9rem' }}
              required
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            {!isRegister && (
              <>
                <div>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    id="rememberMe"
                    style={{ accentColor: '#127d8e', marginRight: 8 }}
                  />
                  <label htmlFor="rememberMe" style={{ color: '#666', fontSize: '0.9rem' }}>
                    Remember Me
                  </label>
                </div>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setShowForgotPassword(true);
                  }}
                  style={{ color: '#127d8e', textDecoration: 'none', fontSize: '0.9rem' }}
                >
                  Forgot password
                </a>
              </>
            )}
          </div>

          <button
            type="submit"
            style={{
              background: '#127d8e', color: 'white', fontWeight: 500, border: 'none', borderRadius: '4px',
              padding: '12px', fontSize: '1rem', width: "100%", cursor: 'pointer', transition: 'background 0.2s'
            }}
          >
            {isRegister ? "Sign Up" : "Sign In"}
          </button>
        </form>

      </div>
        </div>
      )}
    </>
  );
};

export default Login;
