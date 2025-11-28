import React, { useState } from "react";
import { Settings, AlertCircle, Globe, Moon, Sun } from "lucide-react";

export default function Setting() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="space-y-6">
      {/* General Settings */}
      <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <Settings className="w-5 h-5" /> General Settings
        </h3>
        <div className="mt-4 flex items-center justify-between">
          <span>Dark Mode</span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 rounded-full border text-sm"
          >
            {darkMode ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-gray-700" />}
          </button>
        </div>
      </div>

      {/* Help & Contact */}
      <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <AlertCircle className="w-5 h-5" /> Help & Contact
        </h3>
        <div className="mt-4 space-y-2 text-gray-600">
          <p>Need assistance? Contact support at <a href="mailto:support@example.com" className="text-blue-600">support@example.com</a></p>
          <p>Visit our <a href="#" className="text-blue-600">Knowledge Base</a> for FAQs</p>
        </div>
      </div>
    </div>
  );
}
