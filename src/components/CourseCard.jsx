import React from "react";

const CourseCard = ({
  imgSrc,
  title,
  description,
  age,
  seats,
  duration,
  fee,
  onApply,
  loading
}) => (
  <div className="col p-3">
    <div className="class bg-light text-center rounded overflow-hidden border" data-aos="fade-up">
      <div className="image d-flex justify-content-center align-items-center" style={{ width: '100%', height: 220, background: '#f8fcfd' }}>
        <img
          src={imgSrc}
          className="img-fluid"
          alt="img"
          style={{ width: 420, height: 220, objectFit: 'cover', boxShadow: '0 2px 8px rgba(18,125,142,0.04)' }}
        />
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
          {fee && (
            <div className="item border-bottom d-flex">
              <span className="fw-bold py-2">Fee</span>
              <span className="py-2">₹{fee}</span>
            </div>
          )}
        </div>
        {onApply && (
          <button
            onClick={() => {
              console.log("Enroll Now clicked for:", title);
              onApply();
            }}
            disabled={loading}
            className="main-link mb-2 mb-lg-0 d-inline-block text-decoration-none text-white py-2 px-4 rounded-pill"
            style={{ border: 'none', cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Processing...' : 'Enroll Now'}
          </button>
        )}
      </div>
    </div>
  </div>
);

export default CourseCard;
                                  