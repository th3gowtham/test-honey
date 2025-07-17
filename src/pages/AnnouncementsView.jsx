import { Megaphone } from "lucide-react";
import "../styles/AnnouncementsView.css"

const AnnouncementsView = () => {
  return (
    <div className="announcements-container">
      {/* Header */}
      <div className="announcements-header">
        <h1 className="announcements-title">
          <Megaphone size={20} color="#0d9488" /> {/* teal-600 */}
          Community Announcements
        </h1>
        <p className="announcements-subtitle">
          🔔 Stay updated with the latest updates
        </p>
      </div>

      {/* Announcements Section */}
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
