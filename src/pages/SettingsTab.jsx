import { Bell, Settings } from "lucide-react";
import { useState } from "react";
import ToggleSwitch from "../components/ToggleSwitch.jsx";

const SettingsTab = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [soundEffects, setSoundEffects] = useState(false);
  const [emailNotification, setEmailNotification] = useState(false);
  const [announcementNotification, setAnnouncementNotification] = useState(false);
  const [booking, setBooking] = useState(true);
  const [message, setMessage] = useState(false);

  return (
    <div className="space-y-10">
      {/* Notifications Section */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Bell className="w-5 h-5 mr-2" />
          Notification Preferences
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Choose what notifications you want to receive
        </p>

        <div className="space-y-5">
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
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              <div>
                <h4 className="font-medium text-gray-900 text-sm sm:text-base">
                  {item.label}
                </h4>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
              <ToggleSwitch isOn={item.value} onToggle={item.toggle} />
            </div>
          ))}
        </div>
      </section>

      {/* App Preferences Section */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          App Preferences
        </h3>

        <div className="space-y-5">
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
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              <div>
                <h4 className="font-medium text-gray-900 text-sm sm:text-base">
                  {item.label}
                </h4>
                <p className="text-sm text-gray-500">{item.desc}</p>
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

