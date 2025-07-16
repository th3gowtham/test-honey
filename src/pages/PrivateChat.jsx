import { Calendar, MoreVertical, Send } from 'lucide-react';

const PrivateChat = () => {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-16 md:pt-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
            <span className="text-white font-medium">S</span>
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 text-base sm:text-lg">Sarah Johnson</h2>
            <p className="text-sm text-gray-500">Private Chat</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <button className="px-4 py-2 bg-teal-500 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-teal-600 transition">
            <Calendar className="w-4 h-4" />
            <span>Book Call</span>
          </button>
          <button>
            <MoreVertical className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 md:space-y-4 md:px-6 lg:px-8">
        {/* Message from Sarah */}
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">S</span>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="font-medium text-gray-900">Sarah Johnson</span>
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span className="text-xs text-gray-500">2:30 PM</span>
            </div>
            <div className="bg-gray-100 rounded-lg p-3 max-w-xs sm:max-w-md">
              <p className="text-gray-800 text-sm">Hi! I have a question about the homework assignment.</p>
            </div>
          </div>
        </div>

        {/* Message from John */}
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">J</span>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="font-medium text-gray-900">John Doe</span>
              <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded">Student</span>
              <span className="text-xs text-gray-500">2:32 PM</span>
            </div>
            <div className="bg-blue-500 text-white rounded-lg p-3 max-w-xs sm:max-w-md">
              <p className="text-sm">What would you like to know?</p>
            </div>
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <button className="text-gray-400 hover:text-gray-600 text-xl">
            📎
          </button>
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
          />
          <button className="bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600 flex items-center justify-center transition">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivateChat;
// doneeee