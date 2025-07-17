import { User, X } from "lucide-react";
import ProfileTab from "./ProfileTab";
import SettingsTab from "./SettingsTab";
import AccountTab from "./AccountTab";

const ProfileSettingsModal = ({ onClose, activeTab, setActiveTab }) => {
  const tabs = ["Profile", "Settings", "Account"];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-2">
      {/* Modal Container */}
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-lg">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 border-b border-gray-200">
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Profile Settings
            </h2>
            <p className="text-sm text-gray-500">
              Manage your account settings and preferences
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded self-start sm:self-auto"
            aria-label="Close profile settings modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-gray-200 text-sm">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 sm:flex-none py-3 px-4 whitespace-nowrap font-medium transition ${
                activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6">
          {activeTab === "Profile" && <ProfileTab />}
          {activeTab === "Settings" && <SettingsTab />}
          {activeTab === "Account" && <AccountTab />}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsModal;
