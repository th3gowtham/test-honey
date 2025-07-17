import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";

import Sidebar from "./pages/Sidebar";
import WelcomeScreen from './pages/WelcomeScreen';
import PrivateChat from './pages/PrivateChat';
import AnnouncementsView from './pages/AnnouncementsView';
import NotificationModal from "./pages/NotificationModal";
import ProfileSettingsModal from './pages/ProfileSettingsModal';
import BatchBroadcast from "./pages/BatchBroadcast";
import "./styles/ChatApp.css"

const ChatApp = () => {
  const [currentView, setCurrentView] = useState('welcome');
  const [activeChat, setActiveChat] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const [profileTab, setProfileTab] = useState('Profile');
  const [isMobileView, setIsMobileView] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
      if (window.innerWidth >= 768) setShowSidebar(true);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="chat-app">
      {/* Sidebar */}
      <div className={`chat-sidebar ${showSidebar ? '' : 'hidden'} ${isMobileView ? 'mobile' : ''}`}>
        <Sidebar
          currentView={currentView}
          setCurrentView={(view) => {
            setCurrentView(view);
            setActiveChat(null);
          }}
          setActiveChat={(chat) => {
            setActiveChat(chat);
            if (isMobileView) setShowSidebar(false);
          }}
        />
      </div>

      {/* Main Content */}
      <main className={`chat-main ${!showSidebar ? 'hidden' : ''}`}>
        {isMobileView && activeChat && (
          <button
            onClick={() => setShowSidebar(true)}
            className="chat-back-btn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        {activeChat === null && <WelcomeScreen />}
        {activeChat === 'Math 101 Batch' && <BatchBroadcast />}
        {activeChat === 'Sarah Johnson' && <PrivateChat />}
        {activeChat === 'Community Announcements' && <AnnouncementsView />}
      </main>

      {/* 🔔 Notification Icon */}
      <div className="chat-notification" onClick={() => setShowNotifications(true)}>
        <div className="icon-wrapper">
          <Bell />
        </div>
      </div>

      {/* 🐝 Profile Icon */}
      <div
        className="chat-profile"
        onClick={() => setShowProfileSettings(true)}
      >
        <span>🐝</span>
      </div>

      {/* Modals */}
      {showNotifications && <NotificationModal onClose={() => setShowNotifications(false)} />}
      {showProfileSettings && (
        <ProfileSettingsModal
          onClose={() => setShowProfileSettings(false)}
          activeTab={profileTab}
          setActiveTab={setProfileTab}
        />
      )}
    </div>
  );
};

export default ChatApp;
