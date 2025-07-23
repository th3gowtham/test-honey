import { Search, User, Users2, BellDot,MessageSquare } from 'lucide-react';
import "../styles/Sidebar.css"
import { useState, useEffect } from 'react';

const Sidebar = ({ currentView, setCurrentView, setActiveChat }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const Header = () => {
    return(
      <div className="sidebar-user-info">
              <div className="sidebar-user-header">
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
    )
  }

  const BottomNav = () => (
    <div className="mobile-bottom-nav">
    <div className={`nav-item ${currentView === 'batch-broadcasts' ? 'active' : ''}`} onClick={() => setCurrentView('batch-broadcasts')}>
      <MessageSquare />
      <span>Chats</span>
    </div>
    <div className={`nav-item ${currentView === 'private-chat' ? 'active' : ''}`} onClick={() => setCurrentView('private-chat')}>
      <BellDot />
      <span>Private</span>
    </div>
    <div className={`nav-item ${currentView === 'announcements' ? 'active' : ''}`} onClick={() => setCurrentView('announcements')}>
      <Users2 />
      <span>Communities</span>
    </div>
  </div>
  );

  return (
    <>
      <div className={`sidebar ${isMobile ? 'mobile-sidebar' : ''}`}>
  
        {isMobile ? (
          <Header />
        ) : (
          <>
            {/* User Info */}
            <Header />

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
          </>
        )}

        {/* Chat List */}
        <div className="sidebar-chat-list">
          {currentView === 'batch-broadcasts' && (
            <div className="chat-item" onClick={() => setActiveChat('Math 101 Batch')}>
              <div>
                <h3 className="chat-title">Math 101 Batch</h3>
                <p className="chat-subtitle">25 students</p>
              </div>
              <div className="chat-badge">3</div>
            </div>
          )}

          {currentView === 'private-chat' && (
            <div className="chat-item" onClick={() => setActiveChat('Sarah Johnson')}>
              <div className="chat-user">
                {/* <div className="chat-avatar">
                  <span className="chat-avatar-text">S</span> 
                </div> */}
                <div>
                  <h3 className="chat-title">Sarah Johnson</h3>
                  <p className="chat-subtitle">Teacher</p>
                </div>
              </div>
              <div className="chat-badge">1</div>
            </div>
          )}

          {currentView === 'announcements' && (
            <div className="chat-item" onClick={() => setActiveChat('Community Announcements')}>
              <div>
                <h3 className="chat-title">Community Announcements</h3>
                <p className="chat-subtitle">2 pinned</p>
              </div>
              <div className="chat-badge">1</div>
            </div>
          )}
        </div>
      </div>
      {isMobile && <BottomNav />}
    
    </>
  );
};

export default Sidebar;
