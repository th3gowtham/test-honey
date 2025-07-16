import React from "react";

function ToggleSwitch({ label, isOn, onToggle, isDisabled }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full max-w-sm mb-4 gap-2">
      {/* ✅ Responsive label wrapping on small screens */}
      <span className="text-sm sm:text-base text-gray-800">{label}</span>

      <button
        onClick={onToggle}
        disabled={isDisabled}
        role="switch"
        aria-checked={isOn}
        className={`w-12 h-6 rounded-full p-1 flex items-center transition-colors duration-300 focus:outline-none 
          ${isOn ? "bg-teal-500" : "bg-gray-400"} 
          ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300
            ${isOn ? "translate-x-6" : "translate-x-0"}`}
        ></div>
      </button>
    </div>
  );
}

export default ToggleSwitch;

