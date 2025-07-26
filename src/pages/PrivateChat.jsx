import { Calendar, MoreVertical, Send } from "lucide-react";
import "../styles/PrivateChat.css";
import { Bell } from "lucide-react";

const PrivateChat = () => {
  return (
    <div className="private-chat">
      {/* Header */}
      <div className="private-header">
        <div className="private-header-info">
          <div className="private-avatar">
            <span>S</span>
          </div>
          <div className="private-header-text">
            <h2>Sarah Johnson</h2>
            <p>Private Chat</p>
          </div>
        </div>
        <div className="private-actions">
          <button className="private-btn">
            <Calendar size={16} />
            <span>Book Session</span>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="private-messages">
        {/* Message from Sarah */}
        <div className="private-message">
          <div className="message-avatar">S</div>
          <div>
            <div className="message-meta">
              <span className="sender-name">Sarah Johnson</span>
              <span className="message-time">2:30 PM</span>
            </div>
            <div className="message-bubble">
              Hi! I have a question about the homework assignment.
            </div>
          </div>
        </div>

        {/* Message from John */}
        <div className="private-message">
          <div className="message-avatar">J</div>
          <div>
            <div className="message-meta">
              <span className="sender-name">John Doe</span>
              <span className="message-time">2:32 PM</span>
            </div>
            <div className="message-bubble">
              What would you like to know?
            </div>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="private-input">
        <div className="private-input-wrapper">
          <button className="private-attach-btn">📎</button>
          <input
            type="text"
            placeholder="Type your message..."
            className="private-text-input"
          />
          <button className="private-send-btn">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivateChat;

