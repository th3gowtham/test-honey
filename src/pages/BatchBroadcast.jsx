import { Calendar, MoreVertical, Send, Bell} from "lucide-react";
import "../styles/BatchBroadcast.css";

const BatchBroadcast = () => {
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
      <button className="batch-btn">
        <Calendar size={16} />
        <span>Book Call</span>
      </button>
    </div>
  </div>

  {/* Messages */}
  <div className="batch-messages">
    <div className="batch-message">
      <div className="message-avatar">S</div>
      <div>
        <div className="message-meta">
          <span className="sender-name">Sarah Johnson</span>
          <span className="message-time">2:30 PM</span>
        </div>
        <div className="message-bubble">
          Good morning! Today we’ll cover quadratic equations.
        </div>
      </div>
    </div>
  </div>

  {/* Input */}
  <div className="batch-input">
    <div className="batch-input-wrapper">
      <button className="batch-attach-btn">📎</button>
      <input
        type="text"
        placeholder="Type your message..."
        className="batch-text-input"
      />
      <button className="batch-send-btn">
        <Send size={18} />
      </button>
    </div>
  </div>
</div>

  );
};

export default BatchBroadcast;

