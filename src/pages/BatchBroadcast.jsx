import { Calendar, MoreVertical, Send } from 'lucide-react';
import "../styles/BatchBroadcast.css";
import BookCallModal from '../components/BookCallModal';
import React, { useState, useEffect } from 'react';
import { useRef } from "react";


const BatchBroadcast = () => {
  const [showBookModal, setShowBookModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        
        <div className="session-btn-dropdown-container" ref={menuRef}>
          <button 
          className="session-btn-dropdown-toggle"
          onClick={() => setShowMenu((prev) => !prev)}
          role='button'
          tabIndex={0}
          >
            <MoreVertical size={23} />
          </button>
          {showMenu && (
            <div className="session-btn-dropdown-menu">
              <button
                className="session-btn-dropdown-item"
                onClick={() => setShowBookModal(true)}
              >
                Book Session
              </button>
              <button
                className="session-btn-dropdown-item"
                onClick={() => {
                  console.log("View File clicked");
                  setShowMenu(false);
                }}
              >
                View File
              </button>
            </div>
          )}
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
