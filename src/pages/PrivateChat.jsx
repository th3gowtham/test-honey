import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Send, Bell, MoreVertical } from "lucide-react";
import { useAuth } from '../context/AuthContext';
import { generateChatId, createChatDocument, sendMessage, subscribeToMessages } from '../utils/chatUtils';
import "../styles/PrivateChat.css";
import BookCallModal from '../components/BookCallModal';

const PrivateChat = ({ activeChat, receiverId: propReceiverId }) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [receiverId, setReceiverId] = useState(propReceiverId || 'sarah_johnson_uid'); // Use provided receiverId or default
  const [chatId, setChatId] = useState(null);
  const messagesEndRef = useRef(null);
  const [showBookModal, setShowBookModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setShowMenu(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

  useEffect(() => {
    if (!currentUser) return;
    
    // Update receiverId when prop changes
    if (propReceiverId) {
      setReceiverId(propReceiverId);
    }

    if (!receiverId) return;

    // Generate chat ID using utility function
    const currentChatId = generateChatId(currentUser.uid, receiverId);
    setChatId(currentChatId);

    // Create or verify chat document exists
    createChatDocument(currentChatId, currentUser.uid, receiverId);

    // Set up real-time listener for messages
    // Pass currentUser.uid to mark messages as read when viewed
    const unsubscribe = subscribeToMessages(currentChatId, (msgs) => {
      setMessages(msgs);
      // Scroll to bottom after messages are updated
      setTimeout(() => scrollToBottom(), 100);
    }, currentUser.uid);

    // Clean up listener on unmount
    return () => unsubscribe();
  }, [currentUser, receiverId, propReceiverId]);

  // Scroll to the bottom of the messages container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle sending a new message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !chatId || !currentUser) return;

    try {
      await sendMessage(chatId, currentUser.uid, receiverId, newMessage);
      setNewMessage('');
      // Scroll to bottom after sending a message
      setTimeout(() => scrollToBottom(), 100);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (!currentUser) {
    return <div className="private-chat">Please log in to chat.</div>;
  }

  return (
    <div className="private-chat">
      <div className="private-header">
        <div className="private-header-info">
          <div className="private-avatar">
            <span>{activeChat ? activeChat.charAt(0) : 'U'}</span>
          </div>
          <div className="private-header-text">
            <h2>{activeChat || 'Chat'}</h2>
            <p>Private Chat</p>
          </div>
        </div>
        <div className="session-btn-dropdown-container" ref={menuRef}>
          <button 
          className="session-btn-dropdown-toggle"
          onClick={() => setShowMenu((prev) => !prev)}
          role='button'
          tabIndex={0}
          >
            <MoreVertical size={23} />
          </button>
          {showMenu && (
            <div className="session-btn-dropdown-menu">
              <button
                className="session-btn-dropdown-item"
                onClick={() => setShowBookModal(true)}
              >
                Book Session
              </button>
              <button
                className="session-btn-dropdown-item"
                onClick={() => {
                  console.log("View File clicked");
                  setShowMenu(false);
                }}
              >
                View File
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="private-messages">
        {messages.length === 0 ? (
          <div className="no-messages">No messages yet. Start the conversation!</div>
        ) : (
          <>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`private-message ${msg.senderId === currentUser.uid ? 'sent' : 'received'}`}
              >
                <div className="message-avatar">
                  {msg.senderId === currentUser.uid ? currentUser.displayName?.charAt(0) || 'Y' : activeChat?.charAt(0) || 'U'}
                </div>
                <div>
                  <div className="message-meta">
                    <span className="sender-name">
                      {msg.senderId === currentUser.uid ? 'You' : activeChat}
                    </span>
                    <span className="message-time">
                      {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Sending...'}
                    </span>
                  </div>
                  <div className="message-bubble">
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            {/* This empty div is used as a reference to scroll to the bottom */}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Book Call Modal */}
      {showBookModal && (
        <BookCallModal
          isOpen={showBookModal}
          onClose={() => setShowBookModal(false)}
          collectionName="privateChatBookings"
        />
      )}

      <div className="private-input">
        <form onSubmit={handleSendMessage} className="private-input-wrapper">
          <button type="button" className="private-attach-btn">📎</button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="private-text-input"
          />
          <button type="submit" className="private-send-btn">
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default PrivateChat;

