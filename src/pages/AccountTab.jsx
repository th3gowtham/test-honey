import { Shield } from "lucide-react";

const AccountTab = () => {
  function Signout() {
    alert("You are signed out");
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Account Info Section */}
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2 shrink-0" />
          Account Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Type
            </label>
            <p className="text-gray-900 font-medium text-sm sm:text-base">Student</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Member Since
            </label>
            <p className="text-gray-900 text-sm sm:text-base">January 2024</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Login
            </label>
            <p className="text-gray-900 text-sm sm:text-base">Today, 2:30 PM</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
              Active
            </span>
          </div>
        </div>
      </div>

      {/* Danger Zone Section */}
      <div className="border-t pt-6">
        <h3 className="text-base sm:text-lg font-semibold text-red-600 mb-2">
          Danger Zone
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          These actions cannot be undone
        </p>

        <button
          onClick={Signout}
          className="w-full px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition text-sm sm:text-base flex items-center justify-center"
        >
          <span className="mr-2 text-lg">▷</span>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default AccountTab;
// done