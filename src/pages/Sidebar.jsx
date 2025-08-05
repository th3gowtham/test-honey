import { Search, MessageSquare, BellDot, Users2, User } from 'lucide-react';
import "../styles/Sidebar.css";
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserChats } from '../utils/chatUtils';
import WelcomeScreen from  "../pages/WelcomeScreen"



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
    
    console.log('[DEBUG] Sidebar: Subscribing to chats for user:', currentUser.uid);
    const unsubscribe = getUserChats(currentUser.uid, (userChats) => {
      console.log('[DEBUG] Sidebar: Received chats:', userChats);
      setChats(userChats);
    });
    
    return () => unsubscribe();
  }, [currentUser]);
  
  // Get assigned private chats (only show chats created through admin assignment)
  const assignedChats = chats.filter(chat => 
    chat.type === 'assigned_private' && 
    chat.isAssigned === true &&
    (chat.visibleUsers || chat.users).includes(currentUser?.uid)
  ) || [];
  
  const filteredAssignedChats = assignedChats.filter(chat => 
    chat.otherUser?.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.courseName?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Get group chats for the current user
  const groupChats = chats.filter(chat => 
    chat.type === 'group' && chat.users.includes(currentUser?.uid)
  ) || [];
  
  console.log('[DEBUG] Sidebar: Group chats found:', groupChats);
  
  const filteredGroupChats = groupChats.filter(chat => 
    chat.groupName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.courseName?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];
  
  console.log('[DEBUG] Sidebar: Filtered group chats:', filteredGroupChats);



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
      <div className={`nav-item ${currentView === 'profile' ? 'active' : ''}`} onClick={() => {
        setCurrentView('profile');
        setShowProfileSettings(true);
      }}>

    
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
          <span className="user-name">{currentUser?.displayName || 'User'}</span>
          <span className="user-role">{currentUser?.role || 'User'}</span>
        </div>
        <p className="user-email">{currentUser?.email || 'user@honeybee.com'}</p>
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
              {/* Display group chats first */}
              {filteredGroupChats.map(chat => (
                <div 
                  key={chat.id} 
                  className="chat-item group-chat" 
                  onClick={() => setActiveChat({ 
                    type: 'group', 
                    name: chat.groupName || 'Group Chat', 
                    id: chat.id,
                    courseName: chat.courseName,
                    otherUsers: chat.otherUsers
                  })}
                >
                  <div className="chat-user">
                    <div>
                      <h3 className="chat-title">{chat.groupName || 'Group Chat'}</h3>
                      <p className="chat-subtitle">{chat.courseName || 'Course'} • {chat.otherUsers?.length || 0} participants</p>
                    </div>
                  </div>
                  {/* Show unread message count if it exists and is greater than 0 */}
                  {chat.unreadCount > 0 && (
                    <div className="chat-badge">{chat.unreadCount}</div>
                  )}
                </div>
              ))}
              
              {/* Display assigned chats */}
              {filteredAssignedChats.map(chat => (
                <div 
                  key={chat.id} 
                  className="chat-item assigned-chat" 
                  onClick={() => setActiveChat({ 
                    type: 'private', 
                    name: chat.otherUser?.displayName || 'User', 
                    id: chat.otherUser?.uid || chat.id,
                    chatId: chat.id,
                    courseName: chat.courseName,
                    isAssigned: true
                  })}
                >
                  <div className="chat-user">
                    <div>
                      <h3 className="chat-title">{chat.otherUser?.displayName || 'User'}</h3>
                      <p className="chat-subtitle">{chat.courseName || 'Course'} • {chat.otherUser?.role || 'User'}</p>
                    </div>
                  </div>
                  {/* Show unread message count if it exists and is greater than 0 */}
                  {chat.unreadCount > 0 && (
                    <div className="chat-badge">{chat.unreadCount}</div>
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