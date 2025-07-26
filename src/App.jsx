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
import ForgotPassword from "./components/ForgotPassword"; // retained from your original
import ChatApp from './ChatApp';
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "./components/Header";
import Footer from './components/Footer';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// App inner content
function AppContent({ showLogin, setShowLogin }) {
  const location = useLocation();

  const showFooterPaths = [
    "/", "/about", "/classes", "/contact", "/gallery",
    "/pg", "/teachers", "/product", "/plog_details"
  ];

  const showFooter = showFooterPaths.includes(location.pathname);
  const isChatRoute = location.pathname.startsWith('/chat');

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
        <Route path="/chat" element={<ChatApp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>

      {!isChatRoute && showFooter && <Footer />}
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
    </>
  );
}

function App() {
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  return (
    <Router>
      <AppContent showLogin={showLogin} setShowLogin={setShowLogin} />
    </Router>
  );
}

export default App;

