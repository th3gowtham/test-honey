import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/all.min.css";
import "../styles/bootstrap.min.css";
import "../styles/swiper-bundle.min.css";
import "../styles/main.css";
import img2r from "../assets/2r.png";
import header from "../assets/header.png";
import blog2 from "../assets/blog-2.jpg";
import about2 from "../assets/about-2.jpg";
import class1 from "../assets/class-1.jpg";
import class2 from "../assets/class-2.jpg";
import class3 from "../assets/class-3.jpg";
// import bookSeat from "../assets/book-seat.jpg";
//import bookSeat2 from "../assets/book-seat-2.jpg";
import testimonial1 from "../assets/testimonial-1.jpg";
import testimonial2 from "../assets/testimonial-2.jpg";
import testimonial3 from "../assets/testimonial-3.jpg";
import { FaBuffer, FaApple } from "react-icons/fa";
import { FaAustralSign, FaAddressCard, FaCalendarCheck, FaAppStoreIos, FaLocationDot, FaPhone, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaQuoteLeft, FaChevronRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import AOS from "aos";
import "aos/dist/aos.css";
import phoni from '../assets/phoni.jpeg';
import gram from '../assets/gram.jpg';
import game from '../assets/game.png';
import ha from '../assets/ha.jpg';
import math from '../assets/math.jpeg';
import s from '../assets/s.jpeg';
import portfolio3 from '../assets/portfolio-3.jpg';
import cod from '../assets/cod.jpg';
import com from '../assets/com.jpeg';
import art from '../assets/art.jpeg';
import class3img from '../assets/class-3.jpg';



const Home = () => {
  React.useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  return(
  <>
    <section className="landing text-white" data-aos="fade-in">
      <div className="container mh-100 d-flex align-items-center">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="content">
              <h2 className="display-3 fw-bold" data-aos="fade-left">
                The HoneyBee Learning<br />
              </h2>

              

              <h3 data-aos="fade-up-right">
                Unlock Your Child's Potential With The Honeybee Learning - A Multi Learning Platform
              </h3>
              <br />
              <div className="title fs-4" data-aos="fade-right">
                We provide high-quality, engaging, and interactive learning experiences that inspire young minds to explore, learn, and thrive.<br />
              </div>
              <br />
              <Link to="/classes" className="second-link text-decoration-none text-white d-inline-block py-3 px-5 rounded-pill">
                Learn More
              </Link>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="image">
              <img src={header} className="img-fluid" alt="img" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <div className="features" data-aos="fade-up">
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
          <div className="col p-3">
            <div className="item h-100 d-flex gap-3 bg-light shadow p-4 rounded">
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
            <div className="item h-100 d-flex gap-3 bg-light shadow p-4 rounded">
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
            <div className="item h-100 d-flex gap-3 bg-light shadow p-4 rounded">
              <div className="flex-shrink-0">
                <FaBuffer className="fa-2xl" data-aos="fade-down-left" />
              </div>
              <div className="flex-grow-1">
                <div className="h4">Progress Tracking</div>
                <p className="lh-lg text-muted">We keep track of your child's progress and provide regular updates so that you can see the improvements and areas where further attention is needed.</p>
              </div>
            </div>
          </div>
          <div className="col p-3">
            <div className="item h-100 d-flex gap-3 bg-light shadow p-4 rounded">
              <div className="flex-shrink-0">
                <FaAustralSign className="fa-2xl" data-aos="fade-up-right" />
              </div>
              <div className="flex-grow-1">
                <div className="h4">Interactive Learning</div>
                <p className="lh-lg text-muted">Our dynamic and engaging learning plan combines live classes, interactive tools, and collaborative activities to make education fun and effective.</p>
              </div>
            </div>
          </div>
          <div className="col p-3">
            <div className="item h-100 d-flex gap-3 bg-light shadow p-4 rounded">
              <div className="flex-shrink-0">
                <FaApple className="fa-2xl" data-aos="fade-up" />
              </div>
              <div className="flex-grow-1">
                <div className="h4">Qualified Teachers</div>
                <p className="lh-lg text-muted">Our experienced and passionate teachers are dedicated to providing personalized, high-quality education that nurtures every child’s growth.</p>
              </div>
            </div>
          </div>
          <div className="col p-3">
            <div className="item h-100 d-flex gap-3 bg-light shadow p-4 rounded">
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
    <div className="about-us bg-light" data-aos="fade-up">
      <div className="container">
        <div className="row row-cols-1 row-cols-lg-2">
          <div className="col p-3 d-flex align-items-center">
            <div className="item text-center">
              <img src={blog2} className="img-fluid" alt="img" />
            </div>
          </div>
          <div className="col p-3">
            <div className="main-heading">
              <span className="special text-uppercase position-relative d-inline-block px-2">Learn About Us</span>
              <h2 className="fw-bold my-3">Best Learning Experience For Your Children</h2>
            </div>
            <div className="content">
              <p className="text-muted m-0 m-auto">At The Honeybee Learning, we are committed to providing an exceptional educational experience for children. Our carefully crafted curriculum and engaging online classes empower young learners to reach their full potential. With a focus on personalized learning, we create an environment where your child can grow, explore, and thrive.<br />Our approach is centered around fostering creativity, critical thinking, and a love for learning, all while ensuring each child receives the attention and care they need to succeed.</p>
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
              <Link to="/classes" className="main-link mb-2 mb-lg-0 d-inline-block text-decoration-none text-white py-2 px-4 rounded-pill">Join Class</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="popular-classes bg-light" data-aos="fade-up">
      <div className="container">
        <div className="main-heading">
          <span className="special text-uppercase position-relative d-inline-block px-2">Our Classes</span>
          <h2 className="fw-bold my-3">Popular Classes</h2>
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
          {/* Expanded class cards from index.html */}
          {/* Jolly Phonics */}
          <div className="col p-3">
            <div className="item h-100 bg-white shadow p-4 rounded" data-aos="fade-up">
              <div className="image">
                <img src={phoni} className="img-fluid" alt="Jolly Phonics" />
              </div>
              <div className="content">
                <h4 className="fw-bold">Jolly Phonics</h4>
                <p className="text-muted">A fun, interactive approach to teaching children essential reading and writing skills through phonics, blending, and engaging activities.</p>
                <div className="table-responsive">
                  <table className="table mb-3" style={{border: '1px solid #e0e0e0'}}>
                    <tbody>
                      <tr>
                        <th className="fw-bold" style={{width: '50%'}}>Age of Kids</th>
                        <td>3+ Years</td>
                      </tr>
                      <tr>
                        <th className="fw-bold">Total Seats</th>
                        <td>Upto 5 Kids per Batch</td>
                      </tr>
                      <tr>
                        <th className="fw-bold">Duration</th>
                        <td>9 Months</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-center">
                  <Link to="/classes" className="main-link mb-2 mb-lg-0 d-inline-block text-decoration-none text-white py-2 px-4 rounded-pill">Know More</Link>
                </div>
              </div>
            </div>
          </div>
          {/* Jolly Grammar */}
          <div className="col p-3">
            <div className="item h-100 bg-white shadow p-4 rounded" data-aos="fade-up">
              <div className="image">
                <img src={gram} className="img-fluid" alt="Jolly Grammar" />
              </div>
              <div className="content">
                <h4 className="fw-bold">Jolly Grammar</h4>
                <p className="text-muted">A fun, interactive approach to teaching children essential grammar skills through phonics, blending, and engaging activities.</p>
                <div className="table-responsive">
                  <table className="table mb-3" style={{border: '1px solid #e0e0e0'}}>
                    <tbody>
                      <tr>
                        <th className="fw-bold" style={{width: '50%'}}>Age of Kids</th>
                        <td>4+ Years</td>
                      </tr>
                      <tr>
                        <th className="fw-bold">Total Seats</th>
                        <td>Upto 5 Kids per Batch</td>
                      </tr>
                      <tr>
                        <th className="fw-bold">Duration</th>
                        <td>1 Year</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-center">
                  <Link to="/classes" className="main-link mb-2 mb-lg-0 d-inline-block text-decoration-none text-white py-2 px-4 rounded-pill">Know More</Link>
                </div>
              </div>
            </div>
          </div>
          {/* Technical and Non-Technical Classes */}
          <div className="col p-3">
            <div className="item h-100 bg-white shadow p-4 rounded" data-aos="fade-up">
              <div className="image">
                <img src={game} className="img-fluid" alt="Technical and Non-Technical Classes" />
              </div>
              <div className="content">
                <h4 className="fw-bold">Technical and Non-Technical Classes</h4>
                <p className="text-muted">Programming Languages such as Python, Java, Html, C and Domains such as Artificial Intelligence, Data science, Machine Learning, Web development, Android App Development, Web design, Graphic Design, Video Rendering.</p>
                <div className="table-responsive">
                  <table className="table mb-3" style={{border: '1px solid #e0e0e0'}}>
                    <tbody>
                      <tr>
                        <th className="fw-bold" style={{width: '50%'}}>Age of Kids</th>
                        <td>8+ Years</td>
                      </tr>
                      <tr>
                        <th className="fw-bold">Total Seats</th>
                        <td>Upto 10 per Batch</td>
                      </tr>
                      <tr>
                        <th className="fw-bold">Duration</th>
                        <td>3 Months</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-center">
                  <Link to="/classes" className="main-link mb-2 mb-lg-0 d-inline-block text-decoration-none text-white py-2 px-4 rounded-pill">Know More</Link>
                </div>
              </div>
            </div>
          </div>
          {/* Spoken English */}
          <div className="col p-3">
            <div className="item h-100 bg-white shadow p-4 rounded" data-aos="fade-up">
              <div className="image">
                <img src={ha} className="img-fluid" alt="Spoken English" />
              </div>
              <div className="content">
                <h4 className="fw-bold">Spoken English</h4>
                <p className="text-muted">A fun and interactive spoken English class for building confidence through engaging activities, storytelling, and real-life conversations!</p>
                <div className="table-responsive">
                  <table className="table mb-3" style={{border: '1px solid #e0e0e0'}}>
                    <tbody>
                      <tr>
                        <th className="fw-bold" style={{width: '50%'}}>Age of Kids</th>
                        <td>6+ Years</td>
                      </tr>
                      <tr>
                        <th className="fw-bold">Total Seats</th>
                        <td>Upto 5 Kids per Batch</td>
                      </tr>
                      <tr>
                        <th className="fw-bold">Duration</th>
                        <td>4 Months</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-center">
                  <Link to="/classes" className="main-link mb-2 mb-lg-0 d-inline-block text-decoration-none text-white py-2 px-4 rounded-pill">Know More</Link>
                </div>
              </div>
            </div>
          </div>
          {/* Math Class */}
          <div className="col p-3">
            <div className="item h-100 bg-white shadow p-4 rounded" data-aos="fade-up">
              <div className="image">
                <img src={math} className="img-fluid" alt="Math Class" />
              </div>
              <div className="content">
                <h4 className="fw-bold">Math Class</h4>
                <p className="text-muted">An engaging and interactive approach to help children develop strong mathematical skills through fun lessons and engaging activities.</p>
                <div className="table-responsive">
                  <table className="table mb-3" style={{border: '1px solid #e0e0e0'}}>
                    <tbody>
                      <tr>
                        <th className="fw-bold" style={{width: '50%'}}>Age of Kids</th>
                        <td>5+ Years</td>
                      </tr>
                      <tr>
                        <th className="fw-bold">Total Seats</th>
                        <td>Upto 5 Kids per Batch</td>
                      </tr>
                      <tr>
                        <th className="fw-bold">Duration</th>
                        <td>12 Months</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-center">
                  <Link to="/classes" className="main-link mb-2 mb-lg-0 d-inline-block text-decoration-none text-white py-2 px-4 rounded-pill">Know More</Link>
                </div>
              </div>
            </div>
          </div>
          {/* Tamil Phonics */}
          <div className="col p-3">
            <div className="item h-100 bg-white shadow p-4 rounded" data-aos="fade-up">
              <div className="image">
                <img src={s} className="img-fluid" alt="Tamil Phonics" />
              </div>
              <div className="content">
                <h4 className="fw-bold">Tamil Phonics</h4>
                <p className="text-muted">An engaging and interactive method to help children learn Tamil sounds, pronunciation, and reading skills through ancient teaching methods.</p>
                <div className="table-responsive">
                  <table className="table mb-3" style={{border: '1px solid #e0e0e0'}}>
                    <tbody>
                      <tr>
                        <th className="fw-bold" style={{width: '50%'}}>Age of Kids</th>
                        <td>5+ Years</td>
                      </tr>
                      <tr>
                        <th className="fw-bold">Total Seats</th>
                        <td>Upto 5 Kids per Batch</td>
                      </tr>
                      <tr>
                        <th className="fw-bold">Duration</th>
                        <td>5 Months</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-center">
                  <Link to="/classes" className="main-link mb-2 mb-lg-0 d-inline-block text-decoration-none text-white py-2 px-4 rounded-pill">Know More</Link>
                </div>
              </div>
            </div>
          </div>
          {/* Handwriting Class */}
          <div className="col p-3">
            <div className="item h-100 bg-white shadow p-4 rounded" data-aos="fade-up">
              <div className="image">
                <img src={portfolio3} className="img-fluid" alt="Handwriting Class" />
              </div>
              <div className="content">
                <h4 className="fw-bold">Handwriting Class</h4>
                <p className="text-muted">A focused and engaging class that helps children improve their handwriting skills through structured practice and creative activities, promoting neatness and clarity.</p>
                <div className="table-responsive">
                  <table className="table mb-3" style={{border: '1px solid #e0e0e0'}}>
                    <tbody>
                      <tr>
                        <th className="fw-bold" style={{width: '50%'}}>Age of Kids</th>
                        <td>3+ Years</td>
                      </tr>
                      <tr>
                        <th className="fw-bold">Total Seats</th>
                        <td>Upto 5 Kids per Batch</td>
                      </tr>
                      <tr>
                        <th className="fw-bold">Duration</th>
                        <td>4 Months</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-center">
                  <Link to="/classes" className="main-link mb-2 mb-lg-0 d-inline-block text-decoration-none text-white py-2 px-4 rounded-pill">Know More</Link>
                </div>
              </div>
            </div>
          </div>
          {/* Computer Basics */}
          <div className="col p-3">
            <div className="item h-100 bg-white shadow p-4 rounded" data-aos="fade-up">
              <div className="image">
                <img src={cod} className="img-fluid" alt="Computer Basics" />
              </div>
              <div className="content">
                <h4 className="fw-bold">Computer Basics</h4>
                <p className="text-muted">A fun and interactive way for children to learn computer basics, including typing, using software, and safe internet practices!</p>
                <div className="table-responsive">
                  <table className="table mb-3" style={{border: '1px solid #e0e0e0'}}>
                    <tbody>
                      <tr>
                        <th className="fw-bold" style={{width: '50%'}}>Age of Kids</th>
                        <td>6+ Years</td>
                      </tr>
                      <tr>
                        <th className="fw-bold">Total Seats</th>
                        <td>Upto 5 Kids per Batch</td>
                      </tr>
                      <tr>
                        <th className="fw-bold">Duration</th>
                        <td>3 Months</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-center">
                  <Link to="/classes" className="main-link mb-2 mb-lg-0 d-inline-block text-decoration-none text-white py-2 px-4 rounded-pill">Know More</Link>
                </div>
              </div>
            </div>
          </div>
          {/* Programming for Beginners & Kids */}
          <div className="col p-3">
            <div className="item h-100 bg-white shadow p-4 rounded" data-aos="fade-up">
              <div className="image">
                <img src={com} className="img-fluid" alt="Programming for Beginners & Kids" />
              </div>
              <div className="content">
                <h4 className="fw-bold">Programming for Beginners & Kids</h4>
                <p className="text-muted">An engaging and interactive way for children and beginners to learn programming, develop problem-solving skills, and create their own digital projects!</p>
                <div className="table-responsive">
                  <table className="table mb-3" style={{border: '1px solid #e0e0e0'}}>
                    <tbody>
                      <tr>
                        <th className="fw-bold" style={{width: '50%'}}>Age of Kids</th>
                        <td>8+ Years</td>
                      </tr>
                      <tr>
                        <th className="fw-bold">Total Seats</th>
                        <td>Upto 5 Kids per Batch</td>
                      </tr>
                      <tr>
                        <th className="fw-bold">Duration</th>
                        <td>6 Months</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-center">
                  <Link to="/classes" className="main-link mb-2 mb-lg-0 d-inline-block text-decoration-none text-white py-2 px-4 rounded-pill">Know More</Link>
                </div>
              </div>
            </div>
          </div>
          {/* Mandala & Warli Art Class */}
          <div className="col p-3">
            <div className="item h-100 bg-white shadow p-4 rounded" data-aos="fade-up">
              <div className="image">
                <img src={art} className="img-fluid" alt="Mandala & Warli Art Class" />
              </div>
              <div className="content">
                <h4 className="fw-bold">Mandala & Warli Art Class</h4>
                <p className="text-muted">A dynamic and creative class that encourages children to explore various art forms, develop their artistic skills, and express their imagination through hands-on projects.</p>
                <div className="table-responsive">
                  <table className="table mb-3" style={{border: '1px solid #e0e0e0'}}>
                    <tbody>
                      <tr>
                        <th className="fw-bold" style={{width: '50%'}}>Age of Kids</th>
                        <td>8+ Years</td>
                      </tr>
                      <tr>
                        <th className="fw-bold">Total Seats</th>
                        <td>Upto 10 per Batch</td>
                      </tr>
                      <tr>
                        <th className="fw-bold">Duration</th>
                        <td>3 Months</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-center">
                  <Link to="/classes" className="main-link mb-2 mb-lg-0 d-inline-block text-decoration-none text-white py-2 px-4 rounded-pill">Know More</Link>
                </div>
              </div>
            </div>
          </div>
          {/* Drawing Class */}
          <div className="col p-3">
            <div className="item h-100 bg-white shadow p-4 rounded" data-aos="fade-left">
              <div className="image">
                <img src={class3img} className="img-fluid" alt="Drawing Class" />
              </div>
              <div className="content">
                <h4 className="fw-bold">Drawing Class</h4>
                <p className="text-muted">A creative and interactive class designed to help children explore their artistic abilities while learning various drawing techniques and expressing their imagination.</p>
                <div className="table-responsive">
                  <table className="table mb-3" style={{border: '1px solid #e0e0e0'}}>
                    <tbody>
                      <tr>
                        <th className="fw-bold" style={{width: '50%'}}>Age of Kids</th>
                        <td>3+ Years</td>
                      </tr>
                      <tr>
                        <th className="fw-bold">Total Seats</th>
                        <td>Upto 5 Kids per Batch</td>
                      </tr>
                      <tr>
                        <th className="fw-bold">Duration</th>
                        <td>5 Months</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-center">
                  <Link to="/classes" className="main-link mb-2 mb-lg-0 d-inline-block text-decoration-none text-white py-2 px-4 rounded-pill">Know More</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="book-seat bg-light" data-aos="fade-up">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 p-3">
            <div className="box" data-aos="fade-up-right">
              <div className="main-heading">
                <span className="special text-uppercase position-relative d-inline-block px-2">BOOK A SEAT</span>
                <h2 className="fw-bold my-3">Book A Seat For Your Children</h2>
              </div>
              <div className="content">
                <p className="my-4 text-muted">
                  Give your child the opportunity to thrive in a nurturing and engaging learning environment. At Honeybee Learning, we offer personalized classes that are designed to meet your child’s needs and help them unlock their full potential. Book a seat now and join us on an exciting educational journey that inspires curiosity, creativity, and growth.
                </p>
                <ul className="list-unstyled px-0 mb-4">
                  <li className="my-3 position-relative px-4">
                    Quality Education at Accessible Prices
                  </li>
                  <li className="my-3 position-relative px-4">
                  Efficient Online Platform
                  </li>
                  <li className="my-3 position-relative px-4">
                    Commitment to Inclusivity
                  </li>
                </ul>
                <a href="https://wa.me/message/BITGLQYLAPJRO1" className="main-link mb-2 mb-lg-0 d-inline-block text-decoration-none text-white py-2 px-4 rounded-pill">Join Class</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="testimonials bg-light" data-aos="fade-up">
      <div className="container">
        <div className="main-heading text-center">
          <span className="text-uppercase position-relative d-inline-block px-2">Testimonials</span>
          <h2 className="fw-bold my-3">What Parents Say!</h2>
        </div>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          grabCursor={true}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: false }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="mb-5"
        >
          {/* 1. Nirmala */}
          <SwiperSlide>
            <div className="bg-light p-4 shadow">
              <p>
                The journey lasted 10 months, starting when my child could only read alphabets. Now, at 5 years old, they can confidently read sentences. The classes were always engaging with rhymes and fun activities, making learning enjoyable and effective.
              </p>
              <div className="d-flex align-items-center gap-3">
                <div className="flex-shrink-0"></div>
                <div className="flex-grow-1">
                  <div className="name fw-bold h5">Nirmala</div>
                  <div className="job text-muted mt-2 fst-italic"></div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          {/* 2. Yaazhini */}
          <SwiperSlide>
            <div className="bg-light p-4 shadow">
              <p>
                We're thrilled to see our child reading so well at such a young age, while others older than them are still struggling with reading. It's amazing to witness the progress!
              </p>
              <div className="d-flex align-items-center gap-3">
                <div className="flex-shrink-0"></div>
                <div className="flex-grow-1">
                  <div className="name fw-bold h5">Yaazhini</div>
                  <div className="job text-muted mt-2 fst-italic"></div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          {/* 3. Shailja */}
          <SwiperSlide>
            <div className="bg-light p-4 shadow">
              <p>
                Thank you for arranging these sessions. The teacher’s patience and clear explanations made the classes enjoyable, and I’m grateful for the wonderful learning experience.
              </p>
              <div className="d-flex align-items-center gap-3">
                <div className="flex-shrink-0"></div>
                <div className="flex-grow-1">
                  <div className="name fw-bold h5">Shailja</div>
                  <div className="job text-muted mt-2 fst-italic"></div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          {/* 4. Jothi */}
          <SwiperSlide>
            <div className="bg-light p-4 shadow">
              <p>
                My child was sad that it was their last class. They enjoyed and learned a lot throughout the lessons, and we’re very grateful for this enriching experience.
              </p>
              <div className="d-flex align-items-center gap-3">
                <div className="flex-shrink-0"></div>
                <div className="flex-grow-1">
                  <div className="name fw-bold h5">Jothi</div>
                  <div className="job text-muted mt-2 fst-italic"></div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          {/* 5. Surya */}
          <SwiperSlide>
            <div className="bg-light p-4 shadow">
              <p>
                Thank you to the teacher for helping my child learn phonics. The kids will surely miss the engaging sessions and the support provided.
              </p>
              <div className="d-flex align-items-center gap-3">
                <div className="flex-shrink-0"></div>
                <div className="flex-grow-1">
                  <div className="name fw-bold h5">Surya</div>
                  <div className="job text-muted mt-2 fst-italic"></div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          {/* 6. Manjula */}
          <SwiperSlide>
            <div className="bg-light p-4 shadow">
              <p>
                Thank you for taking this class! It has been a truly beneficial experience, and we’re grateful for all the hard work and effort put into teaching the kids.
              </p>
              <div className="d-flex align-items-center gap-3">
                <div className="flex-shrink-0"></div>
                <div className="flex-grow-1">
                  <div className="name fw-bold h5">Manjula</div>
                  <div className="job text-muted mt-2 fst-italic"></div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          {/* 7. Deepthi */}
          <SwiperSlide>
            <div className="bg-light p-4 shadow">
              <p>
                Thank you for the positive impact on my child’s learning. Your passion for teaching has made a huge difference, and we feel fortunate to have been part of your class.
              </p>
              <div className="d-flex align-items-center gap-3">
                <div className="flex-shrink-0"></div>
                <div className="flex-grow-1">
                  <div className="name fw-bold h5">Deepthi</div>
                  <div className="job text-muted mt-2 fst-italic"></div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          {/* 8. Rajesh */}
          <SwiperSlide>
            <div className="bg-light p-4 shadow">
              <p>
                As the phonics class comes to an end, I want to thank the teacher for their dedication, patience, and incredible teaching. The progress my child has made in reading and pronunciation is remarkable.
              </p>
              <div className="d-flex align-items-center gap-3">
                <div className="flex-shrink-0"></div>
                <div className="flex-grow-1">
                  <div className="name fw-bold h5">Rajesh</div>
                  <div className="job text-muted mt-2 fst-italic"></div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          {/* 9. Saranya */}
          <SwiperSlide>
            <div className="bg-light p-4 shadow">
              <p>
                The class was really good and easy to understand. At first, I thought it would be difficult, but the teacher made it simple and enjoyable. I’m excited to continue learning.
              </p>
              <div className="d-flex align-items-center gap-3">
                <div className="flex-shrink-0"></div>
                <div className="flex-grow-1">
                  <div className="name fw-bold h5">Saranya</div>
                  <div className="job text-muted mt-2 fst-italic"></div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
    <footer data-label-id="0">
      <div className="container text-white">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
          {/* About / Brand */}
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
          {/* Get In Touch */}
          <div className="col p-3">
            <div className="box">
              <div className="title fw-bold h4">Get In Touch</div>
              <div className="email d-flex mt-3 gap-3">
                <div className="flex-shrink-0">
                  <FaEnvelope className="icon fa-xl" />
                </div>
                <div className="flex-grow-1">
                  <div className="h4">Email</div>
                  <div>thehoneybeelearning@gmail.com</div>
                </div>
              </div>
              <div className="phone d-flex mt-3 gap-3">
                <div className="flex-shrink-0">
                  <FaPhone className="icon fa-xl" />
                </div>
                <div className="flex-grow-1">
                  <div className="h4">Phone</div>
                  <div>+91 88704 01288</div>
                </div>
              </div>
            </div>
          </div>
          {/* Quick Links */}
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
          {/* Newsletter */}
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
          &copy;
          <Link to="#" className="text-decoration-none">
            <span>The Honeybee Learning</span>
          </Link>
          All Rights Reserved
        </div>
      </div>
    </footer>
  </>
);
}
export default Home; 