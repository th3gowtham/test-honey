import { Calendar, MoreVertical, Send } from "lucide-react";
import "../styles/BatchBroadcast.css";

const BatchBroadcast = () => {
  return (
    <div className="batch-broadcast">
      {/* Header */}
      <div className="chat-header">
        <div className="header-left">
          <div className="avatar">
            <span>S</span>
          </div>
          <div className="header-text">
            <h2>Math 101 Batch</h2>
            <p>📢 Broadcast • 25 students</p>
          </div>
        </div>
        <div className="header-actions">
          <button className="book-call-btn">
            <Calendar size={16} />
            <span>Book Call</span>
          </button>
          <button className="more-btn">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        <div className="message">
          <div className="message-avatar message-sender">S</div>
          <div>
            <div className="message-header">
              <span className="sender-name">Sarah Johnson</span>
              <span className="message-time">2:30 PM</span>
            </div>
            <div className="message-text">
              Good morning! Today we’ll cover quadratic equations.
            </div>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="message-input">
        <button className="attachment-btn">📎</button>
        <input
          type="text"
          placeholder="Type your message..."
          className="input-field"
        />
        <button className="send-btn">
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default BatchBroadcast;

