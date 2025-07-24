import { Bell, Settings } from "lucide-react";
import { useState } from "react";
import ToggleSwitch from "../components/ToggleSwitch.jsx";
import "../styles/SettingsTab.css"

const SettingsTab = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [soundEffects, setSoundEffects] = useState(false);
  const [emailNotification, setEmailNotification] = useState(false);
  const [announcementNotification, setAnnouncementNotification] = useState(false);
  const [booking, setBooking] = useState(true);
  const [message, setMessage] = useState(false);

  return (
    <div className="settings-tab">
      {/* Notifications Section */}
      <section className="settings-section">
        <h3>
          <Bell className="icon" />
          Notification Preferences
        </h3>
        <p>Choose what notifications you want to receive</p>

        <div className="preferences">
          {[
            {
              label: "Message Notifications",
              desc: "Get notified about new messages",
              value: message,
              toggle: () => setMessage(!message),
            },
            {
              label: "Booking Notifications",
              desc: "Get notified about booking requests and updates",
              value: booking,
              toggle: () => setBooking(!booking),
            },
            {
              label: "Announcement Notifications",
              desc: "Get notified about community announcements",
              value: announcementNotification,
              toggle: () => setAnnouncementNotification(!announcementNotification),
            },
            {
              label: "Email Notifications",
              desc: "Receive notifications via email",
              value: emailNotification,
              toggle: () => setEmailNotification(!emailNotification),
            },
          ].map((item, idx) => (
            <div key={idx} className="preference-item">
              <div className="preference-text">
                <h4>{item.label}</h4>
                <p>{item.desc}</p>
              </div>
              <ToggleSwitch isOn={item.value} onToggle={item.toggle} />
            </div>
          ))}
        </div>
      </section>

      {/* App Preferences Section */}
      <section className="settings-section">
        <h3>
          <Settings className="icon" />
          App Preferences
        </h3>

        <div className="preferences">
          {[
            {
              label: "Dark Mode",
              desc: "Switch to dark theme",
              value: darkMode,
              toggle: () => setDarkMode(!darkMode),
            },
            {
              label: "Sound Effects",
              desc: "Play sounds for notifications",
              value: soundEffects,
              toggle: () => setSoundEffects(!soundEffects),
            },
          ].map((item, idx) => (
            <div key={idx} className="preference-item">
              <div className="preference-text">
                <h4>{item.label}</h4>
                <p>{item.desc}</p>
              </div>
              <ToggleSwitch isOn={item.value} onToggle={item.toggle} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SettingsTab;
