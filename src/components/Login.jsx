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
      const res = await axios.post('https://thehoneybee.onrender.com/api/auth/google-login', { idToken });
      console.log("Login response:", res.data);

      const { role, name } = res.data;
      alert(`Welcome ${role}, ${name}`);
      setUserRole(role);
      setUserName(name);
      sessionStorage.setItem("userRole", role);
      sessionStorage.setItem("userName", name);
      closeModal();
    } catch (err) {
      alert("Login failed: " + err);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '16px',
        width: '90%',
        maxWidth: '400px',
        padding: '2rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        position: 'relative',
        textAlign: 'center'
      }}>
        <button
          onClick={closeModal}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: '#555'
          }}
        >×</button>

        <h1 style={{
          marginBottom: '0.5rem',
          color: '#333',
          fontSize: '1.2rem', // Smaller size
          fontWeight: 600
        }}>
          Log in
        </h1>

        <p style={{ marginBottom: '1.5rem', color: '#666' }}>
          New user?{" "}
          <span
            onClick={loginclick} // 🚀 Added onClick to Register Now to trigger Google login
            style={{
              color: '#007bff',
              cursor: 'pointer',
              textDecoration: 'underline',
              fontWeight: 500
            }}
          >
            Register Now
          </span>
        </p>

        <button
          onClick={loginclick}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            background: 'linear-gradient(90deg, #4285F4, #34A853)', // Google brand colors
            color: '#fff',
            border: 'none',
            borderRadius: '50px',
            padding: '12px 20px',
            marginBottom: '1.2rem',
            fontWeight: 600,
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(66, 133, 244, 0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(66, 133, 244, 0.4)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(66, 133, 244, 0.3)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            style={{
              width: '22px',
              height: '22px',
              marginRight: '12px',
              backgroundColor: '#fff',
              borderRadius: '50%',
              padding: '2px'
            }}
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
