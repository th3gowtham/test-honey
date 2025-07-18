// Header component for the main navigation bar
// This handles the top navigation, user authentication state, and various interactive elements
import { useLocation } from 'react-router-dom'; // Import useLocation
import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';
import img2r from "../assets/2r.png";
import EnquiryModal from './EnquiryModal';
import "./Header.css"
import React from 'react';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const Header = ({ onLoginClick }) => {         // Main Header component that receives a callback for login button clicks
    const location = useLocation(); // 👈 Get the current route

  // Hide header when on /chat route
  if (location.pathname.startsWith('/chat')) {
    return null;
  }

  const [isLoading, setIsLoading] = useState(true);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [showLoginNeeded, setShowLoginNeeded] = useState(false);
  const navigate = useNavigate();

  const { user, loading, userRole, userName, login, logout } = useAuth();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        login(currentUser);
      } else {
        logout();
      }
      setIsLoading(false);
    });

    return () => unsub();
  }, [login, logout]);

  const collapseMobileNavbar = () => {
    if (window.innerWidth <= 991) {
      document.getElementById('navbarToggleBtn').click(); // Always trigger toggle
    }
  };


  const handleLogout = async () => {
    try {
      await signOut(auth);
      logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };



  return (
    // Main navigation bar with light background and shadow, sticky positioning
    <nav className="navbar navbar-expand-lg bg-light shadow-lg sticky-top custom-navbar">
      <div className="container-fluid px-3">
        {/* Logo and brand section */}
        <div className="d-flex align-items-center">
          {/* Company logo that links to home page */}
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src={img2r} width="200" height="70" alt="logo" className="me-2" />

          </Link>
          {/* Welcome message for logged in users - hidden on mobile */}
          <span className=" ms-3 d-none d-lg-inline">
            {userRole ? `Welcome ${userRole}, ${userName}` : 'No user logged in'}
          </span>
        </div>
        {/* Mobile hamburger menu button */}
        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          id="navbarToggleBtn"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Collapsible navigation menu */}
        <div className="collapse navbar-collapse mt-2 mt-lg-0" id="navbarSupportedContent">
          {/* Main navigation links */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item"><NavLink className="nav-link fw-bold text-black" to="/" end onClick={collapseMobileNavbar}>Home</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link fw-bold text-black" to="/about" onClick={collapseMobileNavbar}>About</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link fw-bold text-black" to="/classes" onClick={collapseMobileNavbar}>Classes</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link fw-bold text-black" to="/teachers" onClick={collapseMobileNavbar}>Teachers</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link fw-bold text-black" to="/product" onClick={collapseMobileNavbar}>Products</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link fw-bold text-black" to="/contact" onClick={collapseMobileNavbar}>Contact</NavLink></li>

          </ul>
          {/* Action buttons section - stacked on mobile, horizontal on desktop */}
          <div className="d-flex flex-column flex-lg-row gap-2 align-items-center ms-lg-3">

           

            {/* Direct link to join classes */}
            <Link to="/classes" className="main-link btn btn-lg rounded-pill px-4" onClick={collapseMobileNavbar}>Join Class</Link>
            {/* Conditional rendering based on authentication status - only show after Firebase auth is initialized */}
            {!loading && (
              <>
                {user ? (

                  <button
                    onClick={() => {
                      handleLogout();
                      collapseMobileNavbar();
                    }}
                          // It Show signout button if user is authenticated
                    className="main-link btn btn-lg rounded-pill px-4"
                  >
                    Sign Out
                  </button>
                ) : (

                  <button
                    onClick={()=>{onLoginClick();collapseMobileNavbar();}}              // Show login button if no user is authenticated
                    className="main-link btn btn-lg rounded-pill px-4"
                  >
                    Login
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Welcome message for mobile users - shown below the navbar */}
        <span className=" d-lg-none mt-2 ms-2">
          {userRole ? `Welcome ${userRole}, ${userName}` : 'No user logged in'}
        </span>

        {/* Temporary notification that appears when login is required */}
        {showLoginNeeded && (
          <div
            style={{
              position: 'fixed',
              top: '80px',
              right: '30px',
              background: '#fde7e9',
              color: '#dc3545',
              border: '1px solid #dc3545',
              borderRadius: '8px',
              padding: '1rem 2rem',
              zIndex: 2000,
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          >
            Login first !
          </div>
        )}
        {/* Enquiry modal component that appears when students click enquire */}
        <EnquiryModal show={showEnquiryModal} onClose={() => setShowEnquiryModal(false)} />
      </div>
    </nav>
  );
};

export default Header;
