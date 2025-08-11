import React, { useState } from 'react';
import '../styles/BookCallModal.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../services/firebase';
import emailjs from 'emailjs-com';

const MEET_LINK = 'https://meet.google.com/your-static-link';
const ADMIN_EMAIL = 'admin@example.com';

// Define static available time slots (no teacher filtering)
const TIME_SLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM',
  '02:00 PM', '03:00 PM', '04:00 PM',
  '05:00 PM', '06:00 PM',
];

const BookCallModal = ({ isOpen, onClose, onBooking, collectionName = "bookings" }) => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState('');
  const [success, setSuccess] = useState(false);

  const handleTimeClick = (slot) => {
    setTime(slot);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !time) return;

    const booking = {
      date: date.toLocaleDateString('en-CA'),
      time: time,
      meetLink: MEET_LINK,
      bookedAt: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, collectionName), booking);

      const templateParams = {
        admin_email: ADMIN_EMAIL,
        student_date: booking.date,
        student_time: booking.time,
        meet_link: MEET_LINK,
      };

      emailjs.send(
        'your_service_id',     // Replace with your EmailJS service ID
        'your_template_id',    // Replace with your EmailJS template ID
        templateParams,
        'your_user_id'         // Replace with your EmailJS user/public key
      )
      .then(() => console.log('✅ Email sent!'))
      .catch(err => console.error('❌ Email error:', err));

      if (onBooking) onBooking();
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1000);
    } catch (error) {
      console.error("Error adding booking to Firebase: ", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="bookcall-modal-overlay">
      <div className="bookcall-modal">
        <button className="bookcall-close" onClick={onClose}>&times;</button>
        <h2>📅 Book a Session</h2>
        <p>Schedule your session via the Meet link below</p>

        <form onSubmit={handleSubmit} className="bookcall-form">

          {/* Date Picker */}
          <div className='date-picker-wrapper'>
            <div className="bookcall-date">
            <label>Select Date</label>
            <DatePicker
              selected={date}
              onChange={setDate}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              inline
              required
            />
          </div>

          </div>
          {/* Time Slots */}
          <div className="bookcall-times">
            <label>Available Times</label>
            <div className="bookcall-times-list">
              {TIME_SLOTS.map((slot) => (
                <button
                  type="button"
                  key={slot}
                  className={'bookcall-time-pill' + (time === slot ? ' selected' : '')}
                  onClick={() => handleTimeClick(slot)}
                >
                  <span className="bookcall-time-icon">🕒</span>
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Static Meet Link */}
          <div className="bookcall-meet-link" style={{ margin: '10px 0' }}>
            <strong>Meet Link: </strong>
            <a href={MEET_LINK} target="_blank" rel="noopener noreferrer">{MEET_LINK}</a>
          </div>

          {/* Summary */}
          <div className="bookcall-summary">
            <div className="summary-title">Booking Summary</div>
            <div className="summary-row">
              <span role="img" aria-label="calendar">📅</span>
              {date ? date.toLocaleDateString() : '--/--/----'}
            </div>
            <div className="summary-row">
              <span role="img" aria-label="clock">🕒</span>
              {time || '--:--'}
            </div>
            <div className="summary-row">
              <span role="img" aria-label="link">🔗</span>
              <a href={MEET_LINK} target="_blank" rel="noopener noreferrer">
                Join Meet
              </a>
            </div>
          </div>

          {success && <div className="bookcall-success">Booking Successful!</div>}

          {/* Actions */}
          <div className="bookcall-actions">
            <button type="button" className="bookcall-cancel" onClick={onClose}>Cancel</button>
            <button
              type="submit"
              className="bookcall-submit"
              disabled={!date || !time}
            >
              Book Session
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookCallModal;
