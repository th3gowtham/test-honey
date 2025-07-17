import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";

import Sidebar from "./pages/Sidebar";
import WelcomeScreen from './pages/WelcomeScreen';
import PrivateChat from './pages/PrivateChat';
import AnnouncementsView from './pages/AnnouncementsView';
import NotificationModal from "./pages/NotificationModal";
import ProfileSettingsModal from './pages/ProfileSettingsModal';
import BatchBroadcast from "./pages/BatchBroadcast";

const ChatApp = () => {
  const [currentView, setCurrentView] = useState('welcome'); // which tab is active (batch, private, announcements)
  const [activeChat, setActiveChat] = useState(null); // which chat is selected (Math 101, Sarah Johnson, etc)
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const [profileTab, setProfileTab] = useState('Profile');
  const [isMobileView, setIsMobileView] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowSidebar(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <div className={`${showSidebar ? 'block' : 'hidden'} md:block ${isMobileView ? 'w-full' : ''}`}>
        <Sidebar
          currentView={currentView}
          setCurrentView={(view) => {
            setCurrentView(view);
            setActiveChat(null); // reset chat when switching tabs
          }}
          setActiveChat={(chat) => {
            setActiveChat(chat);
            if (isMobileView) setShowSidebar(false); // close sidebar on mobile after selecting a chat
          }}
        />
      </div>

      {/* Main Content */}
      <main className={`flex-1 flex flex-col min-h-screen overflow-hidden  ${!showSidebar ? 'block' : 'hidden'} md:block`}>
        {/* 🆕 Mobile Back Button */}
        {isMobileView && activeChat && (
          <button
            onClick={() => setShowSidebar(true)}
            className="absolute top-4 left-4 z-50 p-2 bg-white rounded-full shadow-lg md:hidden"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      <div className="absolute top-5 right-4 sm:right-6 lg:right-8 cursor-pointer z-40 flex items-center"
        onClick={() => setShowNotifications(true)}>
          <div className="p-3 pt-1.5 ">
            <Bell className="w-6 h-6 sm:w-7 sm:h-7 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100" /></div>
        
      </div>

      {/* 🐝 Profile Icon */}
      <div
        className="absolute top-4 left-4 sm:top-5 sm:left-5 w-10 h-10 sm:w-12 sm:h-12 bg-yellow-500 rounded-full flex items-center justify-center cursor-pointer z-40"
        onClick={() => setShowProfileSettings(true)}
      >
        <span className="text-white font-bold text-lg sm:text-xl">🐝</span>
      </div>

      {/* Modals */}
      {showNotifications && (
        <NotificationModal onClose={() => setShowNotifications(false)} />
      )}
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
