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

const Login = ({ onClose }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [rememberMe, setRememberMe] = useState(true);
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", name: "" });

  const closeModal = () => {
    if (onClose) onClose();
    else if (window.history.length > 2) navigate(-1);
    else navigate('/');
  };

  // Google login (unchanged)
  const loginclick = async () => {
    try {
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      const result = await signInWithPopup(auth, googleprovider);
      const idToken = await result.user.getIdToken();
      await axios.post('http://localhost:5000/api/auth/google-login', { idToken, rememberMe }, { withCredentials: true });
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
      await axios.post('http://localhost:5000/api/auth/google-login', { idToken, rememberMe }, { withCredentials: true });
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
      await axios.post('http://localhost:5000/api/auth/google-login', { idToken, rememberMe }, { withCredentials: true });
      await login();
      closeModal();
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgb(122 119 119 / 45%)', zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        background: '#fafbfc', color: '#00394f', borderRadius: '24px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.18)', padding: '2.5rem 2rem 2rem 2rem',
        minWidth: 340, maxWidth: 360, position: 'relative', textAlign: 'center', border: '2px solid  #00394f'
      }}>
        <button
          onClick={closeModal}
          style={{
            position: 'absolute', top: 16, right: 16, background: 'none',
            border: 'none', fontSize: 22, color: ' #00394f', cursor: 'pointer', fontWeight: 'bold'
          }}
          aria-label="Close"
        >×</button>
        <h1 style={{
          color: ' #00394f', fontWeight: 700, marginBottom: 24, fontSize: '2rem'
        }}>{isRegister ? "Create Account" : "Log in"}</h1>
        <div style={{ marginBottom: 24 }}>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={e => setRememberMe(e.target.checked)}
            id="rememberMe"
            style={{ accentColor: ' #00394f', marginRight: 8 }}
          />
          <label htmlFor="rememberMe" style={{ color: '#00394f', fontWeight: 500 }}>
            Remember me on this device
          </label>
        </div>
        <form onSubmit={isRegister ? handleEmailRegister : handleEmailLogin}>
          {isRegister && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              style={{ width: "100%", marginBottom: 12, padding: 8 }}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: 12, padding: 8 }}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: 12, padding: 8 }}
            required
          />
          <button
            type="submit"
            style={{
              background: 'linear-gradient(90deg,  #00394f 60%, #fafbfc 100%)',
              color: 'white', fontWeight: 700, border: 'none', borderRadius: '999px',
              padding: '12px 32px', fontSize: '1.1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              cursor: 'pointer', transition: 'background 0.2s', marginTop: 16, width: "100%"
            }}
          >
            {isRegister ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <div style={{ margin: "16px 0" }}>or</div>
        <button
          onClick={loginclick}
          style={{
            background: '#fff', color: '#00394f', fontWeight: 700, border: '1px solid #00394f',
            borderRadius: '999px', padding: '12px 32px', fontSize: '1.1rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)', cursor: 'pointer', transition: 'background 0.2s', width: "100%"
          }}
        >
          Continue with Google
        </button>
        <div style={{ marginTop: 16 }}>
          {isRegister ? (
            <>Already have an account? <span style={{ color: "#00394f", cursor: "pointer" }} onClick={() => setIsRegister(false)}>Log in</span></>
          ) : (
            <>New user? <span style={{ color: "#00394f", cursor: "pointer" }} onClick={() => setIsRegister(true)}>Register Now</span></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
