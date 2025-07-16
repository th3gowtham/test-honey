import { Search, User } from 'lucide-react';

const Sidebar = ({ currentView, setCurrentView, setActiveChat }) => {
  return (
    <div className="w-full md:w-80 bg-white border-r border-gray-200 flex flex-col h-screen">
      
      {/* User Info */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">🐝</span>
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 text-base sm:text-lg">
              HoneyBee Chat
            </h2>
            <p className="text-sm text-gray-500">John Doe</p>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-900">John Doe</span>
            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">Student</span>
          </div>
          <p className="text-sm text-gray-500 break-words">
            john@honeybee.com
          </p>
        </div>
      </div>

      {/* Search Box */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search chats..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-col md:flex-row border-b border-gray-200">
        {[
          { label: "Batch Broadcasts", key: "batch-broadcasts" },
          { label: "Private Chats", key: "private-chat" },
          { label: "Announcements", key: "announcements" },
        ].map(({ label, key }) => (
          <button
            key={key}
            onClick={() => setCurrentView(key)}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              currentView === key
                ? "text-teal-600 border-b-2 border-teal-600 bg-teal-50"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <div className="flex flex-col items-center">
              {key === "batch-broadcasts" && <User className="w-4 h-4 mb-1" />}
              <span>{label}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {currentView === 'batch-broadcasts' && (
          <div
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
            onClick={() => setActiveChat('Math 101 Batch')} // 🆕 Click to load chat
          >
            <div>
              <h3 className="font-medium text-gray-900 text-sm sm:text-base">
                Math 101 Batch
              </h3>
              <p className="text-sm text-gray-500">25 students</p>
            </div>
            <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white">3</span>
            </div>
          </div>
        )}

        {currentView === 'private-chat' && (
          <div
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
            onClick={() => setActiveChat('Sarah Johnson')} // 🆕 Click to load chat
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">S</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 text-sm sm:text-base">
                  Sarah Johnson
                </h3>
                <p className="text-xs text-gray-500">Teacher</p>
              </div>
            </div>
            <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white">1</span>
            </div>
          </div>
        )}

        {currentView === 'announcements' && (
          <div
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
            onClick={() => setActiveChat('Community Announcements')} // 🆕 Click to load chat
          >
            <div>
              <h3 className="font-medium text-gray-900 text-sm sm:text-base">
                Community Announcements
              </h3>
              <p className="text-sm text-gray-500">2 pinned</p>
            </div>
            <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white">1</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
