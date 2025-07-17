import { X } from "lucide-react";

const NotificationModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      {/* Modal Container */}
      <div className="bg-white rounded-xl w-full max-w-sm max-h-[90vh] overflow-y-auto shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">Notifications</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded"
            aria-label="Close notification modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 text-center">
          <p className="text-gray-500 text-sm sm:text-base">No notifications</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
