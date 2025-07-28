import { Shield } from "lucide-react";
import "../styles/AccountTab.css";

const AccountTab = () => {
  function Signout() {
    alert("You are signed out");
  }

  return (
    <div className="account-tab">
      {/* Account Info Section */}
      <div>
        <h3 className="account-section-title">
          <Shield size={20} />
          Account Information
        </h3>

        <div className="account-info-grid">
          <div>
            <label className="account-info-label">Account Type</label>
            <p className="account-info-value">Student</p>
          </div>

          <div>
            <label className="account-info-label">Member Since</label>
            <p className="account-info-value">January 2024</p>
          </div>

          <div>
            <label className="account-info-label">Last Login</label>
            <p className="account-info-value">Today, 2:30 PM</p>
          </div>

          <div>
            <label className="account-info-label">Status</label>
            <span className="account-status-active">Active</span>
          </div>
        </div>
      </div>

      {/* Danger Zone Section */}
      <div className="danger-zone">
        <h3 className="danger-zone-title">Danger Zone</h3>
        <p className="danger-zone-text">
          These actions cannot be undone
        </p>

        <button onClick={Signout} className="sign-out-button">
          <span className="sign-out-icon">▷</span>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default AccountTab;