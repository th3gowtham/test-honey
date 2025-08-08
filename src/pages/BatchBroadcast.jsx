import { MoreVertical, Send, Paperclip, X } from 'lucide-react';
import "../styles/BatchBroadcast.css";
import BookCallModal from '../components/BookCallModal';
import FileUploadModal from '../components/FileUploadModal';
import FileViewer from '../components/FileViewer';
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../services/firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, getDoc, doc } from 'firebase/firestore';

const BatchBroadcast = ({ activeChat }) => {
  const { currentUser, userRole } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showBookModal, setShowBookModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showFiles, setShowFiles] = useState(false);
  const [fileCount, setFileCount] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const messagesEndRef = useRef(null);

  const { id: batchId, name: batchName, students: studentCount, subject } = activeChat || {};

  // Scroll to the bottom of the messages container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch messages in real-time
  useEffect(() => {
    if (!batchId) return;

    const messagesRef = collection(db, 'batches', batchId, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Convert Firestore timestamp to JS Date object
        timestamp: doc.data().timestamp?.toDate()
      }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [batchId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    try {
      // First get the batch document to get all receiver IDs
      const batchDoc = await getDoc(doc(db, 'batches', batchId));
      if (!batchDoc.exists()) {
        console.error('Batch not found');
        return;
      }
      
      const batchData = batchDoc.data();
      const receiverIds = (Array.isArray(batchData.receiverIds) && batchData.receiverIds.length > 0)
        ? batchData.receiverIds
        : Array.from(new Set([
            batchData.teacherId,
            batchData.receiverId,
            ...(Array.isArray(batchData.students) ? batchData.students : [])
          ].filter(Boolean)));
      
      // Save the message with all receiver IDs
      const messagesRef = collection(db, 'batches', batchId, 'messages');
      await addDoc(messagesRef, {
        text: newMessage,
        senderId: currentUser.uid,
        senderName: currentUser.displayName || (currentUser.email ? currentUser.email.split('@')[0] : 'User'),
        senderRole: userRole || 'student',
        receiverIds: receiverIds, // Store all receiver IDs with the message
        timestamp: serverTimestamp(),
      });
      
      setNewMessage('');
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  const handleFileUploaded = () => setShowUploadModal(false);
  const handleFileCountUpdate = (count) => setFileCount(count);

  // Handle clicks outside of the dropdown menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="batch-broadcast">
      <div className="batch-header">
        <div className="batch-header-info">
          <div className="batch-avatar">
            <span>{batchName?.charAt(0)}</span>
          </div>
          <div className="batch-header-text">
            <h2>{batchName}</h2>
            <p>📢 Broadcast • {studentCount} students • {subject}</p>
          </div>
        </div>
        <div className="session-btn-dropdown-container" ref={menuRef}>
          <button className="session-btn-dropdown-toggle" onClick={() => setShowMenu(p => !p)}>
            <MoreVertical size={23} />
          </button>
          {showMenu && (
            <div className="session-btn-dropdown-menu">
              <button className="session-btn-dropdown-item" onClick={() => { setShowBookModal(true); setShowMenu(false); }}>Book Session</button>
              <button className="session-btn-dropdown-item" onClick={() => { setShowFiles(true); setShowMenu(false); }}>
                View Files {fileCount > 0 && <span className="file-count-badge">{fileCount}</span>}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="batch-messages">
        {messages.map(msg => {
          const senderRoleLower = (msg.senderRole || '').toLowerCase();
          const viewerRoleLower = (userRole || '').toLowerCase();

          const nameToShow = senderRoleLower === 'admin'
            ? 'Admin'
            : viewerRoleLower === 'admin'
              ? (msg.senderName || 'User')
              : (msg.senderId === currentUser.uid)
                ? 'You'
                : senderRoleLower === 'teacher'
                  ? 'Teacher'
                  : senderRoleLower === 'student'
                    ? 'Student'
                    : 'User';

          const avatarChar = senderRoleLower === 'admin'
            ? 'A'
            : viewerRoleLower === 'admin'
              ? (msg.senderName?.charAt(0) || 'U')
              : (msg.senderId === currentUser.uid)
                ? 'Y'
                : senderRoleLower === 'teacher'
                  ? 'T'
                  : senderRoleLower === 'student'
                    ? 'S'
                    : 'U';

          return (
            <div key={msg.id} className={`batch-message ${msg.senderId === currentUser.uid ? 'sent' : 'received'}`}>
              <div className="message-avatar">
                <span>{avatarChar}</span>
              </div>
              <div>
                <div className="message-meta">
                  <span className="name">{nameToShow}</span>
                  <span className="timestamp">{msg.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="message-bubble">
                  <p>{msg.text}</p>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <form className="batch-input" onSubmit={handleSendMessage}>
        <div className="batch-input-wrapper">
          {(userRole?.toLowerCase() === 'teacher' || userRole?.toLowerCase() === 'admin') && (
            <button type="button" className="batch-attach-btn" onClick={() => setShowUploadModal(true)} title="Upload File">
              <Paperclip size={18} />
            </button>
          )}
          <input
            type="text"
            placeholder={`Type your message in ${batchName}...`}
            className="batch-text-input"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="submit" className="batch-send-btn">
            <Send size={20} />
          </button>
        </div>
      </form>

      <BookCallModal isOpen={showBookModal} onClose={() => setShowBookModal(false)} collectionName="batchBroadcastBookings" />
      <FileUploadModal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)} batchId={batchId} onFileUploaded={handleFileUploaded} />

      {showFiles && (
        <div className="modal-overlay">
          <div className="modal-content file-viewer-modal">
            <div className="modal-header">
              <h3 data-file-count={`${fileCount} file${fileCount !== 1 ? 's' : ''}`}>
                Files - {batchName}
              </h3>
              <button className="modal-close-btn" onClick={() => setShowFiles(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <FileViewer batchId={batchId} userRole={userRole} onFileCountUpdate={handleFileCountUpdate} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BatchBroadcast;