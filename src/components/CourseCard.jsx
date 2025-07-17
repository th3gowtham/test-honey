import React from "react";

const CourseCard = ({
  imgSrc,
  title,
  description,
  age,
  seats,
  duration,
  link,
  onApply,
}) => {
  return (
    <div className="col p-3">
      <div className="class bg-light text-center rounded overflow-hidden border" data-aos="fade-up">
        <div className="image">
          <img src={imgSrc} className="img-fluid" alt="img" />
        </div>
        <div className="content p-4">
          <h3 className="m-0">{title}</h3>
          <p className="py-4 text-muted border-bottom">{description}</p>
          <div className="list mb-3">
            <div className="item border-bottom d-flex">
              <span className="fw-bold py-2">Age of Kids</span>
              <span className="py-2">{age}</span>
            </div>
            <div className="item border-bottom d-flex">
              <span className="fw-bold py-2">Total Seats</span>
              <span className="py-2">{seats}</span>
            </div>
            <div className="item border-bottom d-flex">
              <span className="fw-bold py-2">Duration</span>
              <span className="py-2">{duration}</span>
            </div>
          </div>
          <a href={link} className="main-link mb-2 mb-lg-0 d-inline-block text-decoration-none text-white py-2 px-4 rounded-pill">
            Join Now   
          </a>
          <button type="button" className="main-link mb-2 mb-lg-0 d-inline-block text-decoration-none text-white py-2 px-4 rounded-pill" onClick={() => onApply && onApply(title)}>
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
