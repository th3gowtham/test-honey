import React from "react";
import { Link } from "react-router-dom";
// Import styles at the app level or here as needed
// import "../styles/main.css";
// import "../styles/bootstrap.min.css";
// import "../styles/all.min.css";
// import "../styles/swiper-bundle.min.css";
import img2r from "../assets/2r.png";
import blog2 from "../assets/blog-2.jpg";
import about2 from "../assets/about-2.jpg";
import { FaAddressCard, FaCalendarCheck, FaBuffer, FaAustralSign, FaApple, FaAppStoreIos, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";

const About = () => (
  <>
   

    {/* Breadcrumb */}
    <nav aria-label="breadcrumb" className="breadcrumb-section position-relative">
      <div className="position-absolute top-50 start-50 translate-middle">
        <h2 className="text-center display-3 text-white">About Us</h2>
      </div>
    </nav>
    {/* End Breadcrumb */}

    {/* About Us Section */}
    <div className="about-us bg-light">
      <div className="container">
        <div className="row row-cols-1 row-cols-lg-2">
          <div className="col p-3 d-flex align-items-center" data-aos="fade-right">
            <div className="item text-center">
              <img src={blog2} className="img-fluid" alt="img" />
            </div>
          </div>
          <div className="col p-3" data-aos="fade-left">
            <div className="main-heading">
              <span className="special text-uppercase position-relative d-inline-block px-2">Learn About Us</span>
              <h2 className="fw-bold my-3">Best Learning Experience For Your Children</h2>
            </div>
            <div className="content">
              <p className="text-muted m-0 m-auto">
                At The Honeybee Learning, we are committed to providing an exceptional educational experience for children. Our carefully crafted curriculum and engaging online classes empower young learners to reach their full potential. With a focus on personalized learning, we create an environment where your child can grow, explore, and thrive.<br />
                Our approach is centered around fostering creativity, critical thinking, and a love for learning, all while ensuring each child receives the attention and care they need to succeed.
              </p>
              <div className="d-flex my-4 gap-3 flex-column flex-md-row">
                <div className="flex-shrink-0">
                  <img src={about2} alt="img" />
                </div>
                <div className="flex-grow-1">
                  <div className="item py-2 px-4 position-relative d-flex align-items-center border-top justify-content-center justify-content-md-start">Curiosity-Driven Learning</div>
                  <div className="item py-2 px-4 position-relative d-flex align-items-center border-top justify-content-center justify-content-md-start">Personalized Education Plan</div>
                  <div className="item py-2 px-4 position-relative d-flex align-items-center border-top justify-content-center justify-content-md-start">Creativity and Innovation</div>
                </div>
              </div>
              <a href="/classes" className="main-link mb-2 mb-lg-0 d-inline-block text-decoration-none text-white py-2 px-4 rounded-pill">Join Class</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* End About Us Section */}

    {/* Features Section */}
    <div className="features">
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
          <div className="col p-3">
            <div className="item h-100 d-flex gap-3 bg-light shadow p-4 rounded" data-aos="fade-down-right">
              <div className="flex-shrink-0">
                <FaAddressCard className="fa-2xl" />
              </div>
              <div className="flex-grow-1">
                <div className="h4">Personalised Lessons</div>
                <p className="lh-lg text-muted">Our classes are designed to cater to each child's learning style and pace, ensuring an individualized approach that promotes better understanding and growth.</p>
              </div>
            </div>
          </div>
          <div className="col p-3">
            <div className="item h-100 d-flex gap-3 bg-light shadow p-4 rounded" data-aos="fade-down">
              <div className="flex-shrink-0">
                <FaCalendarCheck className="fa-2xl" />
              </div>
              <div className="flex-grow-1">
                <div className="h4">Flexible Scheduling</div>
                <p className="lh-lg text-muted">Our flexible class schedules allow you to choose convenient times for your child, ensuring learning fits seamlessly into your family’s routine.</p>
              </div>
            </div>
          </div>
          <div className="col p-3">
            <div className="item h-100 d-flex gap-3 bg-light shadow p-4 rounded" data-aos="fade-down-left">
              <div className="flex-shrink-0">
                <FaBuffer className="fa-2xl" />
              </div>
              <div className="flex-grow-1">
                <div className="h4">Progress Tracking</div>
                <p className="lh-lg text-muted">We keep track of your child's progress and provide regular updates so that you can see the improvements and areas where further attention is needed.</p>
              </div>
            </div>
          </div>
          <div className="col p-3">
            <div className="item h-100 d-flex gap-3 bg-light shadow p-4 rounded" data-aos="fade-up-right">
              <div className="flex-shrink-0">
                <FaAustralSign className="fa-2xl" />
              </div>
              <div className="flex-grow-1">
                <div className="h4">Interactive Learning</div>
                <p className="lh-lg text-muted">Our dynamic and engaging learning plan combines live classes, interactive tools, and collaborative activities to make education fun and effective.</p>
              </div>
            </div>
          </div>
          <div className="col p-3">
            <div className="item h-100 d-flex gap-3 bg-light shadow p-4 rounded" data-aos="fade-up">
              <div className="flex-shrink-0">
                <FaApple className="fa-2xl" />
              </div>
              <div className="flex-grow-1">
                <div className="h4">Qualified Teachers</div>
                <p className="lh-lg text-muted">Our experienced and passionate teachers are dedicated to providing personalized, high-quality education that nurtures every child’s growth.</p>
              </div>
            </div>
          </div>
          <div className="col p-3">
            <div className="item h-100 d-flex gap-3 bg-light shadow p-4 rounded" data-aos="fade-up-left">
              <div className="flex-shrink-0">
                <FaAppStoreIos className="fa-2xl" />
              </div>
              <div className="flex-grow-1">
                <div className="h4">Fostering Creativity</div>
                <p className="lh-lg text-muted">We inspire creativity through hands-on projects and activities, helping children develop imagination, problem-solving, and critical thinking skills.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* End Features Section */}

    {/* Footer */}
    <footer>
      <div className="container text-white">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
          <div className="col p-3">
            <div className="box">
              <Link className="display-5 fw-bold text-decoration-none text-white" to="/">The Honeybee Learning</Link>
              <p className="my-3">Our team of passionate educators and experts are dedicated to crafting innovative and effective learning solutions that cater to the diverse needs of our students. We strive to create a warm, inclusive, and supportive community that encourages children to ask questions, think critically, and dream big.</p>
              <ul className="list-unstyled mb-0 p-0 d-flex gap-2">
                <li>
                  <a href="https://www.facebook.com/share/1Fda1AeJ9o/" aria-label="facebook-icon"><FaFacebookF className="text-white border rounded-circle p-2" /></a>
                </li>
                <li>
                  <a href="https://www.instagram.com/thehoneybeelearning?igsh=ZmhvNXFoeGtpNGV0" aria-label="instagram-icon"><FaInstagram className="text-white border rounded-circle p-2" /></a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/the-honey-bee-learning-006512370/" aria-label="linkedin-icon"><FaLinkedinIn className="text-white border rounded-circle p-2" /></a>
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
                <a href="/classes" className="d-block text-decoration-none text-white mt-2 px-4 position-relative">Our Classes</a>
                <a href="/teachers" className="d-block text-decoration-none text-white mt-2 px-4 position-relative">Our Teachers</a>
                <a href="/product" className="d-block text-decoration-none text-white mt-2 px-4 position-relative">Products</a>
                <a href="/contact" className="d-block text-decoration-none text-white mt-2 px-4 position-relative">Contact Us</a>
              </div>
            </div>
          </div>
          <div className="col p-3">
            <div className="box">
              <div className="title fw-bold h4">Newsletter</div>
              <form action="">
                <input type="text" placeholder="Your Name" className="form-control shadow-none fs-5 my-3" />
                <input type="email" placeholder="Your Email" className="form-control shadow-none fs-5 my-3" />
                <input type="submit" value="Submit Now" className="form-control shadow-none fs-5 my-3 rounded-pill border-0 text-white" />
              </form>
            </div>
          </div>
        </div>
        <div className="copy-right text-center border-top">
          &copy; <a href="#" className="text-decoration-none"><span>The Honeybee Learning</span></a> All Rights Reserved
        </div>
      </div>
    </footer>
    {/* End Footer */}
  </>
);

export default About; 