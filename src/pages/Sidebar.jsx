import { Search, User } from 'lucide-react';
import "../styles/Sidebar.css"

const Sidebar = ({ currentView, setCurrentView, setActiveChat }) => {
  return (
    <div className="sidebar">
      
      {/* User Info */}
      <div className="sidebar-user-info">
        <div className="sidebar-user-header">
          <div className="sidebar-user-avatar">
            <span className="avatar-emoji">🐝</span>
          </div>
          <div>
            <h2 className="sidebar-title">HoneyBee Chat</h2>
            <p className="sidebar-subtitle">John Doe</p>
          </div>
        </div>

        <div className="sidebar-user-details">
          <div className="sidebar-user-tags">
            <span className="user-name">John Doe</span>
            <span className="user-role">Student</span>
          </div>
          <p className="user-email">john@honeybee.com</p>
        </div>
      </div>

      {/* Search Box */}
      <div className="sidebar-search">
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search chats..."
            className="search-input"
          />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sidebar-tabs">
        {[
          { label: "Batch Broadcasts", key: "batch-broadcasts" },
          { label: "Private Chats", key: "private-chat" },
          { label: "Announcements", key: "announcements" },
        ].map(({ label, key }) => (
          <button
            key={key}
            onClick={() => setCurrentView(key)}
            className={`tab-button ${currentView === key ? 'active' : ''}`}
          >
            <div className="tab-content">
              {key === "batch-broadcasts" && <User className="tab-icon" />}
              <span>{label}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Chat List */}
      <div className="sidebar-chat-list">
        {currentView === 'batch-broadcasts' && (
          <div
            className="chat-item"
            onClick={() => setActiveChat('Math 101 Batch')}
          >
            <div>
              <h3 className="chat-title">Math 101 Batch</h3>
              <p className="chat-subtitle">25 students</p>
            </div>
            <div className="chat-badge">3</div>
          </div>
        )}

        {currentView === 'private-chat' && (
          <div
            className="chat-item"
            onClick={() => setActiveChat('Sarah Johnson')}
          >
            <div className="chat-user">
              <div className="chat-avatar">
                <span className="chat-avatar-text">S</span>
              </div>
              <div>
                <h3 className="chat-title">Sarah Johnson</h3>
                <p className="chat-subtitle">Teacher</p>
              </div>
            </div>
            <div className="chat-badge">1</div>
          </div>
        )}

        {currentView === 'announcements' && (
          <div
            className="chat-item"
            onClick={() => setActiveChat('Community Announcements')}
          >
            <div>
              <h3 className="chat-title">Community Announcements</h3>
              <p className="chat-subtitle">2 pinned</p>
            </div>
            <div className="chat-badge">1</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
