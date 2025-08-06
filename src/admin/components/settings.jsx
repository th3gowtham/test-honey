"use client"

import { useState } from "react"
import { FiSave, FiUser, FiMail, FiPhone, FiLock, FiGlobe, FiBell, FiShield } from "react-icons/fi"

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general")
  const [generalSettings, setGeneralSettings] = useState({
    platformName: "EduAdmin",
    platformDescription: "Educational Management Platform",
    timezone: "UTC-5",
    language: "English",
    dateFormat: "MM/DD/YYYY",
    currency: "USD",
  })

  const [profileSettings, setProfileSettings] = useState({
    name: "Admin User",
    email: "admin@eduadmin.com",
    phone: "+1234567890",
    role: "Super Admin",
    bio: "Platform administrator with full access to all features.",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    weeklyReports: true,
    systemAlerts: true,
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: "30",
    passwordExpiry: "90",
    loginAttempts: "5",
  })

  const handleSaveGeneral = () => {
    // Save general settings logic
    alert("General settings saved successfully!")
  }

  const handleSaveProfile = () => {
    // Save profile settings logic
    alert("Profile settings saved successfully!")
  }

  const handleSaveNotifications = () => {
    // Save notification settings logic
    alert("Notification settings saved successfully!")
  }

  const handleSaveSecurity = () => {
    // Save security settings logic
    alert("Security settings saved successfully!")
  }

  const tabs = [
    { id: "general", label: "General", icon: FiGlobe },
    { id: "profile", label: "Profile", icon: FiUser },
    { id: "notifications", label: "Notifications", icon: FiBell },
    { id: "security", label: "Security", icon: FiShield },
  ]

  return (
    <div className="settings">
      <div className="page-header">
        <h2>Settings</h2>
        <p>Manage your platform and account settings</p>
      </div>

      <div className="settings-container">
        <div className="settings-sidebar">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        <div className="settings-content">
          {activeTab === "general" && (
            <div className="settings-section">
              <div className="section-header">
                <h3>General Settings</h3>
                <p>Configure basic platform settings</p>
              </div>

              <div className="settings-form">
                <div className="form-group">
                  <label className="form-label">Platform Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={generalSettings.platformName}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, platformName: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Platform Description</label>
                  <textarea
                    className="form-textarea"
                    rows={3}
                    value={generalSettings.platformDescription}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, platformDescription: e.target.value })}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Timezone</label>
                    <select
                      className="form-select"
                      value={generalSettings.timezone}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, timezone: e.target.value })}
                    >
                      <option value="UTC-5">UTC-5 (Eastern)</option>
                      <option value="UTC-6">UTC-6 (Central)</option>
                      <option value="UTC-7">UTC-7 (Mountain)</option>
                      <option value="UTC-8">UTC-8 (Pacific)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Language</label>
                    <select
                      className="form-select"
                      value={generalSettings.language}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, language: e.target.value })}
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Date Format</label>
                    <select
                      className="form-select"
                      value={generalSettings.dateFormat}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, dateFormat: e.target.value })}
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Currency</label>
                    <select
                      className="form-select"
                      value={generalSettings.currency}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, currency: e.target.value })}
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="CAD">CAD (C$)</option>
                    </select>
                  </div>
                </div>

                <button className="btn btn-primary" onClick={handleSaveGeneral}>
                  <FiSave /> Save General Settings
                </button>
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="settings-section">
              <div className="section-header">
                <h3>Profile Settings</h3>
                <p>Manage your personal information</p>
              </div>

              <div className="settings-form">
                <div className="profile-avatar-section">
                  <div className="profile-avatar-large">
                    <FiUser />
                  </div>
                  <button className="btn btn-secondary">Change Avatar</button>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <FiUser /> Full Name
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={profileSettings.name}
                    onChange={(e) => setProfileSettings({ ...profileSettings, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <FiMail /> Email Address
                  </label>
                  <input
                    type="email"
                    className="form-input"
                    value={profileSettings.email}
                    onChange={(e) => setProfileSettings({ ...profileSettings, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <FiPhone /> Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-input"
                    value={profileSettings.phone}
                    onChange={(e) => setProfileSettings({ ...profileSettings, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Role</label>
                  <input type="text" className="form-input" value={profileSettings.role} disabled />
                </div>

                <div className="form-group">
                  <label className="form-label">Bio</label>
                  <textarea
                    className="form-textarea"
                    rows={4}
                    value={profileSettings.bio}
                    onChange={(e) => setProfileSettings({ ...profileSettings, bio: e.target.value })}
                  />
                </div>

                <button className="btn btn-primary" onClick={handleSaveProfile}>
                  <FiSave /> Save Profile Settings
                </button>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="settings-section">
              <div className="section-header">
                <h3>Notification Settings</h3>
                <p>Configure how you receive notifications</p>
              </div>

              <div className="settings-form">
                <div className="notification-group">
                  <h4>Communication Preferences</h4>

                  <div className="toggle-group">
                    <label className="toggle-label">
                      <input
                        type="checkbox"
                        checked={notificationSettings.emailNotifications}
                        onChange={(e) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            emailNotifications: e.target.checked,
                          })
                        }
                      />
                      <span className="toggle-switch"></span>
                      <div className="toggle-content">
                        <span className="toggle-title">Email Notifications</span>
                        <span className="toggle-description">Receive notifications via email</span>
                      </div>
                    </label>
                  </div>

                  <div className="toggle-group">
                    <label className="toggle-label">
                      <input
                        type="checkbox"
                        checked={notificationSettings.pushNotifications}
                        onChange={(e) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            pushNotifications: e.target.checked,
                          })
                        }
                      />
                      <span className="toggle-switch"></span>
                      <div className="toggle-content">
                        <span className="toggle-title">Push Notifications</span>
                        <span className="toggle-description">Receive browser push notifications</span>
                      </div>
                    </label>
                  </div>

                  <div className="toggle-group">
                    <label className="toggle-label">
                      <input
                        type="checkbox"
                        checked={notificationSettings.smsNotifications}
                        onChange={(e) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            smsNotifications: e.target.checked,
                          })
                        }
                      />
                      <span className="toggle-switch"></span>
                      <div className="toggle-content">
                        <span className="toggle-title">SMS Notifications</span>
                        <span className="toggle-description">Receive notifications via text message</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="notification-group">
                  <h4>System Notifications</h4>

                  <div className="toggle-group">
                    <label className="toggle-label">
                      <input
                        type="checkbox"
                        checked={notificationSettings.weeklyReports}
                        onChange={(e) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            weeklyReports: e.target.checked,
                          })
                        }
                      />
                      <span className="toggle-switch"></span>
                      <div className="toggle-content">
                        <span className="toggle-title">Weekly Reports</span>
                        <span className="toggle-description">Receive weekly platform activity reports</span>
                      </div>
                    </label>
                  </div>

                  <div className="toggle-group">
                    <label className="toggle-label">
                      <input
                        type="checkbox"
                        checked={notificationSettings.systemAlerts}
                        onChange={(e) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            systemAlerts: e.target.checked,
                          })
                        }
                      />
                      <span className="toggle-switch"></span>
                      <div className="toggle-content">
                        <span className="toggle-title">System Alerts</span>
                        <span className="toggle-description">Receive important system notifications</span>
                      </div>
                    </label>
                  </div>
                </div>

                <button className="btn btn-primary" onClick={handleSaveNotifications}>
                  <FiSave /> Save Notification Settings
                </button>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="settings-section">
              <div className="section-header">
                <h3>Security Settings</h3>
                <p>Manage your account security preferences</p>
              </div>

              <div className="settings-form">
                <div className="security-group">
                  <h4>Authentication</h4>

                  <div className="toggle-group">
                    <label className="toggle-label">
                      <input
                        type="checkbox"
                        checked={securitySettings.twoFactorAuth}
                        onChange={(e) =>
                          setSecuritySettings({
                            ...securitySettings,
                            twoFactorAuth: e.target.checked,
                          })
                        }
                      />
                      <span className="toggle-switch"></span>
                      <div className="toggle-content">
                        <span className="toggle-title">Two-Factor Authentication</span>
                        <span className="toggle-description">Add an extra layer of security to your account</span>
                      </div>
                    </label>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <FiLock /> Change Password
                    </label>
                    <button className="btn btn-secondary">Update Password</button>
                  </div>
                </div>

                <div className="security-group">
                  <h4>Session Management</h4>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Session Timeout (minutes)</label>
                      <select
                        className="form-select"
                        value={securitySettings.sessionTimeout}
                        onChange={(e) =>
                          setSecuritySettings({
                            ...securitySettings,
                            sessionTimeout: e.target.value,
                          })
                        }
                      >
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="120">2 hours</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Password Expiry (days)</label>
                      <select
                        className="form-select"
                        value={securitySettings.passwordExpiry}
                        onChange={(e) =>
                          setSecuritySettings({
                            ...securitySettings,
                            passwordExpiry: e.target.value,
                          })
                        }
                      >
                        <option value="30">30 days</option>
                        <option value="60">60 days</option>
                        <option value="90">90 days</option>
                        <option value="180">180 days</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Max Login Attempts</label>
                    <select
                      className="form-select"
                      value={securitySettings.loginAttempts}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          loginAttempts: e.target.value,
                        })
                      }
                    >
                      <option value="3">3 attempts</option>
                      <option value="5">5 attempts</option>
                      <option value="10">10 attempts</option>
                    </select>
                  </div>
                </div>

                <button className="btn btn-primary" onClick={handleSaveSecurity}>
                  <FiSave /> Save Security Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .settings {
          max-width: 1400px;
        }

        .page-header {
          margin-bottom: 32px;
        }

        .page-header h2 {
          font-size: 32px;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 8px;
        }

        .page-header p {
          color: #718096;
          font-size: 16px;
        }

        .settings-container {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 32px;
        }

        .settings-sidebar {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
          height: fit-content;
        }

        .tab-button {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          border: none;
          background: none;
          text-align: left;
          cursor: pointer;
          border-radius: 12px;
          transition: all 0.2s ease;
          color: #4a5568;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 8px;
        }

        .tab-button:hover {
          background-color: #f7fafc;
          color: #2d3748;
        }

        .tab-button.active {
          background-color: #ebf8ff;
          color: #4299e1;
        }

        .tab-button:last-child {
          margin-bottom: 0;
        }

        .settings-content {
          background: white;
          border-radius: 16px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
        }

        .settings-section {
          padding: 32px;
        }

        .section-header {
          margin-bottom: 32px;
          padding-bottom: 16px;
          border-bottom: 1px solid #e2e8f0;
        }

        .section-header h3 {
          font-size: 24px;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 8px;
        }

        .section-header p {
          color: #718096;
          font-size: 16px;
        }

        .settings-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .profile-avatar-section {
          display: flex;
          align-items: center;
          gap: 24px;
          padding: 24px;
          background-color: #f7fafc;
          border-radius: 12px;
          margin-bottom: 8px;
        }

        .profile-avatar-large {
          width: 80px;
          height: 80px;
          background-color: #4299e1;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 32px;
        }

        .notification-group,
        .security-group {
          padding: 24px;
          background-color: #f7fafc;
          border-radius: 12px;
          margin-bottom: 16px;
        }

        .notification-group h4,
        .security-group h4 {
          font-size: 18px;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 16px;
        }

        .toggle-group {
          margin-bottom: 16px;
        }

        .toggle-label {
          display: flex;
          align-items: center;
          gap: 16px;
          cursor: pointer;
          padding: 16px;
          border-radius: 8px;
          transition: background-color 0.2s ease;
        }

        .toggle-label:hover {
          background-color: #e2e8f0;
        }

        .toggle-label input[type="checkbox"] {
          display: none;
        }

        .toggle-switch {
          position: relative;
          width: 48px;
          height: 24px;
          background-color: #cbd5e0;
          border-radius: 12px;
          transition: background-color 0.2s ease;
          flex-shrink: 0;
        }

        .toggle-switch::after {
          content: '';
          position: absolute;
          top: 2px;
          left: 2px;
          width: 20px;
          height: 20px;
          background-color: white;
          border-radius: 50%;
          transition: transform 0.2s ease;
        }

        .toggle-label input[type="checkbox"]:checked + .toggle-switch {
          background-color: #127d8e;
        }

        .toggle-label input[type="checkbox"]:checked + .toggle-switch::after {
          transform: translateX(24px);
        }

        .toggle-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .toggle-title {
          font-weight: 500;
          color: #2d3748;
        }

        .toggle-description {
          font-size: 14px;
          color: #718096;
        }

        .view-all-btn {
          color: #127d8e;
        }

        .view-all-btn:hover {
          color: #0f6b7a;
        }

        @media (max-width: 768px) {
          .settings-container {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .page-header h2 {
            font-size: 24px;
          }

          .settings-section {
            padding: 24px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .profile-avatar-section {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  )
}
