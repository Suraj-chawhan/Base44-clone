import React from "react";
import { Brain, FileText, Github, BarChart3, Settings, User, Star } from "lucide-react";

const sidebarItems = [
  { id: "assessments", icon: Brain, label: "AI Assessments" },
  { id: "templates", icon: FileText, label: "Templates" },
  { id: "github", icon: Github, label: "GitHub Repos" },
  { id: "analytics", icon: BarChart3, label: "Analytics" },
  { id: "settings", icon: Settings, label: "Settings" },
];

const SidebarItem = ({ item, isActive, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center px-3 py-2 text-sm cursor-pointer rounded-lg mx-2 ${
      isActive
        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-500"
        : "text-gray-600 hover:bg-gray-50"
    }`}
  >
    <item.icon className="w-4 h-4 mr-3" />
    <span className="flex-1">{item.label}</span>
  </div>
);

export default function LeftSidebar({ selectedSection, setSelectedSection }) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-gray-900">AssessmentAI</span>
        </div>
        <div className="ml-auto flex items-center space-x-1">
          <Star className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-500">43,133</span>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 py-4">
        <div className="space-y-1">
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              isActive={selectedSection === item.id}
              onClick={() => setSelectedSection(item.id)}
            />
          ))}
        </div>
      </div>

      {/* Footer User */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Nikhil Tambre's Organization</p>
            <p className="text-xs text-gray-500 truncate">Default Workspace</p>
          </div>
          <button className="text-blue-600 bg-blue-100 px-3 py-1 rounded text-xs font-medium">Upgrade</button>
        </div>
      </div>
    </div>
  );
}
