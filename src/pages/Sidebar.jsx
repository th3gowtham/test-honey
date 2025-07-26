import { Search, MessageSquare, BellDot, Users2, User } from 'lucide-react';
import "../styles/Sidebar.css";
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserChats } from '../utils/chatUtils';


const Sidebar = ({ currentView, setCurrentView, setActiveChat, setShowProfileSettings, setProfileTab, users }) => {
  const { currentUser } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  // Subscribe to user chats to get unread message counts
  useEffect(() => {
    if (!currentUser) return;
    
    const unsubscribe = getUserChats(currentUser.uid, (userChats) => {
      setChats(userChats);
    });
    
    return () => unsubscribe();
  }, [currentUser]);
  
  // Combine users data with chat data to show unread counts
  const enhancedUsers = users?.map(user => {
    const userChat = chats.find(chat => 
      chat.users.includes(user.uid) && chat.users.includes(currentUser?.uid)
    );
    return {
      ...user,
      unreadCount: userChat?.unreadCount || 0
    };
  }) || [];
  
  const filteredUsers = enhancedUsers.filter(user => 
    user.displayName?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];



  const LeftNavBar = () => (
    <div className="left-nav-icons">
      <div
        className={`nav-icon ${currentView === 'batch-broadcasts' ? 'active' : ''}`}
        onClick={() => setCurrentView('batch-broadcasts')}
      >
        <MessageSquare />
        {currentView === 'batch-broadcasts' && <span className="active-dot" />}
      </div>
      <div
        className={`nav-icon ${currentView === 'private-chat' ? 'active' : ''}`}
        onClick={() => setCurrentView('private-chat')}
      >
        <BellDot />
        {currentView === 'private-chat' && <span className="active-dot" />}
      </div>
      <div
        className={`nav-icon ${currentView === 'announcements' ? 'active' : ''}`}
        onClick={() => setCurrentView('announcements')}
      >
        <Users2 />
        {currentView === 'announcements' && <span className="active-dot" />}
      </div>
      <div
        className="nav-icon"
        onClick={() => setShowProfileSettings(true)}
      >
        <User />
      </div>
    </div>
  );
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
      <div className={`nav-item ${currentView === 'announcements' ? 'active' : ''}`} onClick={() => setShowProfileSettings(true)}>
        <User />
        <span>Profile</span>
      </div>
    </div>
  );
  const Header = () => (
    <div className="sidebar-user-info">
      <div className="sidebar-user-header">
        <div>
          <h1 className="sidebar-title">HoneyBee Learning</h1>
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
  );
  return (
    <div className="chat-layout">
      {/* ✅ Only for Desktop */}
      {!isMobile && <LeftNavBar />}
      <div className={`sidebar ${isMobile ? 'mobile-sidebar' : ''}`}>
        <Header />
        <div className="sidebar-search">
          <div className="search-container">
            <Search className="search-icon" />
            <input 
              type="text" 
              placeholder="Search chats..." 
              className="search-input" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {isMobile && currentView=="welcome" && <WelcomeScreen /> }
        </div>
        {/* ✅ Chat list based on view */}
        <div className="sidebar-chat-list">
          {currentView === 'batch-broadcasts' && (
            <div className="chat-item" onClick={() => setActiveChat({ type: 'batch', name: 'Math 101 Batch', id: 'math101' })}>
              <div>
                <h3 className="chat-title">Math 101 Batch</h3>
                <p className="chat-subtitle">25 students</p>
              </div>
              <div className="chat-badge">3</div>
            </div>
          )}
          {currentView === 'private-chat' && (
            <>
              {/* Default chat option */}
              
              
              {/* Display filtered users from Firestore */}
              {filteredUsers.map(user => (
                <div 
                  key={user.id} 
                  className="chat-item" 
                  onClick={() => setActiveChat({ type: 'private', name: user.displayName || 'User', id: user.uid })}
                >
                  <div className="chat-user">
                    <div>
                      <h3 className="chat-title">{user.displayName || 'User'}</h3>
                      <p className="chat-subtitle">{user.role || 'Student'}</p>
                    </div>
                  </div>
                  {/* Show unread message count if it exists and is greater than 0 */}
                  {user.unreadCount > 0 && (
                    <div className="chat-badge">{user.unreadCount}</div>
                  )}
                </div>
              ))}
            </>
          )}
          {currentView === 'announcements' && (
            <div className="chat-item" onClick={() => setActiveChat({ type: 'announcement', name: 'Community Announcements', id: 'community' })}>
              <div>
                <h3 className="chat-title">Community Announcements</h3>
                <p className="chat-subtitle">2 pinned</p>
              </div>
              <div className="chat-badge">1</div>
            </div>
          )}
        </div>
      </div>
      {/* ✅ Only for Mobile */}
      {isMobile && <BottomNav /> }
    </div>
  );
};

export default Sidebar;
