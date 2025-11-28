import React from "react";
import { Clock, Users, Target } from "lucide-react";

const myAssessments = [
  {
    id: 1,
    name: "Senior React Developer - TechCorp",
    template: "Frontend Developer Test",
    status: "Active",
    candidates: 12,
    avgScore: 78,
    created: "2 days ago",
    icon: "💼",
  },
  {
    id: 2,
    name: "Backend Engineer - InnovateX",
    template: "Backend Developer Test",
    status: "Completed",
    candidates: 8,
    avgScore: 85,
    created: "5 days ago",
    icon: "🖥️",
  },
];

export default function Assessments() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {myAssessments.length > 0 ? (
        myAssessments.map((assessment) => (
          <div
            key={assessment.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 overflow-hidden cursor-pointer"
          >
            {/* Gradient Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{assessment.icon}</span>
                <h3 className="text-white font-bold text-lg">{assessment.name}</h3>
              </div>
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  assessment.status === "Active"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {assessment.status}
              </span>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3">
              <p className="text-gray-600 text-sm">Template: {assessment.template}</p>
              <div className="flex items-center justify-between text-gray-500 text-xs">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{assessment.created}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>{assessment.candidates} candidates</span>
                  </div>
                  {assessment.avgScore && (
                    <div className="flex items-center space-x-1">
                      <Target className="w-4 h-4 text-gray-400" />
                      <span>Avg: {assessment.avgScore}%</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Button */}
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-xl text-sm font-medium hover:from-blue-600 hover:to-purple-700 transition-all">
                View Details
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center py-20 text-gray-500">
          <p className="text-lg font-medium mb-2">No assessments created</p>
          <p className="mb-4">Start by creating your first AI-powered assessment</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium">
            Browse Templates
          </button>
        </div>
      )}
    </div>
  );
}
