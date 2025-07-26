import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Classes from "./pages/Classes";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Pg from "./pages/Pg";
import Teachers from "./pages/Teachers";
import Product from "./pages/Product";
import PlogDetails from "./pages/PlogDetails";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import ChatApp from './ChatApp' // chat app
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import Footer from './components/Footer';

// Import global styles if needed
// import "./styles/main.css";

function AppContent() {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();

  const isChatRoute = location.pathname.startsWith('/chat');
  
  useEffect(() => {
    AOS.init({ once: true });
  }, []);
  
  return (
    <>
      <Header onLoginClick={() => setShowLogin(true)} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/pg" element={<Pg />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/product" element={<Product />} />
        <Route path="/plog_details" element={<PlogDetails />} />
        <Route path="/chat" element={<ChatApp />} />  // chat app
      
      </Routes>
      <Footer />
      {showLogin && (
        <Login onClose={() => setShowLogin(false)} />
      )}
    </Router>
  );
}

export default App;
