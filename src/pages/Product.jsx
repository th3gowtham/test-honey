import React from "react";
import { Link } from "react-router-dom";
import "../styles/all.min.css";
import "../styles/bootstrap.min.css";
import "../styles/swiper-bundle.min.css";
import "../styles/main.css";
import img2r from "../assets/2r.png";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { useAuth } from "../context/AuthContext";

const Product = () => {
  const { user, userName, currentUser } = useAuth();
  
  return (
  <>
  
    <nav aria-label="breadcrumb" className="breadcrumb-section position-relative">
      <div className="position-absolute top-50 start-50 translate-middle">
        <h2 className="text-center display-3 text-white">Page Under Construction</h2>
      </div>
    </nav>
    
  </>
  );
};

export default Product;