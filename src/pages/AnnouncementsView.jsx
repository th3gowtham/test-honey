import { Megaphone } from "lucide-react";

const AnnouncementsView = () => {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 md:p-6 pt-16 md:pt-6">
        <h1 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Megaphone className="w-5 h-5 text-teal-600" />
          Community Announcements
        </h1>
        <p className="text-sm text-gray-500 mt-1">🔔 Stay updated with the latest updates</p>
      </div>

      {/* Announcements Section */}
      <div className="flex-1 overflow-y-auto px-4 py-4 md:px-6 lg:px-8 space-y-6 md:space-y-4">
        {/* Announcement Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-3 mb-3">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mb-2 sm:mb-0">
              <span className="text-white text-sm font-medium">A</span>
            </div>
            <div className="text-sm">
              <span className="font-medium text-gray-900">Admin</span>
              <span className="text-xs text-gray-500 ml-2">Yesterday</span>
            </div>
          </div>
          <p className="text-gray-800 text-sm">
            🎉 Welcome to the new academic year! We are excited to have you all here.
          </p>
        </div>

        {/* Second Announcement */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-3">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mb-2 sm:mb-0">
              <span className="text-white text-sm font-medium">A</span>
            </div>
            <div className="text-sm">
              <span className="font-medium text-gray-900">Admin</span>
              <span className="text-xs text-gray-500 ml-2">2 hours ago</span>
            </div>
          </div>
          <p className="text-gray-800 text-sm">
            ⚠️ Important: School will be closed on Monday due to maintenance work.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 p-4 text-center">
        <p className="text-sm text-gray-500">
          Only admins can send community announcements
        </p>
      </div>
    </div>
  );
};

export default AnnouncementsView;
//done