import { Calendar, MoreVertical, Send } from 'lucide-react';
import "../styles/PrivateChat.css"

const PrivateChat = () => {
  return (
    <div className="private-chat">
      {/* Chat Header */}
      <div className="chat-header">
        <div className="header-left">
          <div className="avatar">
            <span>S</span>
          </div>
          <div className="header-text">
            <h2>Sarah Johnson</h2>
            <p>Private Chat</p>
          </div>
        </div>
        <div className="header-actions">
          <button className="book-call-btn">
            <Calendar className="w-4 h-4" />
            <span>Book Call</span>
          </button>
          <button className="more-btn">
            <MoreVertical className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="chat-messages">
        {/* Message from Sarah */}
        <div className="message">
          <div className="message-avatar message-sender">
            <span>S</span>
          </div>
          <div>
            <div className="message-header">
              <span className="sender-name">Sarah Johnson</span>
              <span className="status-indicator"></span>
              <span className="message-time">2:30 PM</span>
            </div>
            <div className="message-text">
              Hi! I have a question about the homework assignment.
            </div>
          </div>
        </div>

        {/* Message from John */}
        <div className="message">
          <div className="message-avatar message-self">
            <span>J</span>
          </div>
          <div>
            <div className="message-header">
              <span className="sender-name">John Doe</span>
              <span className="message-time">2:32 PM</span>
            </div>
            <div className="message-text message-text-self">
              What would you like to know?
            </div>
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="message-input">
        <button className="attachment-btn">📎</button>
        <input
          type="text"
          placeholder="Type your message..."
          className="input-field"
        />
        <button className="send-btn">
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default PrivateChat;
