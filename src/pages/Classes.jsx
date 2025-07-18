import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import CourseCard from "../components/CourseCard";
import EnquiryModal from "../components/EnquiryModal";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import "swiper/css";
import "../styles/all.min.css";
import "../styles/bootstrap.min.css";
import "../styles/swiper-bundle.min.css";
import "../styles/main.css";
import img2r from "../assets/2r.png";
import phoni from "../assets/phoni.jpeg";
import gram from "../assets/gram.jpg";
import ha from "../assets/ha.jpg";
import portfolio3 from "../assets/portfolio-3.jpg";
import math from "../assets/math.jpeg";
import s from "../assets/s.jpeg";
import cod from "../assets/cod.jpg";
import com from "../assets/com.jpeg";
import art from "../assets/art.jpeg";
import web from "../assets/web.jpg";
import game from "../assets/game.png";
import dm from "../assets/dm.jpg";
import ai from "../assets/ai.jpg";
import des from "../assets/des.png";
import ani from "../assets/ani.png";
import { usePayment } from "../context/PaymentContext";


const courses = [
  {
    imgSrc: phoni,
    title: "Jolly Phonics",
    description: "A fun, interactive approach to teaching children essential reading and writing skills through phonics, blending, and engaging activities.",
    age: "3+ Years",
    seats: "Upto 5 Kids per Batch",
    duration: "9 Months",
    fee: 4999,
  },
  {
    imgSrc: gram,
    title: "Jolly Grammar",
    description: "A fun, interactive approach to teaching children essential grammar skills through phonics, blending, and engaging activities.",
    age: "4+ Years",
    seats: "Upto 5 Kids per Batch",
    duration: "1 Year",
    fee: 5999,
  },
  {
    imgSrc: ha,
    title: "Spoken English",
    description: "A fun and interactive spoken English class for building confidence through engaging activities, storytelling, and real-life conversations!",
    age: "6+ Years",
    seats: "Upto 5 Kids per Batch",
    duration: "4 Months",
    fee: 3999,
  },
  {
    imgSrc: portfolio3,
    title: "Handwriting Class (English)",
    description: "A focused and engaging class that helps children improve their handwriting skills through structured practice and creative activities, promoting neatness and clarity.",
    age: "3+ Years",
    seats: "Upto 5 Kids per Batch",
    duration: "4 Months",
    fee :3999,
  },
  {
    imgSrc: math,
    title: "Math Class",
    description: "An engaging and interactive approach to help children develop strong mathematical skills through fun lessons and engaging activities.",
    age: "5+ Years",
    seats: "Upto 5 Kids per Batch",
    duration: "12 Months",
    fee :3999,
  },
  {
    imgSrc: s,
    title: "Tamil Phonics",
    description: "An engaging and interactive method to help children learn Tamil sounds, pronunciation, and reading skills through ancient teaching methods.",
    age: "5+ Years",
    seats: "Upto 5 Kids per Batch",
    duration: "5 Months",
    fee :3999,
  },
  {
    imgSrc: portfolio3,
    title: "Tamil Handwriting Class",
    description: "A focused and engaging class that helps children improve their tamil handwriting skills through structured practice and creative activities, promoting neatness and clarity.",
    age: "5+ Years",
    seats: "Upto 5 Kids per Batch",
    duration: "4 Months",
    fee :3999,
  },
  {
    imgSrc: cod,
    title: "Computer Basics",
    description: "A fun and interactive way for children to learn computer basics, including typing, using software, and safe internet practices!",
    age: "6+ Years",
    seats: "Upto 4 Kids per Batch",
    duration: "3 Months",
    fee :3999,
  },
  {
    imgSrc: com,
    title: "Programming for Beginners & Kids",
    description: "An engaging and interactive way for children and beginners to learn programming, develop problem-solving skills, and create their own digital projects!",
    age: "8+ Years",
    seats: "Upto 4 Kids per Batch",
    duration: "6 Months",
    fee :3999,
  },
  {
    imgSrc: art,
    title: "Mandala & Warli Art Class",
    description: "A dynamic and creative class that encourages children to explore various art forms, develop their artistic skills, and express their imagination through hands-on projects.",
    age: "8+ Years",
    seats: "Upto 5 per Batch",
    duration: "3 Months",
    fee :3999,
  },

];

const advancedCourses = [
  {
    imgSrc: math,
    title: "Mathematics",
    description: "Fun and engaging math classes for children to build a strong foundation in numbers, shapes, and problem-solving.",
    age: "4+ Years",
    seats: "Upto 5 Kids per Batch",
    duration: "1 Year",
    fee: 6999,
  },
  {
    imgSrc: s,
    title: "Science",
    description: "Interactive science classes for children to explore the world around them, from basic concepts to advanced experiments.",
    age: "5+ Years",
    seats: "Upto 5 Kids per Batch",
    duration: "1 Year",
    fee: 7999,
  },
  {
    imgSrc: cod,
    title: "Coding",
    description: "Introduction to programming for children, teaching them the basics of coding and problem-solving through fun activities.",
    age: "7+ Years",
    seats: "Upto 5 Kids per Batch",
    duration: "1 Year",
    fee: 8999,
  },
  {
    imgSrc: com,
    title: "Communication Skills",
    description: "Enhance your child's communication skills through engaging activities and interactive sessions.",
    age: "4+ Years",
    seats: "Upto 5 Kids per Batch",
    duration: "1 Year",
    fee: 5999,
  },
  {
    imgSrc: art,
    title: "Art & Craft",
    description: "Creative and artistic classes for children to explore their imagination and develop their artistic skills.",
    age: "3+ Years",
    seats: "Upto 5 Kids per Batch",
    duration: "1 Year",
    fee: 4999,
  },
  {
    imgSrc: web,
    title: "Web Development",
    description: "Introduction to web development for children, teaching them the basics of HTML, CSS, and JavaScript.",
    age: "10+ Years",
    seats: "Upto 5 Kids per Batch",
    duration: "1 Year",
    fee: 12999,
  },
  {
    imgSrc: game,
    title: "Game Development",
    description: "Fun and engaging game development classes for children to learn about game design and programming.",
    age: "10+ Years",
    seats: "Upto 5 Kids per Batch",
    duration: "1 Year",
    fee: 11999,
  },
  {
    imgSrc: dm,
    title: "Digital Marketing",
    description: "Introduction to digital marketing for children, teaching them about social media, SEO, and online advertising.",
    age: "12+ Years",
    seats: "Upto 5 Kids per Batch",
    duration: "1 Year",
    fee: 10999,
  },
  {
    imgSrc: ai,
    title: "Artificial Intelligence",
    description: "Introduction to artificial intelligence for children, teaching them about machine learning and neural networks.",
    age: "12+ Years",
    seats: "Upto 5 Kids per Batch",
    duration: "1 Year",
    fee: 13999,
  },
  {
    imgSrc: des,
    title: "Graphic Design",
    description: "Introduction to graphic design for children, teaching them about color theory, typography, and basic design principles.",
    age: "10+ Years",
    seats: "Upto 5 Kids per Batch",
    duration: "1 Year",
    fee: 9999,
  },
  {
    imgSrc: ani,
    title: "Animation",
    description: "Introduction to animation for children, teaching them about keyframe animation and basic animation principles.",
    age: "10+ Years",
    seats: "Upto 5 Kids per Batch",
    duration: "1 Year",
    fee: 8999,
  },
];

const Classes = () => {
  const { user } = useAuth();
  const { startPayment, loading } = usePayment();
  const [showLoginNeeded, setShowLoginNeeded] = useState(false);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Handler for "Enroll Now" button
  const handleApply = (course) => {
    if (!user || !user.email) {
      setShowLoginNeeded(true);
      setTimeout(() => setShowLoginNeeded(false), 2000);
      return;
    }
    setSelectedCourse(course);
    setShowEnquiryModal(true);
  };

  // Modal handlers
  const handleEnquirySubmit = () => {
    setShowEnquiryModal(false);
    if (selectedCourse) startPayment(selectedCourse);
  };
  const handleSkipEnquiry = () => {
    setShowEnquiryModal(false);
    if (selectedCourse) startPayment(selectedCourse);
  };
  const handleCloseModal = () => {
    setShowEnquiryModal(false);
    setSelectedCourse(null);
  };

  return (
    <>
      <nav aria-label="breadcrumb" className="breadcrumb-section position-relative">
        <div className="position-absolute top-50 start-50 translate-middle">
          <h2 className="text-center display-3 text-white">Our Classes</h2>
        </div>
      </nav>
      <div className="popular-classes">
        <div className="container">
          <div className="main-heading text-center">
            <span className="text-uppercase position-relative d-inline-block px-2">Popular Classes</span>
            <h2 className="fw-bold my-3">Classes We Provide</h2>
          </div>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
            {courses.map((course, idx) => (
              <CourseCard
                key={idx}
                {...course}
                onApply={() => handleApply(course)}
                loading={loading && selectedCourse && selectedCourse.title === course.title}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Advanced Courses Section */}
      <div className="main-heading text-center">
        <span className="text-uppercase position-relative d-inline-block px-2">Advanced Courses</span>
        <h2 className="fw-bold my-3">Technical & Non-Tech Classes </h2>
      </div>
      <div className="container mb-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
          {advancedCourses.map((course, idx) => (
            <CourseCard
              key={idx}
              {...course}
              onApply={() => handleApply(course)}
              loading={loading && selectedCourse && selectedCourse.title === course.title}
            />
          ))}
        </div>
      </div>
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
                  <input type="text" placeholder="Your Name" className="form-control shadow-none fs-5 my-3" />
                  <input type="email" placeholder="Your Email" className="form-control shadow-none fs-5 my-3" />
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
      <EnquiryModal
        show={showEnquiryModal}
        onClose={handleCloseModal}
        onSubmit={handleEnquirySubmit}
        onSkip={handleSkipEnquiry}
        selectedCourse={selectedCourse?.title}
      />
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
          Please login to enroll in the course
        </div>
      )}
    </>
  );
};

export default Classes;