import { User, Phone, MapPin, Camera } from "lucide-react";
import "../styles/ProfileTab.css"

const ProfileTab = () => {
  return (
    <div className="profile-container">
      {/* Profile Overview */}
      <div className="profile-overview">
        <div className="profile-avatar">
          <span className="profile-avatar-initial">J</span>
          <div className="profile-avatar-camera">
            <Camera size={16} color="#ffffff" />
          </div>
        </div>

        <div className="profile-info">
          <h3 className="profile-name">John Doe</h3>
          <span className="profile-role">Student</span>
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
            <span className="info-text">John Doe</span>
          </div>
        </div>

        <div>
          <label className="info-label">Email</label>
          <div className="info-box">
            <span className="info-text">john@honeybee.com</span>
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
