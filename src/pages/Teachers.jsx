import React from "react";
import { Link } from "react-router-dom";
import "../styles/all.min.css";
import "../styles/bootstrap.min.css";
import "../styles/swiper-bundle.min.css";
import "../styles/main.css";
import img2r from "../assets/2r.png";
import p1 from "../assets/p1.jpg";
import p2 from "../assets/p2.jpg";
import p3 from "../assets/p3.jpg";
import p4 from "../assets/p4.jpg";
import p5 from "../assets/p5.jpg";
import p6 from "../assets/p6.jpg";
import p7 from "../assets/p7.jpg";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";

const Teachers = () => (
  <>
   
    <nav aria-label="breadcrumb" className="breadcrumb-section position-relative">
      <div className="position-absolute top-50 start-50 translate-middle">
        <h2 className="text-center display-3 text-white">Our Teachers</h2>
      </div>
    </nav>
    <div className="our-teachers">
      <div className="container">
        <div className="main-heading text-center">
          <span className="text-uppercase position-relative d-inline-block px-2">Our Teachers</span>
          <h2 className="fw-bold my-3">Meet Our Team</h2>
        </div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4">
          <div className="col p-3"><div className="item text-center"><div className="image position-relative"><img src={p2} className="img-fluid w-100 rounded-circle" alt="img" /></div><div className="fw-bold my-3 h4">Mrs.Akilandeswari ArunKumar</div><div className="fst-italic text-muted">Chief Educator</div></div></div>
          <div className="col p-3"><div className="item text-center"><div className="image position-relative"><img src={p4} className="img-fluid w-100 rounded-circle" alt="img" /></div><div className="fw-bold my-3 h4">Mrs.Suma Aleya John</div><div className="fst-italic text-muted">English Teacher</div></div></div>
          <div className="col p-3"><div className="item text-center"><div className="image position-relative"><img src={p3} className="img-fluid w-100 rounded-circle" alt="img" /></div><div className="fw-bold my-3 h4">Ms.Shameksha Raghavan</div><div className="fst-italic text-muted">English Teacher</div></div></div>
          <div className="col p-3"><div className="item text-center"><div className="image position-relative"><img src={p5} className="img-fluid w-100 rounded-circle" alt="img" /></div><div className="fw-bold my-3 h4">Ms.Shalini ArunKumar</div><div className="fst-italic text-muted">Art & Handwriting Teacher</div></div></div>
          <div className="col p-3"><div className="item text-center"><div className="image position-relative"><img src={p6} className="img-fluid w-100 rounded-circle" alt="img" /></div><div className="fw-bold my-3 h4">Mr.Dharun Kumar</div><div className="fst-italic text-muted">Computer Teacher (Basics)</div></div></div>
          <div className="col p-3"><div className="item text-center"><div className="image position-relative"><img src={p7} className="img-fluid w-100 rounded-circle" alt="img" /></div><div className="fw-bold my-3 h4">Mr.Sudharshan Vijay</div><div className="fst-italic text-muted">Programming Teacher</div></div></div>
          <div className="col p-3"><div className="item text-center"><div className="image position-relative"><img src={p1} className="img-fluid w-100 rounded-circle" alt="img" /></div><div className="fw-bold my-3 h4">Ms.Azhagu Shalini</div><div className="fst-italic text-muted">Tamil Phonics Teacher</div></div></div>
        </div>
      </div>
    </div>
    <div className="testimonial">
      <div className="container">
        <div className="main-heading text-center">
          <span className="text-uppercase position-relative d-inline-block px-2">Testimonials</span>
          <h2 className="fw-bold my-3">What Parents Say!</h2>
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
          <div className="col p-3"><div className="item h-100 bg-white shadow p-4 rounded"><p className="bg-light p-4 shadow">The journey lasted 10 months, starting when my child could only read alphabets. Now, at 5 years old, they can confidently read sentences. The classes were always engaging with rhymes and fun activities, making learning enjoyable and effective.</p><div className="d-flex align-items-center gap-3"><div className="flex-grow-1"><div className="name fw-bold h5">Nirmala</div></div></div></div></div>
          <div className="col p-3"><div className="item h-100 bg-white shadow p-4 rounded"><p className="bg-light p-4 shadow">We're thrilled to see our child reading so well at such a young age, while others older than them are still struggling with reading. It's amazing to witness the progress!</p><div className="d-flex align-items-center gap-3"><div className="flex-grow-1"><div className="name fw-bold h5">Yaazhini</div></div></div></div></div>
          <div className="col p-3"><div className="item h-100 bg-white shadow p-4 rounded"><p className="bg-light p-4 shadow">Thank you for arranging these sessions. The teacher’s patience and clear explanations made the classes enjoyable, and I’m grateful for the wonderful learning experience.</p><div className="d-flex align-items-center gap-3"><div className="flex-grow-1"><div className="name fw-bold h5">Shailja</div></div></div></div></div>
          <div className="col p-3"><div className="item h-100 bg-white shadow p-4 rounded"><p className="bg-light p-4 shadow">My child was sad that it was their last class. They enjoyed and learned a lot throughout the lessons, and we’re very grateful for this enriching experience.</p><div className="d-flex align-items-center gap-3"><div className="flex-grow-1"><div className="name fw-bold h5">Jothi</div></div></div></div></div>
          <div className="col p-3"><div className="item h-100 bg-white shadow p-4 rounded"><p className="bg-light p-4 shadow">Thank you to the teacher for helping my child learn phonics. The kids will surely miss the engaging sessions and the support provided.</p><div className="d-flex align-items-center gap-3"><div className="flex-grow-1"><div className="name fw-bold h5">Surya</div></div></div></div></div>
          <div className="col p-3"><div className="item h-100 bg-white shadow p-4 rounded"><p className="bg-light p-4 shadow">Thank you for taking this class! It has been a truly beneficial experience, and we’re grateful for all the hard work and effort put into teaching the kids.</p><div className="d-flex align-items-center gap-3"><div className="flex-grow-1"><div className="name fw-bold h5">Manjula</div></div></div></div></div>
          <div className="col p-3"><div className="item h-100 bg-white shadow p-4 rounded"><p className="bg-light p-4 shadow">Thank you for the positive impact on my child’s learning. Your passion for teaching has made a huge difference, and we feel fortunate to have been part of your class.</p><div className="d-flex align-items-center gap-3"><div className="flex-grow-1"><div className="name fw-bold h5">Deepthi</div></div></div></div></div>
          <div className="col p-3"><div className="item h-100 bg-white shadow p-4 rounded"><p className="bg-light p-4 shadow">As the phonics class comes to an end, I want to thank the teacher for their dedication, patience, and incredible teaching. The progress my child has made in reading and pronunciation is remarkable.</p><div className="d-flex align-items-center gap-3"><div className="flex-grow-1"><div className="name fw-bold h5">Rajesh</div></div></div></div></div>
          <div className="col p-3"><div className="item h-100 bg-white shadow p-4 rounded"><p className="bg-light p-4 shadow">The class was really good and easy to understand. At first, I thought it would be difficult, but the teacher made it simple and enjoyable. I’m excited to continue learning.</p><div className="d-flex align-items-center gap-3"><div className="flex-grow-1"><div className="name fw-bold h5">Saranya</div></div></div></div></div>
        </div>
      </div>
    </div>
    <footer>
      <div className="container text-white">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
          <div className="col p-3">
            <div className="box">
              <Link className="display-5 fw-bold text-decoration-none text-white" to="/">The Honeybee Learning</Link>
              <p className="my-3">Our team of passionate educators and experts are dedicated to crafting innovative and effective learning solutions that cater to the diverse needs of our students. We strive to create a warm, inclusive, and supportive community that encourages children to ask questions, think critically, and dream big.</p>
              <ul className="list-unstyled mb-0 p-0 d-flex gap-2">
                <li><a href="https://www.facebook.com/share/1Fda1AeJ9o/" aria-label="facebook-icon"><FaFacebookF className="text-white border rounded-circle p-2" /></a></li>
                <li><a href="https://www.instagram.com/thehoneybeelearning?igsh=ZmhvNXFoeGtpNGV0" aria-label="instagram-icon"><FaInstagram className="text-white border rounded-circle p-2" /></a></li>
                <li><a href="https://www.linkedin.com/in/the-honey-bee-learning-006512370/" aria-label="linkedin-icon"><FaLinkedinIn className="text-white border rounded-circle p-2" /></a></li>
              </ul>
            </div>
          </div>
          <div className="col p-3">
            <div className="box">
              <div className="title fw-bold h4">Get In Touch</div>
              <div className="email d-flex mt-3 gap-3">
                <div className="flex-shrink-0"><i className="icon fa-solid fa-envelope fa-xl"></i></div>
                <div className="flex-grow-1"><div className="h4">Email</div><div>thehoneybeelearning@gmail.com</div></div>
              </div>
              <div className="phone d-flex mt-3 gap-3">
                <div className="flex-shrink-0"><i className="icon fa-solid fa-phone fa-xl"></i></div>
                <div className="flex-grow-1"><div className="h4">Phone</div><div>+91 88704 01288</div></div>
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
          <a href="#" className="text-decoration-none"><span>The Honeybee Learning</span></a>{' '}
          All Rights Reserved
        </div>
      </div>
    </footer>
  </>
);

export default Teachers; 