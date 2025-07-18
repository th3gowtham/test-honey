// import { useState } from 'react';
// import { signInWithPopup, setPersistence, browserLocalPersistence, browserSessionPersistence } from 'firebase/auth';
// import { auth, googleprovider } from '../services/firebase';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Login = ({ onClose }) => {
//   const navigate = useNavigate();
//   const { setUserRole, setUserName } = useAuth();
//   const [rememberMe, setRememberMe] = useState(true);

//   // implemted for Unified close function for both X and successful login
//   const closeModal = () => {
//     if (onClose) {
//       onClose();
//     } else if (window.history.length > 2) {
//       navigate(-1);
//     } else {
//       navigate('/');
//     }
//   };

//   const loginclick = async () => {
//     try {
//       await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
//       const result = await signInWithPopup(auth, googleprovider);
//       const idToken = await result.user.getIdToken();
//       const res = await axios.post('https://thehoneybee.onrender.com/api/auth/google-login', { idToken }); //http://localhost:5000/api/auth/google-login 
//       console.log("Login response:", res.data);

//       const { role, name } = res.data;
//       alert(`Welcome ${role}, ${name}`);
//       setUserRole(role);
//       setUserName(name);
//       sessionStorage.setItem("userRole", role);
//       sessionStorage.setItem("userName", name);
//       closeModal(); 


//     } catch (err) {
//       alert("Login failed: " + err);
//     }
//   };

//   return (
//     <div style={{
//       position: 'fixed',
//       top: 0, left: 0, right: 0, bottom: 0,
//       background: 'rgb(122 119 119 / 45%)',
//       zIndex: 9999,
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center'
//      }}>
//       <div style={{
//         background: '#fafbfc',
//         color: '#00394f',
//         borderRadius: '24px',
//         boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
//         padding: '2.5rem 2rem 2rem 2rem',
//         minWidth: 340,
//         maxWidth: 360,
//         position: 'relative',
//         textAlign: 'center',
//         border: '2px solid  #00394f'
//       }}>
//         <button
//           onClick={closeModal}
//           style={{
//             position: 'absolute',
//             top: 16,
//             right: 16,
//             background: 'none',
//             border: 'none',
//             fontSize: 22,
//             color: ' #00394f',
//             cursor: 'pointer',
//             fontWeight: 'bold'
//           }}
//           aria-label="Close"
//         >×</button>
//         <h1 style={{
//           color: ' #00394f',
//           fontWeight: 700,
//           marginBottom: 24,
//           fontSize: '2rem'
//         }}>Login</h1>
//         <div style={{ marginBottom: 24 }}>
//           <input
//             type="checkbox"
//             checked={rememberMe}
//             onChange={e => setRememberMe(e.target.checked)}
//             id="rememberMe"
//             style={{ accentColor: ' #00394f', marginRight: 8 }}
//           />
//           <label htmlFor="rememberMe" style={{ color: '#00394f', fontWeight: 500 }}>
//             Remember me on this device
//           </label>
//         </div>
//         <button
//           onClick={loginclick}
//           style={{
//             background: 'linear-gradient(90deg,  #00394f 60%, #fafbfc 100%)',
//             color: 'white',
//             fontWeight: 700,
//             border: 'none',
//             borderRadius: '999px',
//             padding: '12px 32px',
//             fontSize: '1.1rem',
//             boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
//             cursor: 'pointer',
//             transition: 'background 0.2s',
//             marginTop: 16
//           }}
//         >
//           Login with Google
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useState } from 'react';
import { signInWithPopup, setPersistence, browserLocalPersistence, browserSessionPersistence } from 'firebase/auth';
import { auth, googleprovider } from '../services/firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import React from 'react';


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
