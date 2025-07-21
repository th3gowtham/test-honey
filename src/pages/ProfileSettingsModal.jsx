import { User, X, CheckCircle } from "lucide-react";
import ProfileTab from "./ProfileTab";
import SettingsTab from "./SettingsTab";
import AccountTab from "./AccountTab";
import "../styles/ProfileSettingsModal.css"
import { useState } from "react";
import { toast } from "react-hot-toast";

const ProfileSettingsModal = ({ onClose, activeTab, setActiveTab }) => {
  const tabs = ["Profile", "Settings", "Account"];
  const [showToast, setShowToast] = useState(false);
  const [profileEditMode, setProfileEditMode] = useState(false);
  const [profileDirty, setProfileDirty] = useState(false);

  // Handler to show toast from ProfileTab
  const handleProfileUpdate = () => {
    setShowToast(true);
    setProfileEditMode(false);
    setProfileDirty(false);
    setTimeout(() => setShowToast(false), 2500);
  };

  // Handler to track edit mode and dirty state from ProfileTab
  const handleProfileEditState = (editMode, dirty) => {
    setProfileEditMode(editMode);
    setProfileDirty(dirty);
  };

  // Intercept tab switch if editing and dirty
  const handleTabClick = (tab) => {
    if (activeTab === 'Profile' && profileEditMode && profileDirty) {
      toast.error('Please save your changes before leaving the Profile tab!', {
        duration: 2000,
        style: {
          background: '#ef4444',
          color: '#fff',
          fontWeight: 600,
          fontSize: '1rem'
        }
      });
      return;
    }
    setActiveTab(tab);
  };

  return (
    <div className="modal-backdrop">
      {/* Modal Container */}
      <div className="modal-container">
        {/* Green success bar above profile tab */}
        {showToast && activeTab === "Profile" && false && (
          <div style={{
            position: 'absolute',
            top: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '260px',
            background: '#14b8a6',
            color: '#fff',
            padding: '0.5rem 0',
            textAlign: 'center',
            fontWeight: 600,
            fontSize: '1rem',
            borderRadius: '0.5rem',
            zIndex: 1000,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}>
            <CheckCircle size={22} color="#fff" style={{ marginRight: '0.5em' }} />
            Profile updated successfully!
          </div>
        )}
        {/* Header */}
        <div className="modal-header">
          <div>
            <h2 className="modal-title">
              <User size={20} />
              Profile Settings
            </h2>
            <p className="modal-subtitle">
              Manage your account settings and preferences
            </p>
          </div>
          <button
            onClick={onClose}
            className="modal-close-btn"
            aria-label="Close profile settings modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="modal-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`modal-tab ${activeTab === tab ? "active" : ""}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="modal-content">
          {activeTab === "Profile" && <ProfileTab onProfileUpdate={handleProfileUpdate} onEditStateChange={handleProfileEditState} />}
          {activeTab === "Settings" && <SettingsTab />}
          {activeTab === "Account" && <AccountTab />}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsModal;
