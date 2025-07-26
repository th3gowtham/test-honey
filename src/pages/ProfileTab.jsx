import { User, Phone, MapPin, Camera } from "lucide-react";
import "../styles/ProfileTab.css"
import { useAuth } from "../context/AuthContext";

const ProfileTab = () => {
  const { userName, user, currentUser, userRole } = useAuth();
  return (
    <div className="profile-container">
      {/* Profile Overview */}
      <div className="profile-overview">
        <div className="profile-avatar">
          <span className="profile-avatar-initial">{userName ? userName.charAt(0) : currentUser?.displayName?.charAt(0) || 'U'}</span>
          <div className="profile-avatar-camera">
            <Camera size={16} color="#ffffff" />
          </div>
        </div>

        <div className="profile-info">
          <h3 className="profile-name">{userName || currentUser?.displayName || 'User'}</h3>
          <span className="profile-role">{userRole || 'Student'}</span>
          <p className="profile-description">
            Learner with access to enrolled batches
          </p>
        </div>

        <div className="w-full sm:w-auto sm:ml-auto">
          <button className="edit-button">Edit Profile</button>
        </div>
      </div>

      {/* Info Grid */}
      <div className="info-grid">
        <div>
          <label className="info-label">Full Name</label>
          <div className="info-box">
            <User size={16} color="#9ca3af" />
            <span className="info-text">{userName || currentUser?.displayName || 'User'}</span>
          </div>
        </div>

        <div>
          <label className="info-label">Email</label>
          <div className="info-box">
            <span className="info-text">{user?.email || currentUser?.email || 'No email available'}</span>
          </div>
        </div>

        <div>
          <label className="info-label">Phone</label>
          <div className="info-box">
            <Phone size={16} color="#9ca3af" />
            <input
              type="text"
              placeholder="Enter phone number"
              className="info-input"
            />
          </div>
        </div>

        <div>
          <label className="info-label">Location</label>
          <div className="info-box">
            <MapPin size={16} color="#9ca3af" />
            <input
              type="text"
              placeholder="Enter location"
              className="info-input"
            />
          </div>
        </div>
      </div>

      {/* Bio */}
      <div>
        <label className="info-label">Bio</label>
        <textarea
          placeholder="Tell us about yourself..."
          className="bio-textarea"
        />
      </div>

      {/* Enrolled Batches */}
      <div>
        <label className="info-label">Enrolled Batches</label>
        <div className="enrolled-batches">
          <span className="enrolled-tag">✓ math-101</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
