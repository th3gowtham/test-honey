import { User, Phone, MapPin, Camera } from "lucide-react";

const ProfileTab = () => {
  return (
    <div className="space-y-6">
      {/* Profile Overview */}
      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
        <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center relative">
          <span className="text-teal-600 text-2xl font-bold">J</span>
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
            <Camera className="w-4 h-4 text-white" />
          </div>
        </div>

        <div className="flex-1 min-w-[200px] space-y-1">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">John Doe</h3>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">Student</span>
          </div>
          <p className="text-sm text-gray-500">Learner with access to enrolled batches</p>
        </div>

        {/* Edit Button - Wraps on small screens */}
        <div className="w-full sm:w-auto sm:ml-auto">
          <button className="w-full sm:w-auto px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <div className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg bg-gray-50">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600 text-sm">John Doe</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <div className="p-3 border border-gray-300 rounded-lg bg-gray-50">
            <span className="text-gray-600 text-sm">john@honeybee.com</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <div className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg">
            <Phone className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Enter phone number"
              className="flex-1 outline-none text-gray-600 placeholder:text-gray-400 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <div className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg">
            <MapPin className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Enter location"
              className="flex-1 outline-none text-gray-600 placeholder:text-gray-400 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Bio */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
        <textarea
          placeholder="Tell us about yourself..."
          className="w-full p-3 border border-gray-300 rounded-lg resize-none h-24 text-sm text-gray-600 placeholder:text-gray-400"
        />
      </div>

      {/* Enrolled Batches */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Enrolled Batches</label>
        <div className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg bg-gray-50 text-sm">
          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
            ✓ math-101
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
