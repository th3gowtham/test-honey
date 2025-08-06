import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/all.min.css";
import "../styles/bootstrap.min.css";
import "../styles/swiper-bundle.min.css";
import "../styles/main.css";
import img2r from "../assets/2r.png";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { useAuth } from "../context/AuthContext";
import App from "../App";
const Product = () => {
  const { user, userName, currentUser } = useAuth();

  // For Chat App
  const navigate = useNavigate();
  const handleApp = () => {
    navigate("/chat");
  }


  return (
    <>

      <nav aria-label="breadcrumb" className="breadcrumb-section position-relative">
        <div className="position-absolute top-50 start-50 translate-middle">
          {/* <h2 className="text-center display-3 text-white">Page Under Construction</h2> */}
          <button
            onClick={handleApp}
            className="bg-black text-white px-6 py-2 rounded-full text-lg font-medium shadow-md hover:bg-cyan-500 hover:scale-105 transition-all duration-300"
          >
            Chat App
          </button>

        </div>
      </nav>

    </>
  );
};

export default Product;


