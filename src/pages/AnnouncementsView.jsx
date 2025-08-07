import { Calendar, MoreVertical, Bell } from "lucide-react";
import "../styles/AnnouncementsView.css";
import { useState, useEffect, useRef } from "react";
import BookCallModal from '../components/BookCallModal';
const AnnouncementsView = () => {
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
  return (
    <div className="announcements-container">
      {/* Header */}
      <div className="announcements-header">
        <div className="announcements-header-info">
          <div className="announcements-avatar">A</div>
          <div className="announcements-header-text">
            <h2>Community Announcements</h2>
            <p>🔔 Stay updated with the latest updates</p>
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
      <div className="announcements-list">
        {/* Announcement Card */}
        <div className="announcement-card">
          <div className="announcement-header">
            <div className="announcement-avatar avatar-red">A</div>
            <div className="announcement-info">
              <span className="announcement-author">Admin</span>
              <span className="announcement-time">Yesterday</span>
            </div>
          </div>
          <p className="announcement-text">
            🎉 Welcome to the new academic year! We are excited to have you all here.
          </p>
        </div>

        {/* Second Announcement */}
        <div className="announcement-card">
          <div className="announcement-header">
            <div className="announcement-avatar avatar-orange">A</div>
            <div className="announcement-info">
              <span className="announcement-author">Admin</span>
              <span className="announcement-time">2 hours ago</span>
            </div>
          </div>
          <p className="announcement-text">
            ⚠️ Important: School will be closed on Monday due to maintenance work.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="announcements-footer">
        <p className="announcements-footer-text">
          Only admins can send community announcements
        </p>
      </div>
    </div>
  );
};

export default AnnouncementsView;

