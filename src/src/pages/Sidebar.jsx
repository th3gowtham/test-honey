import { useState, useEffect } from 'react'
import { Search, MessageSquare, BellDot, Users2, User } from 'lucide-react'
import '../styles/Sidebar.css'
import { useAuth } from '../context/AuthContext'
import { getUserChats } from '../utils/chatUtils'

const Sidebar = ({ currentView, setCurrentView, setActiveChat, setShowProfileSettings, setProfileTab, users }) => {
  const { currentUser } = useAuth()
  const [isMobile, setIsMobile] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [chats, setChats] = useState([])

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (!currentUser) return
    const unsubscribe = getUserChats(
      currentUser.uid,
      (userChats) => setChats(userChats),
      currentUser.email || currentUser.Gmail || ''
    )
    return () => unsubscribe && unsubscribe()
  }, [currentUser])

  const filteredChats = (chats || []).filter((c) => (c.title || '').toLowerCase().includes(searchTerm.toLowerCase()))

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
          <span className="user-role">{currentUser?.role || 'Member'}</span>
        </div>
        <p className="user-email">{currentUser?.email || ''}</p>
      </div>
    </div>
  )

  const LeftNavBar = () => (
    <div className="left-nav-icons">
      <div className={`nav-icon ${currentView === 'batch-broadcasts' ? 'active' : ''}`} onClick={() => setCurrentView('batch-broadcasts')}>
        <MessageSquare />
        {currentView === 'batch-broadcasts' && <span className="active-dot" />}
      </div>
      <div className={`nav-icon ${currentView === 'private-chat' ? 'active' : ''}`} onClick={() => setCurrentView('private-chat')}>
        <BellDot />
        {currentView === 'private-chat' && <span className="active-dot" />}
      </div>
      <div className={`nav-icon ${currentView === 'announcements' ? 'active' : ''}`} onClick={() => setCurrentView('announcements')}>
        <Users2 />
        {currentView === 'announcements' && <span className="active-dot" />}
      </div>
      <div
        className="nav-icon"
        onClick={() => {
          setProfileTab && setProfileTab('Profile')
          setShowProfileSettings && setShowProfileSettings(true)
        }}
      >
        <User />
      </div>
    </div>
  )

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
        </div>

        <div className="sidebar-chat-list">
          {currentView === 'private-chat' && (
            <>
              {filteredChats.map((chat) => {
                const receiverId = chat.otherParticipantId || (Array.isArray(chat.users) ? chat.users.find((u) => u !== currentUser?.uid && u !== 'admin') : undefined)
                return (
                  <div
                    key={chat.id}
                    className="chat-item"
                    onClick={() => receiverId && setActiveChat({ type: 'private', name: chat.title || 'Chat', id: receiverId })}
                  >
                    <div className="chat-user">
                      <div>
                        <h3 className="chat-title">{chat.title || 'Chat'}</h3>
                        <p className="chat-subtitle">{chat.otherUser?.email || ''}</p>
                      </div>
                    </div>
                    {chat.unreadCount > 0 && <div className="chat-badge">{chat.unreadCount}</div>}
                  </div>
                )
              })}
              {filteredChats.length === 0 && <div className="empty-state">No chats found</div>}
            </>
          )}

          {currentView === 'batch-broadcasts' && (
            <div className="empty-state">Select a batch to start a broadcast</div>
          )}

          {currentView === 'announcements' && (
            <div className="empty-state">Announcements coming soon</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
