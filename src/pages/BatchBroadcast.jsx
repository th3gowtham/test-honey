import { Calendar, MoreVertical, Send, Upload, FolderOpen, Paperclip, X } from 'lucide-react';
import "../styles/BatchBroadcast.css";
import BookCallModal from '../components/BookCallModal';
import FileUploadModal from '../components/FileUploadModal';
import FileViewer from '../components/FileViewer';
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

const BatchBroadcast = ({ activeChat }) => {
  const [showBookModal, setShowBookModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showFiles, setShowFiles] = useState(false);
  const [fileCount, setFileCount] = useState(0); // 1. Add this state
  // const [files, setFiles] = useState([]); // Removed as FileViewer handles its own state
  const { userRole } = useAuth();
  const fileInputRef = useRef(null);

  // Extract batch information from activeChat
  const batchId = activeChat?.id || '';
  const batchName = activeChat?.name || 'Unknown Batch';
  const studentCount = activeChat?.students || 25;
  const teacherName = activeChat?.teacher || 'Sarah Johnson';
  const subject = activeChat?.subject || 'Mathematics';

  // Reset files when batch changes
  useEffect(() => {
    // setFiles([]); // No longer needed
    setShowFiles(false);
  }, [batchId]);

  // Remove the files state and related handlers
  // const [files, setFiles] = useState([]);

  const handleFileCountUpdate = (count) => {
    setFileCount(count); // 2. Update the state when notified
  };

  const handleFileUploaded = (newFile) => {
    // Just close the modal, FileViewer will handle the file list
    setShowUploadModal(false);
  };

  const handleFileDeleted = (fileId) => {
    // FileViewer handles its own state, so we don't need to do anything here
    console.log(`File deleted: ${fileId}`);
  };

  // Handle attach button click
  const handleAttachClick = () => {
    console.log('Attach button clicked, userRole:', userRole);
    
    // Only allow teachers and admins to upload files
    if (userRole?.toLowerCase() === 'teacher' || userRole?.toLowerCase() === 'admin') {
      setShowUploadModal(true);
    } else {
      // For students, show files instead
      setShowFiles(!showFiles);
    }
  };

  // Get batch-specific welcome message
  const getWelcomeMessage = () => {
    switch (batchId) {
      case 'Math101':
        return "Good morning! Today we'll cover quadratic equations.";
      case 'Science101':
        return "Welcome to Science 101! Today we'll explore the scientific method.";
      case 'English101':
        return "Welcome to English 101! Today we'll discuss literature analysis.";
      case 'History101':
        return "Welcome to History 101! Today we'll explore ancient civilizations.";
      default:
        return "Welcome to the class! Let's get started.";
    }
  };

  return (
    <div className="batch-broadcast">
      {/* Header */}
      <div className="batch-header">
        <div className="batch-header-info">
          <div className="batch-avatar">
            <span>{batchId.charAt(0)}</span>
          </div>
          <div className="batch-header-text">
            <h2>{batchName}</h2>
            <p>📢 Broadcast • {studentCount} students • {subject}</p>
          </div>
        </div>
        <div className="batch-actions">
          <div>
            
          </div>

          {/* View Files Button */}
          <button 
            className="batch-btn" 
            onClick={() => setShowFiles(true)}
          >
            <FolderOpen size={16} />
            <span>View Files</span>
          </button>
          
          <button className="batch-btn" onClick={() => setShowBookModal(true)}>
            <Calendar size={16} />
            <span>Book Call</span>
          </button>
          <div>
            <button className="batch-more-btn">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="batch-messages">
        <div className="batch-message">
          <div className="message-avatar">
            <span>{batchId.charAt(0)}</span>
          </div>
          <div>
            <div className="message-meta">
              <span className="name">{teacherName}</span>
              <span className="status"></span>
              <span>2:30 PM</span>
            </div>
            <div className="message-bubble">
              <p>{getWelcomeMessage()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="batch-input">
        <div className="batch-input-wrapper">
          {/* Attach button - Only for teachers and admins */}
          {(userRole?.toLowerCase() === 'teacher' || userRole?.toLowerCase() === 'admin') && (
            <button 
              className="batch-attach-btn" 
              onClick={handleAttachClick}
              title="Upload File"
            >
              <Paperclip size={18} />
            </button>
          )}
          <input
            type="text"
            placeholder={`Type your message in ${batchName}...`}
            className="batch-text-input"
          />
          <button className="batch-send-btn">
            <Send size={20} />
          </button>
        </div>
      </div>

      {/* Book Call Modal */}
      <BookCallModal
        isOpen={showBookModal}
        onClose={() => setShowBookModal(false)}
        collectionName="batchBroadcastBookings"
      />

      {/* File Upload Modal */}
      <FileUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        batchId={batchId}
        onFileUploaded={handleFileUploaded}
      />

      {/* File Viewer Modal */}
      {showFiles && (
        <div className="modal-overlay">
          <div className="modal-content file-viewer-modal">
            <div className="modal-header">
              <h3 data-file-count={`${fileCount} file${fileCount !== 1 ? 's' : ''}`}>
                Files - {batchName} 
              </h3>
              <button 
                className="modal-close-btn"
                onClick={() => setShowFiles(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <FileViewer 
                batchId={batchId}
                userRole={userRole}
                onFileDeleted={handleFileDeleted}
                onFileCountUpdate={handleFileCountUpdate}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BatchBroadcast;