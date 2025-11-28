import React from "react";

export default function RightSidebar({ selectedSection, content }) {
  return (
    <div className="flex-1 flex flex-col">
      {/* Top Navbar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">
            {selectedSection === "templates"
              ? "Assessment Templates"
              : selectedSection === "github"
              ? "GitHub Repositories"
              : selectedSection === "assessments"
              ? "AI Assessments"
              : selectedSection === "analytics"
              ? "Analytics"
              : "Settings"}
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-6 overflow-auto">{content}</div>
    </div>
  );
}
