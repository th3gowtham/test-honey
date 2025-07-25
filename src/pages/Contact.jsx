import React from "react";
import { Link } from "react-router-dom";
import "../styles/all.min.css";
import "../styles/bootstrap.min.css";
import "../styles/swiper-bundle.min.css";
import "../styles/main.css";
import img2r from "../assets/2r.png";
import { FaEnvelope, FaPhone, FaLocationDot, FaClock, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { useAuth } from "../context/AuthContext";

const Contact = () => {
  const { user, userName, currentUser } = useAuth();
  
  return (
  <>
   
    <nav aria-label="breadcrumb" className="breadcrumb-section position-relative">
      <div className="position-absolute top-50 start-50 translate-middle">
        <h2 className="text-center display-3 text-white">Contact Us</h2>
      </div>
    </nav>
    <form className="contact-us">
      <div className="container">
        <div className="main-heading text-center">
          <span className="text-uppercase position-relative d-inline-block px-2">Get in touch</span>
          <h2 className="fw-bold my-3">Contact Us For Any Query</h2>
        </div>
        <div className="row row-cols-1 row-cols-lg-2">
          <div className="d-flex align-items-center gap-4 py-3">
            <div className="icon">
              <FaEnvelope className="p-3 text-white rounded-circle" />
            </div>
            <div className="content">
              <div className="h5 fw-bold">Email</div>
              <span className="text-muted">thehoneybeelearning@gmail.com</span>
            </div>
          </div>
          <div className="d-flex align-items-center gap-4 py-3">
            <div className="icon">
              <FaPhone className="p-3 text-white rounded-circle" />
            </div>
            <div className="content">
              <div className="h5 fw-bold">Phone</div>
              <span className="text-muted">+91 88704 01288</span>
            </div>
          </div>
          <div className="d-flex align-items-center gap-4 py-3">
            <div className="icon">
              <FaLocationDot className="p-3 text-white rounded-circle" />
            </div>
            <div className="content">
              <div className="h5 fw-bold">Address</div>
              <span className="text-muted">101 Mandapam Street, Erode, Tamil Nadu</span>
            </div>
          </div>
          <div className="d-flex align-items-center gap-4 py-3">
            <div className="icon">
              <FaClock className="p-3 text-white rounded-circle" />
            </div>
            <div className="content">
              <div className="h5 fw-bold">Opening Hours</div>
              <span className="text-muted">
                <span className="fw-bold">Sunday - Friday :</span>
                08:00 AM - 05:00 PM
              </span>
            </div>
          </div>
        </div>
      </div>
    </form>
    <footer>
      <div className="container text-white">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
          <div className="col p-3">
            <div className="box">
              <Link className="display-5 fw-bold text-decoration-none text-white" to="/">The Honeybee Learning</Link>
              <p className="my-3">
                Our team of passionate educators and experts are dedicated to crafting innovative and effective learning solutions that cater to the diverse needs of our students. We strive to create a warm, inclusive, and supportive community that encourages children to ask questions, think critically, and dream big.
              </p>
              <ul className="list-unstyled mb-0 p-0 d-flex gap-2">
                <li>
                  <a href="https://www.facebook.com/share/1Fda1AeJ9o/" aria-label="facebook-icon">
                    <FaFacebookF className="text-white border rounded-circle p-2" />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/thehoneybeelearning?igsh=ZmhvNXFoeGtpNGV0" aria-label="instagram-icon">
                    <FaInstagram className="text-white border rounded-circle p-2" />
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/the-honey-bee-learning-006512370/" aria-label="linkedin-icon">
                    <FaLinkedinIn className="text-white border rounded-circle p-2" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col p-3">
            <div className="box">
              <div className="title fw-bold h4">Get In Touch</div>
              <div className="email d-flex mt-3 gap-3">
                <div className="flex-shrink-0">
                  <i className="icon fa-solid fa-envelope fa-xl"></i>
                </div>
                <div className="flex-grow-1">
                  <div className="h4">Email</div>
                  <div>thehoneybeelearning@gmail.com</div>
                </div>
              </div>
              <div className="phone d-flex mt-3 gap-3">
                <div className="flex-shrink-0">
                  <i className="icon fa-solid fa-phone fa-xl"></i>
                </div>
                <div className="flex-grow-1">
                  <div className="h4">Phone</div>
                  <div>+91 88704 01288</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col p-3">
            <div className="box">
              <div className="title fw-bold h4">Quick Links</div>
              <div className="links">
                <Link to="/" className="d-block text-decoration-none text-white mt-2 px-4 position-relative">Home</Link>
                <Link to="/about" className="d-block text-decoration-none text-white mt-2 px-4 position-relative">About Us</Link>
                <Link to="/classes" className="d-block text-decoration-none text-white mt-2 px-4 position-relative">Our Classes</Link>
                <Link to="/teachers" className="d-block text-decoration-none text-white mt-2 px-4 position-relative">Our Teachers</Link>
                <Link to="/product" className="d-block text-decoration-none text-white mt-2 px-4 position-relative">Products</Link>
                <Link to="/contact" className="d-block text-decoration-none text-white mt-2 px-4 position-relative">Contact Us</Link>
              </div>
            </div>
          </div>
          <div className="col p-3">
            <div className="box">
              <div className="title fw-bold h4">Newsletter</div>
              <form onSubmit={e => e.preventDefault()}>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="form-control shadow-none fs-5 my-3" 
                  defaultValue={userName || currentUser?.displayName || ''}
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="form-control shadow-none fs-5 my-3" 
                  defaultValue={user?.email || currentUser?.email || ''}
                />
                <input type="submit" value="Submit Now" className="form-control shadow-none fs-5 my-3 rounded-pill border-0 text-white" />
              </form>
            </div>
          </div>
        </div>
        <div className="copy-right text-center border-top">
          &copy;{' '}
          <a href="#" className="text-decoration-none">
            <span>The Honeybee Learning</span>
          </a>{' '}
          All Rights Reserved
        </div>
      </div>
    </footer>
  </>
  );
};

export default Contact;