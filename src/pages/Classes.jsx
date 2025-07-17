import React from "react";
import { Link } from "react-router-dom";
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
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Classes = () => (
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
          <div className="col p-3">
            <div className="class bg-light text-center rounded overflow-hidden border" data-aos="fade-up">
              <div className="image">
                <img src={phoni} className="img-fluid" alt="img" />
              </div>
              <div className="content p-4">
                <h3 className="m-0">Jolly Phonics</h3>
                <p className="py-4 text-muted border-bottom">
                  A fun, interactive approach to teaching children essential reading and writing skills through phonics, blending, and engaging activities.
                </p>
                <div className="list mb-3">
                  <div className="item border-bottom d-flex">
                    <span className="fw-bold py-2">Age of Kids</span>
                    <span className="py-2">3+ Years</span>
                  </div>
                  <div className="item border-bottom d-flex">
                    <span className="fw-bold py-2">Total Seats</span>
                    <span className="py-2">Upto 5 Kids per Batch</span>
                  </div>
                  <div className="item border-bottom d-flex">
                    <span className="fw-bold py-2">Duration</span>
                    <span className="py-2">9 Months</span>
                  </div>
                </div>
                <a href="https://wa.me/message/BITGLQYLAPJRO1" className="main-link mb-2 mb-lg-0 d-inline-block text-decoration-none text-white py-2 px-4 rounded-pill">Join Now</a>
              </div>
            </div>
          </div>
          <div className="col p-3">
            <div className="class bg-light text-center rounded overflow-hidden border" data-aos="fade-up">
              <div className="image">
                <img src={gram} className="img-fluid" alt="img" />
              </div>
              <div className="content p-4">
                <h3 className="m-0">Jolly Grammar</h3>
                <p className="py-4 text-muted border-bottom">
                  A fun, interactive approach to teaching children essential grammar skills through phonics, blending, and engaging activities.
                </p>
                <div className="list mb-3">
                  <div className="item border-bottom d-flex">
                    <span className="fw-bold py-2">Age of Kids</span>
                    <span className="py-2">4+ Years</span>
                  </div>
                  <div className="item border-bottom d-flex">
                    <span className="fw-bold py-2">Total Seats</span>
                    <span className="py-2">Upto 5 Kids per Batch</span>
                  </div>
                  <div className="item border-bottom d-flex">
                    <span className="fw-bold py-2">Duration</span>
                    <span className="py-2">1 Year</span>
                  </div>
                </div>
                <a href="https://wa.me/message/BITGLQYLAPJRO1" className="main-link mb-2 mb-lg-0 d-inline-block text-decoration-none text-white py-2 px-4 rounded-pill">Join Now</a>
              </div>
            </div>
          </div>
          <div className="col p-3">
            <div className="class bg-light text-center rounded overflow-hidden border" data-aos="fade-up">
              <div className="image">
                <img src={ha} className="img-fluid" alt="img" />
              </div>
              <div className="content p-4">
                <h3 className="m-0">Spoken English</h3>
                <p className="py-4 text-muted border-bottom">
                  A fun and interactive spoken English class for building confidence through engaging activities, storytelling, and real-life conversations!
                </p>
                <div className="list mb-3">
                  <div className="item border-bottom d-flex">
                    <span className="fw-bold py-2">Age of Kids</span>
                    <span className="py-2">6+ Years</span>
                  </div>
                  <div className="item border-bottom d-flex">
                    <span className="fw-bold py-2">Total Seats</span>
                    <span className="py-2">Upto 5 Kids per Batch</span>
                  </div>
                  <div className="item border-bottom d-flex">
                    <span className="fw-bold py-2">Duration</span>
                    <span className="py-2">4 Months</span>
                  </div>
                </div>
                <a href="https://wa.me/message/BITGLQYLAPJRO1" className="main-link mb-2 mb-lg-0 d-inline-block text-decoration-none text-white py-2 px-4 rounded-pill">Join Now</a>
              </div>
            </div>
          </div>
          <div className="col p-3">
            <div className="class bg-light text-center rounded overflow-hidden border" data-aos="fade-right">
              <div className="image">
                <img src={portfolio3} className="img-fluid" alt="img" />
              </div>
              <div className="content p-4">
                <h3 className="m-0">Handwriting Class (English)</h3>
                <p className="py-4 text-muted border-bottom">
                  A focused and engaging class that helps children improve their handwriting skills through structured practice and creative activities, promoting neatness and clarity.
                </p>
                <div className="list mb-3">
                  <div className="item border-bottom d-flex">
                    <span className="fw-bold py-2">Age of Kids</span>
                    <span className="py-2">3+ Years</span>
                  </div>
                  <div className="item border-bottom d-flex">
                    <span className="fw-bold py-2">Total Seats</span>
                    <span className="py-2">Upto 5 Kids per Batch</span>
                  </div>
                  <div className="item border-bottom d-flex">
                    <span className="fw-bold py-2">Duration</span>
                    <span className="py-2">4 Months</span>
                  </div>
                </div>
                <a href="https://wa.me/message/BITGLQYLAPJRO1" className="main-link mb-2 mb-lg-0 d-inline-block text-decoration-none text-white py-2 px-4 rounded-pill">Join Now</a>
              </div>
            </div>
          </div>
          <div className="col p-3">
            <div className="class bg-light text-center rounded overflow-hidden border" data-aos="fade-right">
              <div className="image">
                <img src={math} className="img-fluid" alt="img" />
              </div>
              <div className="content p-4">
                <h3 className="m-0">Math Class</h3>
                <p className="py-4 text-muted border-bottom">
                  An engaging and interactive approach to help children develop strong mathematical skills through fun lessons and engaging activities.
                </p>
                <div className="list mb-3">
                  <div className="item border-bottom d-flex">
                    <span className="fw-bold py-2">Age of Kids</span>
                    <span className="py-2">5+ Years</span>
                  </div>
                  <div className="item border-bottom d-flex">
                    <span className="fw-bold py-2">Total Seats</span>
                    <span className="py-2">Upto 5 Kids per Batch</span>
                  </div>
                  <div className="item border-bottom d-flex">
                    <span className="fw-bold py-2">Duration</span>
                    <span className="py-2">12 Months</span>
                  </div>
                </div>
                <a href="https://wa.me/message/BITGLQYLAPJRO1" className="main-link mb-2 mb-lg-0 d-inline-block text-decoration-none text-white py-2 px-4 rounded-pill">Join Now</a>
              </div>
            </div>
          </div>
          <div className="col p-3">
            <div className="class bg-light text-center rounded overflow-hidden border" data-aos="fade-right">
              <div className="image">
                <img src={s} className="img-fluid" alt="img" />
              </div>
              <div className="content p-4">
                <h3 className="m-0">Tamil Phonics</h3>
                <p className="py-4 text-muted border-bottom">
                  An engaging and interactive method to help children learn Tamil sounds, pronunciation, and reading skills through ancient teaching methods.
                </p>
                <div className="list mb-3">
                  <div className="item border-bottom d-flex">
                    <span className="fw-bold py-2">Age of Kids</span>
                    <span className="py-2">5+ Years</span>
                  </div>
                  <div className="item border-bottom d-flex">
                    <span className="fw-bold py-2">Total Seats</span>
                    <span className="py-2">Upto 5 Kids per Batch</span>
                  </div>
                  <div className="item border-bottom d-flex">
                    <span className="fw-bold py-2">Duration</span>
                    <span className="py-2">5 Months</span>
                  </div>
                </div>
                <a href="https://wa.me/message/BITGLQYLAPJRO1" className="main-link mb-2 mb-lg-0 d-inline-block text-decoration-none text-white py-2 px-4 rounded-pill">Join Now</a>
              </div>
            </div>
          </div>
          <div className="col p-3">
            <div className="class bg-light text-center rounded overflow-hidden border" data-aos="fade-right">
              <div className="image">
                <img src={portfolio3} className="img-fluid" alt="img" />
              </div>
              <div className="content p-4">
                <h3 className="m-0">Tamil Handwriting Class</h3>
                <p className="py-4 text-muted border-bottom">
                  A focused and engaging class that helps children improve their tamil handwriting skills through structured practice and creative activities, promoting neatness and clarity.
                </p>
                <div className="list mb-3">
                  <div className="item border-bottom d-flex">
                    <span className="fw-bold py-2">Age of Kids</span>
                    <span className="py-2">5+ Years</span>
                  </div>
                  <div className="item border-bottom d-flex">
                    <span className="fw-bold py-2">Total Seats</span>
                    <span className="py-2">Upto 5 Kids per Batch</span>
                  </div>
                  <div className="item border-bottom d-flex">
                    <span className="fw-bold py-2">Duration</span>
                    <span className="py-2">4 Months</span>
                  </div>
                </div>
                <a href="https://wa.me/message/BITGLQYLAPJRO1" className="main-link mb-2 mb-lg-0 d-inline-block text-decoration-none text-white py-2 px-4 rounded-pill">Join Now</a>
              </div>
            </div>
          </div>
          <div className="col p-3">
            <div className="class bg-light text-center rounded overflow-hidden border" data-aos="fade-up">
              <div className="image">
                <img src={cod} className="img-fluid" alt="img" />
              </div>
              <div className="content p-4">
                <h3 className="m-0">Computer Basics</h3>
                <p className="py-4 text-muted border-bottom">
                  A fun and interactive way for children to learn computer basics, including typing, using software, and safe internet practices!
                </p>
                <div className="list mb-3">
                  <div className="item border-bottom d-flex">
                    <span className="fw-bold py-2">Age of Kids</span>
                    <span className="py-2">6+ Years</span>
                  </div>
                  <div className="item border-bottom d-flex">
                    <span className="fw-bold py-2">Total Seats</span>
                    <span className="py-2">Upto 4 Kids per Batch</span>
                  </div>
                  <div className="item border-bottom d-flex">
                    <span className="fw-bold py-2">Duration</span>
                    <span className="py-2">3 Months</span>
                  </div>
                </div>
                <a href="https://wa.me/message/BITGLQYLAPJRO1" className="main-link mb-2 mb-lg-0 d-inline-block text-decoration-none text-white py-2 px-4 rounded-pill">Join Now</a>
              </div>
            </div>
          </div>
          <div className="col p-3">
            <div className="class bg-light text-center rounded overflow-hidden border" data-aos="fade-up">
              <div className="image">
                <img src={com} className="img-fluid" alt="img" />
              </div>
              <div className="content p-4">
                <h3 className="m-0">Programming for Beginners & Kids</h3>
                <p className="py-4 text-muted border-bottom">
                  An engaging and interactive way for children and beginners to learn programming, develop problem-solving skills, and create their own digital projects!
                </p>
                <div className="list mb-3">
                  <div className="item border-bottom d-flex">
                    <span className="fw-bold py-2">Age of Kids</span>
                    <span className="py-2">8+ Years</span>
                  </div>
                  <div className="item border-bottom d-flex">
                    <span className="fw-bold py-2">Total Seats</span>
                    <span className="py-2">Upto 4 Kids per Batch</span>
                  </div>
                  <div className="item border-bottom d-flex">
                    <span className="fw-bold py-2">Duration</span>
                    <span className="py-2">6 Months</span>
                  </div>
                </div>
                <a href="https://wa.me/message/BITGLQYLAPJRO1" className="main-link mb-2 mb-lg-0 d-inline-block text-decoration-none text-white py-2 px-4 rounded-pill">Join Now</a>
              </div>
            </div>
          </div>
          <div className="col p-3">
            <div className="class bg-light text-center rounded overflow-hidden border" data-aos="fade-right">
              <div className="image">
                <img src={art} className="img-fluid" alt="img" />
              </div>
              <div className="content p-4">
                <h3 className="m-0">Mandala & Warli Art Class</h3>
                <p className="py-4 text-muted border-bottom">
                  A dynamic and creative class that encourages children to explore various art forms, develop their artistic skills, and express their imagination through hands-on projects.
                </p>
                <div className="list mb-3">
                  <div className="item border-bottom d-flex">
                    <span className="fw-bold py-2">Age of Kids</span>
                    <span className="py-2">8+ Years</span>
                  </div>
                  <div className="item border-bottom d-flex">
                    <span className="fw-bold py-2">Total Seats</span>
                    <span className="py-2">Upto 5 per Batch</span>
                  </div>
                  <div className="item border-bottom d-flex">
                    <span className="fw-bold py-2">Duration</span>
                    <span className="py-2">3 Months</span>
                  </div>
                </div>
                <a href="https://wa.me/message/BITGLQYLAPJRO1" className="main-link mb-2 mb-lg-0 d-inline-block text-decoration-none text-white py-2 px-4 rounded-pill">Join Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Advanced Courses Section */}
    <div className="main-heading text-center">
      <span className="text-uppercase position-relative d-inline-block px-2">Advanced Courses</span>
      <h2 className="fw-bold my-3">Technical & Non-Tech Classes </h2>
    </div>
    <Swiper
      spaceBetween={30}
      grabCursor={true}
      loop={true}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      className="mb-5"
    >
      <SwiperSlide>
        <div className="class bg-light text-center rounded overflow-hidden border" data-aos="fade-up">
          <div className="image">
            <img src={web} className="img-fluid" alt="img" />
          </div>
          <div className="content p-4">
            <h3 className="m-0">Web Development</h3>
            <p className="py-4 text-muted border-bottom">A fun, interactive approach to learn building a webiste through blending and engaging methods.</p>
            <div className="list mb-3">
              <div className="item border-bottom d-flex"><span className="fw-bold py-2">Age</span><span className="py-2">10+ Years</span></div>
              <div className="item border-bottom d-flex"><span className="fw-bold py-2">Total Seats</span><span className="py-2">Upto 4 per Batch</span></div>
              <div className="item border-bottom d-flex"><span className="fw-bold py-2">Duration</span><span className="py-2">6 Months</span></div>
            </div>
            <a href="https://wa.me/message/BITGLQYLAPJRO1" className="main-link mb-2 mb-lg-0 d-inline-block text-decoration-none text-white py-2 px-4 rounded-pill">Join Now</a>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="class bg-light text-center rounded overflow-hidden border" data-aos="fade-up">
          <div className="image">
            <img src={game} className="img-fluid" alt="img" />
          </div>
          <div className="content p-4">
            <h3 className="m-0">Game Development</h3>
            <p className="py-4 text-muted border-bottom">A fun, interactive approach to learn and create real world game applications using insdustry leading technology.</p>
            <div className="list mb-3">
              <div className="item border-bottom d-flex"><span className="fw-bold py-2">Age</span><span className="py-2">10+ Years</span></div>
              <div className="item border-bottom d-flex"><span className="fw-bold py-2">Total Seats</span><span className="py-2">Upto 4 per Batch</span></div>
              <div className="item border-bottom d-flex"><span className="fw-bold py-2">Duration</span><span className="py-2">4 Months</span></div>
            </div>
            <a href="https://wa.me/message/BITGLQYLAPJRO1" className="main-link mb-2 mb-lg-0 d-inline-block text-decoration-none text-white py-2 px-4 rounded-pill">Join Now</a>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="class bg-light text-center rounded overflow-hidden border" data-aos="fade-up">
          <div className="image">
            <img src={dm} className="img-fluid" alt="img" />
          </div>
          <div className="content p-4">
            <h3 className="m-0">Digital Marketing</h3>
            <p className="py-4 text-muted border-bottom">Learn Digital Marketing from Foundations to Advanced and product building strategies with our personalised course.</p>
            <div className="list mb-3">
              <div className="item border-bottom d-flex"><span className="fw-bold py-2">Age</span><span className="py-2">10+ Years</span></div>
              <div className="item border-bottom d-flex"><span className="fw-bold py-2">Total Seats</span><span className="py-2">Upto 5 per Batch</span></div>
              <div className="item border-bottom d-flex"><span className="fw-bold py-2">Duration</span><span className="py-2">4 Months</span></div>
            </div>
            <a href="https://wa.me/message/BITGLQYLAPJRO1" className="main-link mb-2 mb-lg-0 d-inline-block text-decoration-none text-white py-2 px-4 rounded-pill">Join Now</a>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="class bg-light text-center rounded overflow-hidden border" data-aos="fade-right">
          <div className="image">
            <img src={ai} className="img-fluid" alt="img" />
          </div>
          <div className="content p-4">
            <h3 className="m-0">Artificial Intelligence & Machine Learning</h3>
            <p className="py-4 text-muted border-bottom">An engaging and interactive approach to develop strong technical skills in AI & ML through fun lessons and engaging activities.</p>
            <div className="list mb-3">
              <div className="item border-bottom d-flex"><span className="fw-bold py-2">Age</span><span className="py-2">8+ Years</span></div>
              <div className="item border-bottom d-flex"><span className="fw-bold py-2">Total Seats</span><span className="py-2">Upto 5 per Batch</span></div>
              <div className="item border-bottom d-flex"><span className="fw-bold py-2">Duration</span><span className="py-2">4 Months</span></div>
            </div>
            <a href="https://wa.me/message/BITGLQYLAPJRO1" className="main-link mb-2 mb-lg-0 d-inline-block text-decoration-none text-white py-2 px-4 rounded-pill">Join Now</a>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="class bg-light text-center rounded overflow-hidden border" data-aos="fade-right">
          <div className="image">
            <img src={des} className="img-fluid" alt="img" />
          </div>
          <div className="content p-4">
            <h3 className="m-0">Graphic Design & Photoshop</h3>
            <p className="py-4 text-muted border-bottom">An engaging and interactive approach to develop strong design skills in Graphic Design & Photoshop through fun lessons and engaging activities.</p>
            <div className="list mb-3">
              <div className="item border-bottom d-flex"><span className="fw-bold py-2">Age</span><span className="py-2">8+ Years</span></div>
              <div className="item border-bottom d-flex"><span className="fw-bold py-2">Total Seats</span><span className="py-2">Upto 5 per Batch</span></div>
              <div className="item border-bottom d-flex"><span className="fw-bold py-2">Duration</span><span className="py-2">4 Months</span></div>
            </div>
            <a href="https://wa.me/message/BITGLQYLAPJRO1" className="main-link mb-2 mb-lg-0 d-inline-block text-decoration-none text-white py-2 px-4 rounded-pill">Join Now</a>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="class bg-light text-center rounded overflow-hidden border" data-aos="fade-right">
          <div className="image">
            <img src={ani} className="img-fluid" alt="img" />
          </div>
          <div className="content p-4">
            <h3 className="m-0">Animation & Video Editing</h3>
            <p className="py-4 text-muted border-bottom">An engaging and interactive approach to learn 3D Animations and Video Editing skills through fun lessons and engaging activities.</p>
            <div className="list mb-3">
              <div className="item border-bottom d-flex"><span className="fw-bold py-2">Age</span><span className="py-2">8+ Years</span></div>
              <div className="item border-bottom d-flex"><span className="fw-bold py-2">Total Seats</span><span className="py-2">Upto 5 per Batch</span></div>
              <div className="item border-bottom d-flex"><span className="fw-bold py-2">Duration</span><span className="py-2">4 Months</span></div>
            </div>
            <a href="https://wa.me/message/BITGLQYLAPJRO1" className="main-link mb-2 mb-lg-0 d-inline-block text-decoration-none text-white py-2 px-4 rounded-pill">Join Now</a>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </>
);

export default Classes; 