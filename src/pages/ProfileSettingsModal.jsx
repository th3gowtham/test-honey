import { User, X } from "lucide-react";
import ProfileTab from "./ProfileTab";
import SettingsTab from "./SettingsTab";
import AccountTab from "./AccountTab";
import "../styles/ProfileSettingsModal.css"

const ProfileSettingsModal = ({ onClose, activeTab, setActiveTab }) => {
  const tabs = ["Profile", "Settings", "Account"];

  return (
    <div className="modal-backdrop">
      {/* Modal Container */}
      <div className="modal-container">
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
              onClick={() => setActiveTab(tab)}
              className={`modal-tab ${activeTab === tab ? "active" : ""}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="modal-content">
          {activeTab === "Profile" && <ProfileTab />}
          {activeTab === "Settings" && <SettingsTab />}
          {activeTab === "Account" && <AccountTab />}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsModal;
