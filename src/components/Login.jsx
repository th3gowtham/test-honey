import { useState } from 'react';
import { signInWithPopup, setPersistence, browserLocalPersistence, browserSessionPersistence } from 'firebase/auth';
import { auth, googleprovider } from '../services/firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = ({ onClose }) => {
  const navigate = useNavigate();
  const { setUserRole, setUserName } = useAuth();
  const [rememberMe, setRememberMe] = useState(true);

  // implemted for Unified close function for both X and successful login
  const closeModal = () => {
    if (onClose) {
      onClose();
    } else if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const loginclick = async () => {
    try {
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      const result = await signInWithPopup(auth, googleprovider);
      const idToken = await result.user.getIdToken();
      const res = await axios.post('http://localhost:5000/api/auth/google-login', { idToken });
      console.log("Login response:", res.data);

      const { role, name } = res.data;
      alert(`Welcome ${role}, ${name}`);
      setUserRole(role);
      setUserName(name);
      sessionStorage.setItem("userRole", role);
      sessionStorage.setItem("userName", name);
      closeModal(); 
     

    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgb(122 119 119 / 45%)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
     }}>
      <div style={{
        background: '#fafbfc',
        color: '#00394f',
        borderRadius: '24px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
        padding: '2.5rem 2rem 2rem 2rem',
        minWidth: 340,
        maxWidth: 360,
        position: 'relative',
        textAlign: 'center',
        border: '2px solid  #00394f'
      }}>
        <button
          onClick={closeModal}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'none',
            border: 'none',
            fontSize: 22,
            color: ' #00394f',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
          aria-label="Close"
        >×</button>
        <h1 style={{
          color: ' #00394f',
          fontWeight: 700,
          marginBottom: 24,
          fontSize: '2rem'
        }}>Login</h1>
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
        <button
          onClick={loginclick}
          style={{
            background: 'linear-gradient(90deg,  #00394f 60%, #fafbfc 100%)',
            color: 'white',
            fontWeight: 700,
            border: 'none',
            borderRadius: '999px',
            padding: '12px 32px',
            fontSize: '1.1rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            cursor: 'pointer',
            transition: 'background 0.2s',
            marginTop: 16
          }}
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
