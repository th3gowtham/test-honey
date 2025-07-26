import React, { useState, useEffect } from "react";
import { Bell, ArrowLeft } from "lucide-react";

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
  const [isBottomNavVisible, setIsBottomNavVisible] = useState(false);
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
          setProfileTab={setProfileTab}
          setShowProfileSettings={setShowProfileSettings}
        />
      </div>
      <main className="chat-main">
        {isMobileView && activeChat && (
          <button
            onClick={() => {
              setShowSidebar(true);
              setActiveChat(null);
            }}
            className="chat-back-btn"
          >
            <ArrowLeft size={24} color="black" strokeWidth={2} />
          </button>
        )}

        {!activeChat && <WelcomeScreen />}
        {activeChat === 'Math 101 Batch' && <BatchBroadcast />}
        {activeChat === 'Sarah Johnson' && <PrivateChat />}
        {activeChat === 'Community Announcements' && <AnnouncementsView />}
      </main>

      {/* 🔔 Notification Icon */}
      {!activeChat && (
        <div className="chat-notification" onClick={() => setShowNotifications(true)}>
      <Bell />
      </div>
      )}
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
