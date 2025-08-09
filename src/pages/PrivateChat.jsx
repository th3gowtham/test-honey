import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Send, Bell, MoreVertical, Paperclip } from "lucide-react";
import { useAuth } from '../context/AuthContext';
import { generateChatId, createChatDocument, sendMessage, subscribeToMessages } from '../utils/chatUtils';
import { db } from '../services/firebase';
import { doc, getDoc, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import "../styles/BatchBroadcast.css";
import BookCallModal from '../components/BookCallModal';
import FileUploadModal from '../components/FileUploadModal';
import FileViewer from '../components/FileViewer';

const PrivateChat = ({ activeChat, receiverId: propReceiverId, chatId: propChatId }) => {
  const { currentUser, userRole } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [receiverId, setReceiverId] = useState(propReceiverId || '');
  const [chatId, setChatId] = useState(propChatId || null);
  const [otherUserRole, setOtherUserRole] = useState('User');
  const [currentUserRoleLabel, setCurrentUserRoleLabel] = useState('User');
  const [roleCache, setRoleCache] = useState({});
  const [chatMeta, setChatMeta] = useState({ teacherId: null, studentId: null });
  const [teacherIdVariants, setTeacherIdVariants] = useState([]);
  const [studentIdVariants, setStudentIdVariants] = useState([]);
  const messagesEndRef = useRef(null);
  const [showBookModal, setShowBookModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showFiles, setShowFiles] = useState(false);
  const [fileCount, setFileCount] = useState(0);

  // Effect to mark messages as read by resetting unread count
  useEffect(() => {
    const markAsRead = async () => {
      const effectiveChatId = propChatId || chatId;
      if (effectiveChatId && currentUser?.uid) {
        try {
          const chatRef = doc(db, 'chats', effectiveChatId);
          const chatSnap = await getDoc(chatRef);

          if (chatSnap.exists()) {
            const chatData = chatSnap.data();
            // Reset unread count for the current user if it exists and is greater than 0
            if (chatData.unread && typeof chatData.unread === 'object' && chatData.unread[currentUser.uid] > 0) {
              await updateDoc(chatRef, {
                [`unread.${currentUser.uid}`]: 0
              });
            }
          }
        } catch (error) {
          console.error('Error marking messages as read:', error);
        }
      }
    };

    if (propChatId || chatId) {
        markAsRead();
    }
  }, [propChatId, chatId, currentUser]);

  useEffect(() => {
    const roleLower = String(userRole || '').toLowerCase();
    if (roleLower === 'admin' || currentUser?.uid === 'admin') setCurrentUserRoleLabel('Admin');
    else if (roleLower === 'teacher') setCurrentUserRoleLabel('Teacher');
    else if (roleLower === 'student') setCurrentUserRoleLabel('Student');
    else setCurrentUserRoleLabel('User');
  }, [userRole, currentUser]);

  // Resolve and cache role by arbitrary user id (users/Teacher/Students)
  const resolveAndCacheRole = async (userId) => {
    if (!userId) return 'User';
    if (roleCache[userId]) return roleCache[userId];
    let role = 'User';
    let userEmail = '';
    try {
      const uSnap = await getDoc(doc(db, 'users', userId));
      if (uSnap.exists()) {
        const d = uSnap.data() || {};
        userEmail = d.email || d.Gmail || '';
        const r = String(d.role || d.userRole || '').toLowerCase();
        if (r) role = r === 'admin' ? 'Admin' : r.charAt(0).toUpperCase() + r.slice(1);
      }
    } catch { /* ignore */ }

    // Prefer Teacher if possible
    if (role === 'User') {
      try {
        // By uid or doc id
        const tByUid = await getDocs(query(collection(db, 'Teacher'), where('uid', '==', userId)));
        const tById = await getDoc(doc(db, 'Teacher', userId));
        // By email (Gmail/email) or email-as-doc-id
        if (userEmail) {
          const [byGmail, byEmail] = await Promise.all([
            getDocs(query(collection(db, 'Teacher'), where('Gmail', '==', userEmail))),
            getDocs(query(collection(db, 'Teacher'), where('email', '==', userEmail)))
          ]);
          // email as doc id (lowercased)
          const tByEmailId = await getDoc(doc(db, 'Teacher', String(userEmail).toLowerCase()));
          if (tByEmailId.exists()) role = 'Teacher';
          if (!byGmail.empty || !byEmail.empty) role = 'Teacher';
        }
        if (!tByUid.empty || tById.exists()) {
          role = 'Teacher';
          setRoleCache(prev => ({ ...prev, [userId]: 'Teacher' }));
          return 'Teacher';
        }
      } catch { /* ignore */ }
    }

    // Fallback to Students if not identified yet
    if (role === 'User') {
      try {
        const sByUid = await getDocs(query(collection(db, 'Students'), where('uid', '==', userId)));
        const sById = await getDoc(doc(db, 'Students', userId));
        if (!sByUid.empty || sById.exists()) role = 'Student';
        if (role === 'User' && userEmail) {
          const sByEmailId = await getDoc(doc(db, 'Students', String(userEmail).toLowerCase()));
          if (sByEmailId.exists()) role = 'Student';
        }
      } catch { /* ignore */ }
    }

    setRoleCache(prev => ({ ...prev, [userId]: role }));
    return role;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Resolve receiver's role (users/Teacher/Students)
  useEffect(() => {
    const fetchOtherRole = async () => {
      if (!receiverId) return;
      let role = 'User';
      try {
        const uSnap = await getDoc(doc(db, 'users', receiverId));
        if (uSnap.exists()) {
          const d = uSnap.data() || {};
          const r = String(d.role || d.userRole || '').toLowerCase();
          if (r) {
            role = r === 'admin' ? 'Admin' : r.charAt(0).toUpperCase() + r.slice(1);
            setOtherUserRole(role);
            return;
          }
        }
      } catch { /* ignore missing users doc */ }
      try {
        const tByUid = await getDocs(query(collection(db, 'Teacher'), where('uid', '==', receiverId)));
        if (!tByUid.empty || (await getDoc(doc(db, 'Teacher', receiverId))).exists()) {
          setOtherUserRole('Teacher');
          return;
        }
      } catch { /* ignore teacher lookup errors */ }
      try {
        const sByUid = await getDocs(query(collection(db, 'Students'), where('uid', '==', receiverId)));
        if (!sByUid.empty || (await getDoc(doc(db, 'Students', receiverId))).exists()) {
          setOtherUserRole('Student');
          return;
        }
      } catch { /* ignore student lookup errors */ }
      setOtherUserRole('User');
    };
    fetchOtherRole();
  }, [receiverId]);

  // Prefetch roles for any unknown message senders
  useEffect(() => {
    const prefetch = async () => {
      const uniqueSenderIds = Array.from(new Set(messages.map(m => m.senderId).filter(Boolean)));
      for (const uid of uniqueSenderIds) {
        if (!roleCache[uid]) {
          await resolveAndCacheRole(uid);
        }
      }
    };
    if (messages.length > 0) prefetch();
  }, [messages]);

  // Load chat meta (teacherId/studentId) from chat doc when chat id is known
  useEffect(() => {
    const loadChatMeta = async () => {
      const effectiveChatId = propChatId || chatId;
      if (!effectiveChatId) return;
      try {
        const snap = await getDoc(doc(db, 'chats', effectiveChatId));
        if (snap.exists()) {
          const d = snap.data() || {};
          setChatMeta({ teacherId: d.teacherId || null, studentId: d.studentId || null });
        } else {
          setChatMeta({ teacherId: null, studentId: null });
        }
      } catch {
        setChatMeta({ teacherId: null, studentId: null });
      }
    };
    loadChatMeta();
  }, [propChatId, chatId]);

  // Build id variants for teacher and student to handle uid/doc-id mismatches
  useEffect(() => {
    const buildVariants = async () => {
      const tSet = new Set();
      const sSet = new Set();
      if (chatMeta.teacherId) {
        tSet.add(chatMeta.teacherId);
        try {
          const tById = await getDoc(doc(db, 'Teacher', chatMeta.teacherId));
          if (tById.exists()) {
            const tuid = tById.data()?.uid || tById.id;
            tSet.add(String(tuid));
          }
        } catch { /* ignore */ }
        try {
          const tByUid = await getDocs(query(collection(db, 'Teacher'), where('uid', '==', chatMeta.teacherId)));
          if (!tByUid.empty) {
            tSet.add(String(tByUid.docs[0].id));
          }
        } catch { /* ignore */ }
      }
      if (chatMeta.studentId) {
        sSet.add(chatMeta.studentId);
        try {
          const sById = await getDoc(doc(db, 'Students', chatMeta.studentId));
          if (sById.exists()) {
            const suid = sById.data()?.uid || sById.id;
            sSet.add(String(suid));
          }
        } catch { /* ignore */ }
        try {
          const sByUid = await getDocs(query(collection(db, 'Students'), where('uid', '==', chatMeta.studentId)));
          if (!sByUid.empty) {
            sSet.add(String(sByUid.docs[0].id));
          }
        } catch { /* ignore */ }
      }
      setTeacherIdVariants(Array.from(tSet));
      setStudentIdVariants(Array.from(sSet));
    };
    buildVariants();
  }, [chatMeta]);

  useEffect(() => {
    if (!currentUser) return;

    if (propReceiverId) setReceiverId(propReceiverId);

    if (!propChatId) {
      if (!receiverId) return;
      const currentChatId = generateChatId(currentUser.uid, receiverId);
      setChatId(currentChatId);
      createChatDocument(currentChatId, currentUser.uid, receiverId);
    } else {
      setChatId(propChatId);
    }

    if (!chatId && !propChatId) return;
    const effectiveChatId = propChatId || chatId;

    const unsubscribe = subscribeToMessages(effectiveChatId, (msgs) => {
      setMessages(msgs);
      setTimeout(() => scrollToBottom(), 100);
    }, currentUser.uid);

    return () => unsubscribe();
  }, [currentUser, receiverId, propReceiverId, propChatId, chatId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const effectiveChatId = propChatId || chatId;
    if (newMessage.trim() === '' || !effectiveChatId || !currentUser) return;

    try {
      await sendMessage(effectiveChatId, currentUser.uid, receiverId, newMessage);
      setNewMessage('');
      setTimeout(() => scrollToBottom(), 100);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (!currentUser) {
    return <div className="private-chat">Please log in to chat.</div>;
  }

  const renderMessages = () => {
    const messageElements = [];
    let lastDate = null;

    const formatDate = (date) => {
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (date.toDateString() === today.toDateString()) return 'Today';
        if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    messages.forEach(msg => {
      if (msg.timestamp) {
        const messageDate = new Date(msg.timestamp);
        const messageDateString = messageDate.toDateString();
        if (messageDateString !== lastDate) {
          messageElements.push(
            <div key={`date-${messageDateString}`} className="date-separator">
              {formatDate(messageDate)}
            </div>
          );
          lastDate = messageDateString;
        }
      }

      const senderRoleLabel = msg.senderId === currentUser.uid ? currentUserRoleLabel : (roleCache[msg.senderId] || otherUserRole);
      const normalizedSender = String(msg.senderId || '');
      const fromTeacher = teacherIdVariants.includes(normalizedSender);
      const fromStudent = studentIdVariants.includes(normalizedSender);
      
      const nameToShow = msg.senderId === currentUser.uid
        ? 'You'
        : (fromTeacher ? 'Teacher' : (fromStudent ? 'Student' : senderRoleLabel));

      const avatarChar = msg.senderId === currentUser.uid 
        ? 'Y' 
        : nameToShow?.charAt(0) || 'U';

      const roleClass = (msg.senderId === currentUser.uid ? 'you' : senderRoleLabel || 'user').toLowerCase();

      messageElements.push(
        <div key={msg.id} className={`batch-message ${msg.senderId === currentUser.uid ? 'sent' : 'received'}`}>
          <div className={`message-avatar role-${roleClass}`}>
            <span>{avatarChar}</span>
          </div>
          <div className="message-content">
            <div className="sender-name">{nameToShow}</div>
            <div className="message-bubble">
              <p className="bubble-text">{msg.text}</p>
              <span className="bubble-time">
                {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Sending...'}
              </span>
            </div>
          </div>
        </div>
      );
    });

    return messageElements;
  };

  return (
    <div className="batch-broadcast">
      <div className="batch-header">
        <div className="batch-header-info">
          <div className="batch-avatar">
            <span>{activeChat ? activeChat.charAt(0) : 'U'}</span>
          </div>
          <div className="batch-header-text">
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
                onClick={() => { setShowFiles(true); setShowMenu(false); }}
              >
                View Files {fileCount > 0 && <span className="file-count-badge">{fileCount}</span>}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="batch-messages">
        {messages.length === 0 ? (
          <div className="no-messages">No messages yet. Start the conversation!</div>
        ) : (
          <>
            {renderMessages()}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {showBookModal && (
        <BookCallModal
          isOpen={showBookModal}
          onClose={() => setShowBookModal(false)}
          collectionName="privateChatBookings"
        />
      )}
      {showUploadModal && (
        <FileUploadModal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          privateChatId={propChatId || chatId}
          batchId={propChatId || chatId}
          onFileUploaded={() => setShowUploadModal(false)}
        />
      )}
      {showFiles && (
        <div className="modal-overlay">
          <div className="modal-content file-viewer-modal">
            <div className="modal-header">
              <h3>Files - {activeChat || 'Chat'}</h3>
              <button className="modal-close-btn" onClick={() => setShowFiles(false)}>×</button>
            </div>
            <div className="modal-body">
              <FileViewer privateChatId={propChatId || chatId} batchId={propChatId || chatId} userRole={userRole} onFileCountUpdate={(c)=>setFileCount(c)} />
            </div>
          </div>
        </div>
      )}

      <form className="batch-input" onSubmit={handleSendMessage}>
        <div className="batch-input-wrapper">
          {(userRole?.toLowerCase() === 'teacher' || userRole?.toLowerCase() === 'admin') && (
            <button type="button" className="batch-attach-btn" onClick={() => setShowUploadModal(true)} title="Upload File">
              <Paperclip size={18} />
            </button>
          )}
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="batch-text-input"
          />
          <button type="submit" className="batch-send-btn">
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default PrivateChat;

