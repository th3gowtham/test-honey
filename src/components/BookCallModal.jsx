import React, { useState } from 'react';
import '../styles/BookCallModal.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../services/firebase';

const TIME_SLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM',
  '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM',
  '09:00 PM', '10:00 PM'
];
const UNAVAILABLE = ['12:00 PM'];

const BookCallModal = ({ isOpen, onClose, onBooking, collectionName = "bookings" }) => {
  const [callType, setCallType] = useState('video');
  const [date, setDate] = useState(null);
  const [time, setTime] = useState('');
  const [success, setSuccess] = useState(false);

  const handleTimeClick = (slot) => {
    if (!UNAVAILABLE.includes(slot)) setTime(slot);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !time) return;

    const booking = {
      callType: callType,
      date: date.toLocaleDateString('en-CA'), // ✅ Safe format: YYYY-MM-DD (no timezone issue)
      time: time,
      bookedAt: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, collectionName), booking);
      console.log(`✅ Booking saved to Firebase collection '${collectionName}':`, booking);
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
        <h2>📅 Book a Call</h2>
        <p>Schedule a one-on-one session with your teacher</p>
        <form onSubmit={handleSubmit} className="bookcall-form">
          <div className="bookcall-type">
            <label className={callType === 'video' ? 'selected' : ''}>
              <input
                type="radio"
                name="callType"
                value="video"
                checked={callType === 'video'}
                onChange={() => setCallType('video')}
              />
              <span>Video Call</span>
            </label>
            <label className={callType === 'audio' ? 'selected' : ''}>
              <input
                type="radio"
                name="callType"
                value="audio"
                checked={callType === 'audio'}
                onChange={() => setCallType('audio')}
              />
              <span>Audio Call</span>
            </label>
          </div>

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

          <div className="bookcall-times">
            <label>Available Times</label>
            <div className="bookcall-times-list">
              {TIME_SLOTS.map((slot) => (
                <button
                  type="button"
                  key={slot}
                  className={
                    'bookcall-time-pill' +
                    (time === slot ? ' selected' : '') +
                    (UNAVAILABLE.includes(slot) ? ' unavailable' : '')
                  }
                  onClick={() => handleTimeClick(slot)}
                  disabled={UNAVAILABLE.includes(slot)}
                >
                  <span className="bookcall-time-icon">🕒</span>
                  {slot}
                </button>
              ))}
            </div>
          </div>

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
              <span role="img" aria-label="call">
                {callType === 'video' ? '🎥' : '🎤'}
              </span>
              {callType === 'video' ? 'Video Call' : 'Audio Call'}
            </div>
          </div>

          {success && <div className="bookcall-success">Booking Successful!</div>}

          <div className="bookcall-actions">
            <button type="button" className="bookcall-cancel" onClick={onClose}>Cancel</button>
            <button
              type="submit"
              className="bookcall-submit"
              disabled={!date || !time}
            >
              Book Call
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookCallModal;
