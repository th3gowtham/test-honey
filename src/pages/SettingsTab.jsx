import React, { useState, useEffect } from "react";
import "../styles/SettingsTab.css";
import { toast } from "react-hot-toast";
import { db } from '../firebaseprofile.js';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { Save } from "lucide-react";

const userEmail = "testuser@example.com"; // TODO: Replace with real user email from auth context
const defaultSettings = { message: true, booking: true, announcement: false, email: true, darkMode: false, soundEffects: true };

const SettingsTab = () => {
  const [preferences, setPreferences] = useState(defaultSettings);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const docRef = doc(db, 'settings', userEmail);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setPreferences({ ...defaultSettings, ...docSnap.data() });
      } catch (err) {
        toast.error('Failed to load settings');
        console.error(err);
      }
    }
    fetchSettings();
  }, []);

  const handleToggle = (key) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    try {
      await setDoc(doc(db, 'settings', userEmail), preferences, { merge: true });
      toast.success("Settings saved successfully!", {
        duration: 2000,
        style: {
          background: "#14b8a6",
          color: "#fff",
          fontWeight: 600,
          fontSize: "1rem"
        }
      });
    } catch (err) {
      toast.error("Failed to update settings!", {
        duration: 2000,
        style: {
          background: "#ef4444",
          color: "#fff",
          fontWeight: 600,
          fontSize: "1rem"
        }
      });
      console.error(err);
    }
  };

  return (
    <div className="settings-tab">
      <div className="settings-section">
        <h3>Notification Preferences</h3>
        <p>Manage how you receive notifications from Honeybee.</p>

        <div className="preference-item">
          <div className="preference-text">
            <h4>Message Notifications</h4>
            <p>Get notified about new messages</p>
          </div>
          <input
            type="checkbox"
            checked={preferences.message}
            onChange={() => handleToggle("message")}
          />
        </div>

        <div className="preference-item">
          <div className="preference-text">
            <h4>Booking Notifications</h4>
            <p>Get notified about booking requests and updates</p>
          </div>
          <input
            type="checkbox"
            checked={preferences.booking}
            onChange={() => handleToggle("booking")}
          />
        </div>

        <div className="preference-item">
          <div className="preference-text">
            <h4>Announcement Notifications</h4>
            <p>Get notified about community announcements</p>
          </div>
          <input
            type="checkbox"
            checked={preferences.announcement}
            onChange={() => handleToggle("announcement")}
          />
        </div>

        <div className="preference-item">
          <div className="preference-text">
            <h4>Email Notifications</h4>
            <p>Receive notifications via email</p>
          </div>
          <input
            type="checkbox"
            checked={preferences.email}
            onChange={() => handleToggle("email")}
          />
        </div>
      </div>

      {/* App Preferences Section */}
      <div className="settings-section">
        <h3>App Preferences</h3>
        <p>Customize your app experience</p>

        <div className="preference-item">
          <div className="preference-text">
            <h4>Dark Mode</h4>
            <p>Switch to dark theme</p>
          </div>
          <input
            type="checkbox"
            checked={preferences.darkMode}
            onChange={() => handleToggle("darkMode")}
          />
        </div>

        <div className="preference-item">
          <div className="preference-text">
            <h4>Sound Effects</h4>
            <p>Play sounds for notifications</p>
          </div>
          <input
            type="checkbox"
            checked={preferences.soundEffects}
            onChange={() => handleToggle("soundEffects")}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", marginTop: "1.5rem" }}>
          <button className="save-button" onClick={handleSave} style={{
            backgroundColor: "#059669", // green-600
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5em",
            fontWeight: 600,
            fontSize: "1rem",
            border: "none",
            borderRadius: "0.5rem",
            padding: "0.6rem 1.5rem",
            minWidth: "120px"
          }}>
            <Save size={20} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
export default SettingsTab;