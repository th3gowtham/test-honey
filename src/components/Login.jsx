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

const eyeIcons = {
  open: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="#127d8e"
      className="eye-icon"
      style={{ width: 20, height: 20, position: 'absolute', top: 5, right: 0 }}
    >
      <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
      <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
    </svg>
  ),
  closed: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="#127d8e"
      className="eye-icon"
      style={{ width: 20, height: 20, position: 'absolute', top: 5, right: 0 }}
    >
      <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
      <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
      <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
    </svg>
  )
};

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
  const [showPassword, setShowPassword] = useState(false);
  
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
      const email = form.email.trim().toLowerCase();
      const { password, name } = form;
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
      const email = form.email.trim().toLowerCase();
      const { password } = form;
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
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              style={{ width: "100%", padding: 10, borderRadius: 4, border: '1px solid #ddd', fontSize: '0.9rem' }}
              required
            />
          </div>
          <div style={{ marginBottom: 16, position: 'relative' }}>
            <label style={{ display: 'block', marginBottom: 6, fontSize: '0.9rem', color: '#333', fontWeight: 500 }}>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              style={{ width: "100%", padding: '10px 38px 10px 10px', borderRadius: 4, border: '1px solid #ddd', fontSize: '0.9rem' }}
              required
            />
            <button
              type="button"
              className={"checkbox-button" + (showPassword ? " open" : "")}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              tabIndex={0}
              onClick={() => setShowPassword(v => !v)}
              style={{
                display: 'inline-flex',
                position: 'absolute',
                top: '50%',
                right: 12,
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                background: 'rgb(111, 16, 16)',
                border: 'none',
                padding: 0,
                margin: 0,
                outline: 'none',
                alignItems: 'center',
                zIndex: 2,
              }}
            >
              {showPassword ? eyeIcons.closed : eyeIcons.open}
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            {!isRegister && (
              <>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    id="rememberMe"
                    style={{
                      width: 16,
                      height: 15,
                      border: '2px solidrgb(111, 16, 16)',
                      borderRadius: 4,
                      marginRight: 8,
                      cursor: 'pointer',
                      verticalAlign: 'middle',
                      // Do NOT use appearance: 'none' or background
                    }}
                  />
                  <label htmlFor="rememberMe" style={{ color: '#666', fontSize: '0.9rem', verticalAlign: 'middle' }}>
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
