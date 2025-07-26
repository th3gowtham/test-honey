import { Calendar, MoreVertical, Send } from 'lucide-react';
import "../styles/BatchBroadcast.css";
import BookCallModal from '../components/BookCallModal';
import React, { useState } from 'react';

const BatchBroadcast = () => {
  const [showBookModal, setShowBookModal] = useState(false);

  return (
    <div className="batch-broadcast">
      {/* Header */}
      <div className="batch-header">
        <div className="batch-header-info">
          <div className="batch-avatar">
            <span>S</span>
          </div>
          <div className="batch-header-text">
            <h2>Math 101 Batch</h2>
            <p>📢 Broadcast • 25 students</p>
          </div>
        </div>
        <div className="batch-actions">
          <button className="batch-btn" onClick={() => setShowBookModal(true)}>
            <Calendar size={16} />
            <span>Book Call</span>
          </button>
          <div>
            <button className="batch-more-btn">
              <MoreVertical size={20} />
            </button>
          </div>
          {/* Removed View Booked Calls button */}
          {/* <button className="view-bookings-btn" onClick={() => setShowBookingList(true)}>
            View Booked Calls
          </button> */}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="batch-messages">
        <div className="batch-message">
          <div className="message-avatar">
            <span>S</span>
          </div>
          <div>
            <div className="message-meta">
              <span className="name">Sarah Johnson</span>
              <span className="status"></span>
              <span>2:30 PM</span>
            </div>
            <div className="message-bubble">
              <p>Good morning! Today we’ll cover quadratic equations.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="batch-input">
        <div className="batch-input-wrapper">
          <button className="batch-attach-btn">📎</button>
          <input
            type="text"
            placeholder="Type your message..."
            className="batch-text-input"
          />
          <button className="batch-send-btn">
            <Send size={20} />
          </button>
        </div>
      </div>

      {/* Book Call Modal */}
      <BookCallModal
        isOpen={showBookModal}
        onClose={() => setShowBookModal(false)}
        collectionName="batchBroadcastBookings"
      />
    </div>
  );
};

export default BatchBroadcast;
