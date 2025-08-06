"use client"

import { Search, MessageSquare, BellDot, Users2, User } from 'lucide-react';
import "../../styles/Sidebar.css";
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
// You will need a utility function to fetch chats from Firestore, let's call it chatUtils.js
import { getUserChats } from '../../utils/chatUtils'; 
import WelcomeScreen from "../../pages/WelcomeScreen";

const Sidebar = ({ currentView, setCurrentView, setActiveChat, setShowProfileSettings, users }) => {
  const { currentUser } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  // CHANGE 1: This state will now hold ALL chats (private and group)
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  // CHANGE 2: This hook now fetches all chats for the logged-in user
  useEffect(() => {
    if (!currentUser) return;
    
    // This function should listen for real-time updates to all chats where the user is a participant
    const unsubscribe = getUserChats(currentUser.uid, (allUserChats) => {
      setChats(allUserChats);
    });
    
    // Cleanup the listener when the component unmounts
    return () => unsubscribe(); 
  }, [currentUser]);
  
  // CHANGE 3: Separate the fetched chats into two distinct lists
  
  // Create a list for Batch/Group Chats
  const groupChats = chats.filter(chat => chat.isGroupChat);

  // Create a list for Private Chats and add the other user's details for display
  const privateChats = chats
    .filter(chat => !chat.isGroupChat)
    .map(chat => {
        // Find the ID of the other person in the chat
        const otherUserId = chat.participants.find(id => id !== currentUser.uid);
        // Find the full user object from the 'users' prop
        const otherUser = users.find(u => u.uid === otherUserId);
        return {
            ...chat,
            otherUserName: otherUser?.displayName || 'User',
            otherUserRole: otherUser?.role || 'Student',
        };
    });

  // Apply search filter to the appropriate list
  const filteredGroupChats = groupChats.filter(chat => 
    chat.chatName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPrivateChats = privateChats.filter(chat =>
    chat.otherUserName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- No changes are needed for LeftNavBar, BottomNav, or Header ---

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
          <span className="user-name">John Doe</span>
          <span className="user-role">Student</span>
        </div>
        <p className="user-email">john@honeybee.com</p>
      </div>
    </div>
  );

  return (
    <div className="chat-layout">
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

        {/* CHANGE 4: Conditionally render the correct list based on the current view */}
        <div className="sidebar-chat-list">

          {/* This will show the list of BATCH CHATS */}
          {currentView === 'batch-broadcasts' && (
            filteredGroupChats.map(chat => (
              <div 
                key={chat.id} 
                className="chat-item" 
                // Pass the full chat object to the parent
                onClick={() => setActiveChat({ type: 'batch', ...chat })}
              >
                <div>
                  <h3 className="chat-title">{chat.chatName}</h3>
                  <p className="chat-subtitle">{chat.participants.length} members</p>
                </div>
                {chat.unreadCount > 0 && (
                  <div className="chat-badge">{chat.unreadCount}</div>
                )}
              </div>
            ))
          )}

          {/* This will show the list of PRIVATE CHATS */}
          {currentView === 'private-chat' && (
            filteredPrivateChats.map(chat => (
              <div 
                key={chat.id} 
                className="chat-item" 
                onClick={() => setActiveChat({ type: 'private', ...chat })}
              >
                <div>
                  <h3 className="chat-title">{chat.otherUserName}</h3>
                  <p className="chat-subtitle">{chat.otherUserRole}</p>
                </div>
                {chat.unreadCount > 0 && (
                  <div className="chat-badge">{chat.unreadCount}</div>
                )}
              </div>
            ))
          )}
          
          {/* This part for announcements remains the same */}
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
      {isMobile && <BottomNav /> }
    </div>
  );
};

export default Sidebar;